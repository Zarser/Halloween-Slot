import React from 'react';
import './Reel.css'; // Assuming you have CSS for Reel component

const Reel = ({ symbols, spinning, winningSymbols }) => {
  return (
    <div className={`reel ${spinning ? 'spinning' : ''}`}>
      {symbols.map((symbol, index) => {
        // Check if the current symbol index is in the winningSymbols array
        const isWinningSymbol = winningSymbols.some(([row, col]) => row === Math.floor(index / 3) && col === index % 3);

        return (
          <div 
            key={index} 
            className={`symbol ${isWinningSymbol ? 'winning' : ''}`} // Apply 'winning' class if it's a winning symbol
          >
            <img src={symbol} alt={`Slot symbol ${index}`} />
          </div>
        );
      })}
    </div>
  );
};

export default Reel;
