const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ 회원가입
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 아이디 중복 체크
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
    }

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: '회원가입 성공!' });
  } catch (err) {
    res.status(500).json({ message: '회원가입 실패', error: err.message });
  }
});

// ✅ 로그인
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 찾기
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: '사용자가 존재하지 않습니다.' });

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });

    // ✅ 로그인 성공 → JWT 토큰 발급
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "mysecretkey",          
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: '로그인 성공!',
      token: token
    });
  } catch (err) {
    res.status(500).json({ message: '로그인 실패', error: err.message });
  }
});

module.exports = router;
