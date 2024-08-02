// models/File.js
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // 'file' or 'directory'
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "file", default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("file", fileSchema);
