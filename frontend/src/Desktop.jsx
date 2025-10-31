// frontend/src/Desktop.jsx
import React from 'react';
import Network from './Network';

export default function Desktop() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>仮想OS デスクトップ</h1>
      <Network />
    </div>
  );
}
