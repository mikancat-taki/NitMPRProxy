import express from "express";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "username required" });
  // シンプルにユーザー登録 / ログイン
  const db = req.app.locals.dbPromise;
  const existing = await (await db).get("SELECT * FROM users WHERE username=?", username);
  if (!existing) {
    await (await db).run("INSERT INTO users (username) VALUES (?)", username);
  }
  res.json({ username });
});

export default router;
