import React, { useState } from "react";

export default function Browser() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const loadPage = async () => {
    const res = await fetch(`http://localhost:3000/api/network/proxy?url=${encodeURIComponent(url)}`);
    const text = await res.text();
    setContent(text);
  };

  return (
    <div className="flex-1 bg-gray-800 p-2">
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Enter URL" className="w-full p-1 mb-2"/>
      <button onClick={loadPage} className="bg-green-500 p-1 rounded mb-2">Load</button>
      <div className="overflow-auto h-[400px] border p-2" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
