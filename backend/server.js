const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // ✅ MongoDB

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB 연결
mongoose.connect("mongodb://host.docker.internal:27017/edgecachemap", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB 연결 실패:", err));

// ✅ 회원 기능 및 음식점 등록/조회 라우터
const authRoutes = require("./routes/auth");
const placeRoutes = require("./routes/Place");

app.use("/auth", authRoutes);
app.use("/places", placeRoutes);

// ✅ 기본 확인
app.get("/", (req, res) => {
  res.send("🌐 서버가 정상 작동 중입니다!");
});

app.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중입니다`);
});
