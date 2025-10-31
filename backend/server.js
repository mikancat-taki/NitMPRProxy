// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

// __dirname を ESM 用に定義
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// SQLite データベース初期化
let db;
async function initDB() {
  db = await open({
    filename: path.join(__dirname, "database.db"),
    driver: sqlite3.Database,
  });

  // 仮想フォルダテーブル作成例
  await db.run(`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  // 仮想ファイルテーブル作成例
  await db.run(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      folder_id INTEGER,
      name TEXT NOT NULL,
      content TEXT,
      FOREIGN KEY(folder_id) REFERENCES folders(id)
    )
  `);
}

// API 例：フォルダ取得
app.get("/api/folders", async (req, res) => {
  const folders = await db.all("SELECT * FROM folders");
  res.json(folders);
});

// API 例：フォルダ作成
app.post("/api/folders", async (req, res) => {
  const { name } = req.body;
  const result = await db.run("INSERT INTO folders(name) VALUES(?)", name);
  res.json({ id: result.lastID, name });
});

// API 例：ファイル取得
app.get("/api/files/:folderId", async (req, res) => {
  const folderId = req.params.folderId;
  const files = await db.all("SELECT * FROM files WHERE folder_id = ?", folderId);
  res.json(files);
});

// API 例：ファイル作成
app.post("/api/files", async (req, res) => {
  const { folder_id, name, content } = req.body;
  const result = await db.run(
    "INSERT INTO files(folder_id, name, content) VALUES(?, ?, ?)",
    folder_id,
    name,
    content
  );
  res.json({ id: result.lastID, folder_id, name, content });
});

// フロントエンドの SPA に対応
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// WebSocket サーバー（仮想ネットワーク用）
const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Received:", message.toString());
    // ここで仮想ネットワーク通信処理
    ws.send(`Echo: ${message}`);
  });
});

// HTTP サーバーと WebSocket 統合
const server = app.listen(PORT, async () => {
  await initDB();
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
