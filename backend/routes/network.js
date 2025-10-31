import express from "express";
const router = express.Router();

// 仮想ブラウザ用プロキシ（簡易）
router.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("URL required");
  // 実際のアクセスはサーバー側でfetchする
  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (e) {
    res.status(500).send("Fetch error");
  }
});

export default router;
