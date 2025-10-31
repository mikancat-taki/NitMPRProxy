import React, { useState, useEffect } from "react";
import Browser from "./Browser";

export default function Desktop({ username }) {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const res = await fetch("http://localhost:3000/api/fs/list/root");
    const data = await res.json();
    setFiles(data);
  };

  useEffect(() => { fetchFiles(); }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 text-white p-4">
      <h1 className="mb-4">Welcome, {username} - WebOS</h1>
      <div className="flex space-x-4">
        <div>
          <h2>Files</h2>
          <ul>
            {files.map((f,i)=><li key={i}>{f}</li>)}
          </ul>
        </div>
        <Browser />
      </div>
    </div>
  );
}
