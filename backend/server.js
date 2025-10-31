import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import authRoutes from "./routes/auth.js";
import fsRoutes from "./routes/fs.js";
import networkRoutes from "./routes/network.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB初期化
const dbPromise = open({
  filename: "./db/database.sqlite",
  driver: sqlite3.Database
});

app.locals.dbPromise = dbPromise;

// ルート
app.use("/api/auth", authRoutes);
app.use("/api/fs", fsRoutes);
app.use("/api/network", networkRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`WebOS backend running on http://localhost:${PORT}`);
});
