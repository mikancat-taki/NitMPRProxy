// backend/server.js
import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite"; // sqlite用のpromiseラッパー
import path from "path";
import { fileURLToPath } from "url";

// __dirname 相当を取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// JSONボディを扱う
app.use(express.json());

// SQLiteデータベースを開く
let db;
async function initDB() {
  db = await open({
    filename: path.join(__dirname, "database.db"),
    driver: sqlite3.Database
  });

  // テーブル作成（存在しない場合のみ）
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE
    )
  `);
}

// API例: ユーザー登録
app.post("/api/register", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const result = await db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.json({ success: true, userId: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API例: ユーザー一覧取得
app.get("/api/users", async (req, res) => {
  try {
    const users = await db.all("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// サーバー起動
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to initialize database:", err);
});
