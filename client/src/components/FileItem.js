import React, { useState } from "react";
import { updateFile, deleteFile } from "../services/fileService";
import "./FileItem.css"; // Import styling

const FileItem = ({ file, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const handleRename = async () => {
    try {
      await updateFile(file._id, { name: newName });
      onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFile(file._id);
      onDelete();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="file-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleRename}>Save</button>
        </>
      ) : (
        <>
          <span>{file.name}</span>
          <button onClick={() => setIsEditing(true)}>Rename</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default FileItem;
