# EdgeCacheMap
Edge-Cloud 기반 사용자 위치 지능형 추천 시스템
사용자가 직접 등록한 음식점 데이터를 기반으로  
**현재 위치를 기준으로 가까운 음식점**을 추천해주는 웹 애플리케이션입니다.
카카오 지도 API와 Geolocation API를 활용해 **지도 시각화**와 **위치 기반 추천** 기능을 구현했습니다.

> 본 프로젝트는 졸업작품에서 사용한 아이디어를 사용자 위치 기반 추천 시스템으로 확장하여  
> **엣지-클라우드 기반의 사용자 맞춤형 음식 도감 시스템**으로 발전시키기 위한 기초 단계입니다.

---

## ✅ 주요 기능
- 개인 음식 도감: 내가 등록한 음식점만 지도에 표시
- 지도 기반 맛집 마커 표시
- 카테고리별 필터 기능
- 사용자 위치 기반 중심 이동 및 가까운 top 3 음식점 자동 추천
- 마커 클릭 시 상세 정보 출력
- 지도 위에서 클릭만으로 위치 정보 자동 입력
---

## 프론트 스택
- HTML / CSS / JavaScript
- Kakao Maps API
- Geolocation API

---

## 백엔드 스택
- Node.js + Express
- MongoDB + Mongoose
- JWT 기반 인증
- RESTful API 설계

---

## 배포
- Docker 
 - frontend/ 폴더 : 정적 HTML -> NGINX 컨테이너
 - backend/  폴더 : Express API 서버 -> Node.js 컨테이너
- k8s 기반 클라우드 배포

---

## 거리 계산 방식

사용자 현재 위치와 각 음식점 간의 거리를 계산하여  
가장 가까운 음식점 3곳을 추천 마커로 표시합니다.
> > **위도-경도의 단순 유클리드 거리(Euclidean Distance)** 를 사용합니다. 

```js
function getDistance(lat1, lng1, lat2, lng2) {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
}

```
---

## 개발 목적
과거에 진행한 졸업작품을 기반으로 실전 추천 시스템 구조를 복원 및 확장하며  
향후 엣지-클라우드 기반 강화학습 모델과 연계한 시스템으로 발전시키는 것이 목표이다.
