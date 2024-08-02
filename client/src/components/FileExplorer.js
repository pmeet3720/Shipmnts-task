import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FileExplorer.css"; // Import your CSS file

const FileExplorer = () => {
  const [files, setFiles] = useState([]);
  const [newFileName, setNewFileName] = useState("");
  const [fileType, setFileType] = useState("file"); // 'file' or 'directory'
  const [message, setMessage] = useState(""); // Message for success or error

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("/api/files");
      setFiles(res.data);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Error fetching files.");
    }
  };

  const addFile = async () => {
    if (!newFileName) return; // Ensure the file name is not empty

    try {
      const newFile = { name: newFileName, type: fileType };
      const res = await axios.post("/api/files", newFile);

      // Log the newly added file data
      console.log("File added:", res.data);

      setFiles([...files, res.data]); // Update state to include the new file
      setNewFileName(""); // Clear input field
      setMessage("File added successfully.");
    } catch (err) {
      console.error("Error adding file:", err); // Log the error for debugging
      setMessage("Error adding file.");
    }
  };

  const deleteFile = async (id) => {
    try {
      await axios.delete(`/api/files/${id}`);
      setFiles(files.filter((file) => file._id !== id)); // Remove deleted file from state
      setMessage("File deleted successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Error deleting file.");
    }
  };

  return (
    <div className="file-explorer">
      <h1>File Explorer</h1>
      <div className="file-actions">
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          placeholder="Enter file/directory name"
        />
        <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
          <option value="file">File</option>
          <option value="directory">Directory</option>
        </select>
        <button className="file-button" onClick={addFile}>
          Add
        </button>
      </div>
      {message && <div className="file-message">{message}</div>}
      <ul className="file-list">
        {files.map((file) => (
          <li key={file._id} className="file-item">
            <span className="file-name">{file.name}</span>
            <div className="file-item-actions">
              <button
                className="file-button"
                onClick={() => deleteFile(file._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
