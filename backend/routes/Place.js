// routes/place.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate');
const Place = require('../models/Place');

// 로그인한 사용자만 음식점 등록 가능
router.post('/', authenticateToken, async (req, res) => {
  console.log("✔ 인증된 사용자 ID:", req.user.userId);
  try {
    const { name, lat, lng, category, description } = req.body;

    const newPlace = new Place({
      name,
      lat,
      lng,
      category,
      description,
      creator: req.user.userId
    });

    await newPlace.save();
    res.status(201).json({ message: "음식점 등록 완료", place: newPlace });
  } catch (err) {
    res.status(500).json({ message: "등록 실패", error: err.message });
  }
});

// 본인이 등록한 음식점만 조회
router.get('/my-places', authenticateToken, async (req, res) => {
  try {
    const places = await Place.find({ creator: req.user.userId });
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json({ message: "조회 실패", error: err.message });
  }
});

// 전체 음식점 목록 조회 (테스트용, 인증 없이 접근 가능)
router.get('/', async (req, res) => {
  try {
    const places = await Place.find({});
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json({ message: '전체 음식점 조회 실패', error: err.message });
  }
});


// 음식점 삭제
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "음식점을 찾을 수 없습니다." });
    }

    // 본인 확인
    if (place.creator.toString() !== req.user.userId) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await place.deleteOne();
    res.status(200).json({ message: "음식점 삭제 완료" });
  } catch (err) {
    res.status(500).json({ message: "삭제 실패", error: err.message });
  }
});

// 음식점 수정
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const place = await Place.findOne({ _id: req.params.id, creator: req.user.userId });
    if (!place) return res.status(404).json({ message: '음식점을 찾을 수 없습니다.' });

    const { name, lat, lng, category, description } = req.body;

    place.name = name;
    place.lat = lat;
    place.lng = lng;
    place.category = category;
    place.description = description;

    await place.save();
    res.status(200).json({ message: '음식점 정보 수정 완료', place });
  } catch (err) {
    res.status(500).json({ message: '수정 실패', error: err.message });
  }
});

// 가까운 음식점 추천 API
router.get('/recommend', authenticateToken, async (req, res) => {
  const { lat, lng, category } = req.query;
  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);

  console.log("📍 추천 요청 도착:", { userLat, userLng, category });

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({ message: "잘못된 위도/경도입니다." });
  }

  try {
    let places = await Place.find({ creator: req.user.userId });
    console.log("🎯 전체 음식점 수:", places.length);
    if (category && category !== '전체') {
      places = places.filter(place => place.category === category);
    }

    const withDistance = places.map(place => {
      const dx = userLat - place.lat;
      const dy = userLng - place.lng;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return { ...place._doc, dist };
    });

    const top3 = withDistance.sort((a, b) => a.dist - b.dist).slice(0, 3);
    console.log("✅ 추천 top3:", top3.map(p => p.name));

    res.status(200).json(top3);
  } catch (err) {
    res.status(500).json({ message: '추천 실패', error: err.message });
  }
});

module.exports = router;
