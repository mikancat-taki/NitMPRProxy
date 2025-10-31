import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import { WebSocketServer } from "ws";
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
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    content TEXT,
    parent INTEGER DEFAULT 0
  )`);
});

// ファイルAPI
app.get("/api/files/:parent?", (req, res) => {
  const parent = req.params.parent || 0;
  db.all("SELECT * FROM files WHERE parent = ?", [parent], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

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

// フロント配信
app.use(express.static(path.join(__dirname, "../frontend/dist")));

const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// ===== WebSocketサーバー =====
const wss = new WebSocketServer({ server });
const clients = new Map();

wss.on("connection", (ws) => {
  const id = Date.now();
  clients.set(id, ws);

  ws.on("message", (msg) => {
    // 全クライアントにブロードキャスト
    for (let [cid, client] of clients.entries()) {
      if (client.readyState === 1) client.send(msg);
    }
  });

  ws.on("close", () => clients.delete(id));
});
