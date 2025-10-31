// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";
import bodyParser from "body-parser";

// ==== __dirname の設定（ESM用） ====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==== Express 初期化 ====
const app = express();
const PORT = process.env.PORT || 3000;

// ==== ミドルウェア ====
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // フロント配信

// ==== SQLite データベース初期化 ====
let db;
async function initDB() {
  db = await open({
    filename: path.join(__dirname, "database.db"),
    driver: sqlite3.Database,
  });

  // 仮想フォルダテーブル
  await db.exec(`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      parent_id INTEGER,
      FOREIGN KEY(parent_id) REFERENCES folders(id)
    )
  `);

  // 仮想ファイルテーブル
  await db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      content TEXT,
      folder_id INTEGER,
      FOREIGN KEY(folder_id) REFERENCES folders(id)
    )
  `);
}

// ==== API ルート ====

/** フォルダ一覧取得 */
app.get("/api/folders", async (req, res) => {
  const folders = await db.all("SELECT * FROM folders");
  res.json(folders);
});

/** フォルダ作成 */
app.post("/api/folders", async (req, res) => {
  const { name, parent_id } = req.body;
  const result = await db.run(
    "INSERT INTO folders (name, parent_id) VALUES (?, ?)",
    [name, parent_id || null]
  );
  res.json({ id: result.lastID });
});

/** ファイル一覧取得 */
app.get("/api/files", async (req, res) => {
  const { folder_id } = req.query;
  const files = await db.all(
    "SELECT * FROM files WHERE folder_id = ?",
    [folder_id || null]
  );
  res.json(files);
});

/** ファイル作成 */
app.post("/api/files", async (req, res) => {
  const { name, content, folder_id } = req.body;
  const result = await db.run(
    "INSERT INTO files (name, content, folder_id) VALUES (?, ?, ?)",
    [name, content || "", folder_id || null]
  );
  res.json({ id: result.lastID });
});

/** ファイル更新 */
app.put("/api/files/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  await db.run("UPDATE files SET content = ? WHERE id = ?", [content, id]);
  res.json({ success: true });
});

/** フロント側 SPA ルーティング対応 */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ==== サーバー起動 ====
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to initialize DB", err);
});
