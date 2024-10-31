// Instructions.js
import React from 'react';
import cauldonIcon from '../src/assets/images/cauldron.png';
import draculaIcon from '../src/assets/images/dracula.png';
import faceIcon from '../src/assets/images/ghost-face.png';
import ghostHatIcon from '../src/assets/images/ghost.png';
import candyIcon from '../src/assets/images/halloween-candy.png';
import halloweenIcon from '../src/assets/images/halloween.png';
import pumpkinIcon from '../src/assets/images/pumpkin.png';
import toadIcon from '../src/assets/images/toad.png';
import tombstoneIcon from '../src/assets/images/tombstone.png';
import hatIcon from '../src/assets/images/witch-hat.png';
import witchIcon from '../src/assets/images/witch.png';
import bonusIcon from '../src/assets/images/bonus.png';
import './Instructions.css'; // Import CSS for styling

const Instructions = () => {
    // Define max win and symbol values
    const maxWin = 1000; // Example max win amount
    const symbolValues = {
        [cauldonIcon]: 10,
        [draculaIcon]: 15,
        [faceIcon]: 20,
        [ghostHatIcon]: 25,
        [candyIcon]: 30,
        [halloweenIcon]: 40,
        [pumpkinIcon]: 50,
        [toadIcon]: 60,
        [tombstoneIcon]: 70,
        [hatIcon]: 80,
        [witchIcon]: 100,
        [bonusIcon]: 150,
    };

    return (
        <div className="instructions-container">
            <h2>Welcome to the Halloween Slot!</h2>
<p>Spin the reels and try to match symbols for big wins!</p>
<p>The <strong>Bonus</strong> button triggers a bonus round at a cost of <strong>100x</strong> your bet size!</p>
<p><strong>Bet Max</strong>: This will automatically raise your bet to the <strong>maximum!</strong></p>
<p>Your bet will be multiplied by the win amount of the specific symbol.</p>
<p>Wins will only trigger on a horizontal or diagonal row.</p>


            <h3>Max Win Amount: x{maxWin}</h3>
            <h4>Symbol Values:</h4>
            <ul>
                {Object.entries(symbolValues).map(([symbol, value]) => (
                    <li key={symbol}><strong>3x</strong>
                        <img src={symbol} alt="symbol" className="symbol-icon" /> {/* Display symbol icon */}
                        {`: ${value}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Instructions;
