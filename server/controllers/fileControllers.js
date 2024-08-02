const File = require("../models/file");

// Create new file or directory
exports.createFile = async (req, res) => {
  const { name, type, parent } = req.body;
  try {
    const newFile = new File({ name, type, parent });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Read file structure
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({ parent: req.params.parentId || null });
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update file or directory
exports.updateFile = async (req, res) => {
  try {
    const updatedFile = await File.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedFile);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete file or directory
exports.deleteFile = async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
