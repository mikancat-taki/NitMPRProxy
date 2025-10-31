import React, { useState, useEffect } from "react";
import Desktop from "./components/Desktop";

export default function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    if (data.username) setLoggedIn(true);
  };

  if (!loggedIn) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="border p-2 mb-2"/>
      <button onClick={login} className="bg-blue-500 text-white p-2 rounded">Login</button>
    </div>
  );

  return <Desktop username={username} />;
}
