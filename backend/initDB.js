const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./places.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT
    )
  `);
});

db.close();
