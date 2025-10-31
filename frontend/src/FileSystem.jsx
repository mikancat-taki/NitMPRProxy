import React, { useState } from "react";

const FileSystem = () => {
  const [files, setFiles] = useState(["document.txt", "image.png"]);
  const [newFile, setNewFile] = useState("");

  const addFile = () => {
    if(newFile) setFiles([...files, newFile]);
    setNewFile("");
  };

  const removeFile = (name) => {
    setFiles(files.filter(f => f !== name));
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>仮想ファイルシステム</h2>
      <ul>
        {files.map(file => (
          <li key={file}>
            {file} <button onClick={() => removeFile(file)}>削除</button>
          </li>
        ))}
      </ul>
      <input value={newFile} onChange={e => setNewFile(e.target.value)} placeholder="新しいファイル名" />
      <button onClick={addFile}>作成</button>
    </div>
  );
};

export default FileSystem;
