import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FileExplorer() {
  const [files, setFiles] = useState([]);
  const [newName, setNewName] = useState("");

  const loadFiles = async () => {
    const res = await axios.get("/api/files");
    setFiles(res.data);
  };

  const createFile = async () => {
    await axios.post("/api/files", { name: newName });
    setNewName("");
    loadFiles();
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div>
      <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New file name" />
      <button onClick={createFile}>Create</button>
      <ul>
        {files.map(f => <li key={f.id}>{f.name}</li>)}
      </ul>
    </div>
  );
}
