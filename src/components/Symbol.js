// Symbol.js
import React from 'react';
import './Reel.css'; // Ensure this is imported for styling

const Symbol = ({ symbol, isWinning }) => {
  return (
    <div className={`symbol ${isWinning ? 'winning-symbol' : ''}`}>
      <img src={symbol} alt="Slot symbol" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default Symbol;

