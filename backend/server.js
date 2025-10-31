import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite DB
const db = new sqlite3.Database("./db.sqlite");

// DB初期化
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    content TEXT,
    parent INTEGER DEFAULT 0
  )`);
});

// ファイル一覧取得
app.get("/api/files/:parent?", (req, res) => {
  const parent = req.params.parent || 0;
  db.all("SELECT * FROM files WHERE parent = ?", [parent], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ファイル作成
app.post("/api/files", (req, res) => {
  const { name, content, parent } = req.body;
  db.run(
    "INSERT INTO files (name, content, parent) VALUES (?, ?, ?)",
    [name, content || "", parent || 0],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// ファイル更新
app.put("/api/files/:id", (req, res) => {
  const { content, name } = req.body;
  db.run(
    "UPDATE files SET content = ?, name = ? WHERE id = ?",
    [content, name, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// フロント配信（Renderではstaticとしても可）
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
