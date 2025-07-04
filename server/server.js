// server/server.js

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./places.db");


const express = require("express");
const app = express();
const port = 3000;

// CORS 허용 (브라우저 보안 문제 방지)
const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// POST /places
app.post("/places", (req, res) => {
  const { name, lat, lng, category, description } = req.body;

  const sql = `
    INSERT INTO places (name, lat, lng, category, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, lat, lng, category, description], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("DB 저장 실패");
    }

    res.status(201).json({ message: "등록 완료", id: this.lastID });
  });
});


const fs = require("fs");

// JSON 데이터 반환 API

app.get("/places", (req, res) => {
  db.all("SELECT * FROM places", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB 조회 실패");
    }
    res.json(rows);
  });
});


app.get("/", (req, res) => {
  res.send("🌐 서버가 정상 작동 중입니다!");
});

app.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중입니다`);
});
