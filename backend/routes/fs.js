import express from "express";
const router = express.Router();

// 仮想ファイルシステム（簡易版）
let files = {
  "root": ["welcome.txt"]
};

router.get("/list/:folder", (req, res) => {
  const folder = req.params.folder;
  res.json(files[folder] || []);
});

router.post("/create", (req, res) => {
  const { folder, filename } = req.body;
  if (!files[folder]) files[folder] = [];
  files[folder].push(filename);
  res.json({ success: true });
});

export default router;
