const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./places.db");

const initialData = [
  {
    name: "왱이콩나물국밥",
    lat: 35.815610,
    lng: 127.147674,
    category: "한식",
    description: "전주 3대 콩나물국밥 중 하나"
  },
  {
    name: "풍년제과",
    lat: 35.813253,
    lng: 127.150095,
    category: "카페",
    description: "전주의 전통 수제 초코파이"
  },
  {
    name: "진미집",
    lat: 35.818953,
    lng: 127.153412,
    category: "한식",
    description: "전주 비빔밥 원조집"
  }
];

db.serialize(() => {
  const stmt = db.prepare(`
    INSERT INTO places (name, lat, lng, category, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  initialData.forEach(place => {
    stmt.run([place.name, place.lat, place.lng, place.category, place.description]);
  });

  stmt.finalize();
  console.log("✅ 초기 데이터 입력 완료");
});

db.close();
