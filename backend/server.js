import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import fsRoutes from "./routes/fs.js";
import networkRoutes from "./routes/network.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB初期化
const dbPromise = open({
  filename: path.join(__dirname, "./db/database.sqlite"),
  driver: sqlite3.Database
});
app.locals.dbPromise = dbPromise;

// APIルート
app.use("/api/auth", authRoutes);
app.use("/api/fs", fsRoutes);
app.use("/api/network", networkRoutes);

// フロント React を配信
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`WebOS backend running on port ${PORT}`);
});
