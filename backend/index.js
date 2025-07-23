require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas 연결 성공"))
  .catch(err => console.error("❌ MongoDB 연결 실패:", err));
