import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileExplorer from "./components/FileExplorer";
import FileItem from "./components/FileItem";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FileExplorer />} />
          <Route path="/Item" element={<FileItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
