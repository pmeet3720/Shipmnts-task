const express = require("express");
const {
  createFile,
  getFiles,
  updateFile,
  deleteFile,
} = require("../controllers/fileControllers");
const router = express.Router();

router.post("/files", createFile);
router.get("/files/:parentId?", getFiles); // optional parentId param
router.put("/files/:id", updateFile);
router.delete("/files/:id", deleteFile);

module.exports = router;
