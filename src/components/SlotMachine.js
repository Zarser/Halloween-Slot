import React, { useState, useEffect, useMemo } from 'react';
import Reel from './Reel';
import Instructions from '../Instructions';
import { Howl } from 'howler';
import spinSound from '../sounds/spin.mp3';
import winSound from '../sounds/win.mp3';
import bgSound from '../sounds/bg-sound.mp3';
import bonusSound from '../sounds/bonus.mp3';

// Import your icons
import cauldonIcon from '../assets/images/cauldron.png';
import draculaIcon from '../assets/images/dracula.png';
import faceIcon from '../assets/images/ghost-face.png';
import ghostHatIcon from '../assets/images/ghost.png';
import candyIcon from '../assets/images/halloween-candy.png';
import halloweenIcon from '../assets/images/halloween.png';
import pumpkinIcon from '../assets/images/pumpkin.png';
import toadIcon from '../assets/images/toad.png';
import tombstoneIcon from '../assets/images/tombstone.png';
import hatIcon from '../assets/images/witch-hat.png';
import witchIcon from '../assets/images/witch.png';
import bonusIcon from '../assets/images/bonus.png';

const symbolsArray = [
    cauldonIcon, draculaIcon, faceIcon, ghostHatIcon, halloweenIcon,
    candyIcon, pumpkinIcon, tombstoneIcon, toadIcon, hatIcon,
    witchIcon, bonusIcon
];

const weightedSymbolsArray = [
    ...Array(10).fill(cauldonIcon),
    ...Array(8).fill(draculaIcon),
    ...Array(6).fill(faceIcon),
    ...Array(4).fill(ghostHatIcon),
    ...Array(3).fill(halloweenIcon),
    ...Array(2).fill(pumpkinIcon),
    ...Array(1).fill(tombstoneIcon),
    ...Array(1).fill(toadIcon),
    ...symbolsArray // Include all symbols for variation
];

const winPatterns = [
    [[0, 0], [1, 0], [2, 0]], 
    [[0, 1], [1, 1], [2, 1]], 
    [[0, 2], [1, 2], [2, 2]], 
    [[0, 0], [1, 1], [2, 2]], 
    [[0, 2], [1, 1], [2, 0]], 
    [[0, 0], [0, 1], [0, 2]], 
    [[1, 0], [1, 1], [1, 2]], 
    [[2, 0], [2, 1], [2, 2]], 
];

const betOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20];

const SlotMachine = ({ currentUser, addToLeaderboard }) => {
    const [reels, setReels] = useState([[], [], []]);
    const [win, setWin] = useState(false);
    const [credits, setCredits] = useState(999);
    const [betSize, setBetSize] = useState(1);
    const [winnings, setWinnings] = useState(0); // Keep track of winnings
    const [gameOver, setGameOver] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [spinCount, setSpinCount] = useState(0);
    const [spinCooldown, setSpinCooldown] = useState(false);
    const [winningSymbols, setWinningSymbols] = useState([]);

    // Bonus round states
    const [bonusRoundActive, setBonusRoundActive] = useState(false);
    const [bonusMessageVisible, setBonusMessageVisible] = useState(false);
    const [bonusRoundEndMessage, setBonusRoundEndMessage] = useState(''); // State for the end of bonus message
    const [spinsLeft, setSpinsLeft] = useState(0);
    const [multiplier, setMultiplier] = useState(2);
    const [bonusTotal, setBonusTotal] = useState(0);
    const [currentMultiplierMessage, setCurrentMultiplierMessage] = useState('');

    const getMultiplierForSpin = (spinsLeft) => {
        switch (spinsLeft) {
            case 5: return 2;
            case 4: return 4;
            case 3: return 6;
            case 2: return 8;
            case 1: return 100;
            default: return 1;
        }
    };

    const spinSoundEffect = useMemo(() => new Howl({ src: [spinSound] }), []);
    const winSoundEffect = useMemo(() => new Howl({ src: [winSound] }), []);
    const bgSoundEffect = useMemo(() => new Howl({ src: [bgSound], loop: true, volume: 0.5 }), []);
    const bonusSoundEffect = useMemo(() => new Howl({ src: [bonusSound] }), []);

    useEffect(() => {
        bgSoundEffect.play();
        return () => {
            bgSoundEffect.stop();
        };
    }, [bgSoundEffect]);

    useEffect(() => {
        if (gameOver) {
            bgSoundEffect.stop();
        }
    }, [gameOver, bgSoundEffect]);

    useEffect(() => {
        if (bonusMessageVisible) {
            const timer = setTimeout(() => {
                setBonusMessageVisible(false);
            }, 2500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [bonusMessageVisible]);

    const winAmounts = {
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

    const spinReels = (isBonusSpin = false, multiplier = 1) => {
      // Explicitly reset winnings for regular spins only
      if (!isBonusSpin) {
          setWinnings(0);
      }
  
      // Ensure enough credits and cooldown
      if (credits < betSize || spinCooldown) {
          if (credits < betSize) {
              alert("Not enough credits to place this bet!");
              setGameOver(true);
          }
          return;
      }
  
      setSpinCooldown(true);
      setTimeout(() => setSpinCooldown(false), 1500);
  
      spinSoundEffect.play(); // Play spin sound
      setCredits((credits) => credits - betSize);
      setSpinning(true);
      setSpinCount(spinCount + 1);
      
      // Generate new reel symbols
      let newReels = Array.from({ length: 3 }, () => {
          return Array.from({ length: 3 }, () => weightedSymbolsArray[Math.floor(Math.random() * weightedSymbolsArray.length)]);
      });
  
      // Slightly increase chance of a win pattern
      if (Math.random() < 0.15) {
          const patternToMatch = winPatterns[Math.floor(Math.random() * winPatterns.length)];
          const symbolToUse = weightedSymbolsArray[Math.floor(Math.random() * weightedSymbolsArray.length)];
          patternToMatch.forEach(([row, col]) => {
              newReels[row][col] = symbolToUse;
          });
      }
  
      setReels(newReels);
  
      setTimeout(() => {
        setSpinning(false);
        const baseWinnings = checkForWin(newReels);
        const totalWinnings = baseWinnings * multiplier;

        if (totalWinnings > 0) {
            console.log(`You won: ${totalWinnings}`);
            setWin(true);
            setCredits((prevCredits) => prevCredits + totalWinnings);

            if (isBonusSpin) {
                // Accumulate bonus total
                setBonusTotal((prevBonusTotal) => prevBonusTotal + totalWinnings);
            } else {
                // Set winnings for regular spins
                setWinnings(totalWinnings);
            }

            try {
                winSoundEffect.currentTime = 0;
                winSoundEffect.play();
            } catch (error) {
                console.log("Error playing win sound:", error);
            }
        } else {
            console.log("No winnings this spin.");
            setWin(false);
        }
    }, 2500);
};
  
  

    const checkForWin = (reels) => {
      let totalWinnings = 0;
      let newWinningSymbols = [];
      const rowCount = 3; // Number of rows in the slot machine
  
      // Check horizontal patterns for wins
      for (let row = 0; row < rowCount; row++) {
          const symbol1 = reels[0][row];
          const symbol2 = reels[1][row];
          const symbol3 = reels[2][row];
  
          if (symbol1 === symbol2 && symbol2 === symbol3) {
              const winnings = (winAmounts[symbol1] || 0) * betSize; // Calculate winnings
              totalWinnings += winnings; // Add to total winnings
              newWinningSymbols.push(symbol1);
          }
      }
  
      // Check diagonal patterns for wins
      const diagonal1 = [reels[0][0], reels[1][1], reels[2][2]];
      const diagonal2 = [reels[0][2], reels[1][1], reels[2][0]];
  
      // Count diagonal wins
      if (new Set(diagonal1).size === 1) {
          const winnings = (winAmounts[diagonal1[0]] || 0) * betSize; // Calculate winnings
          totalWinnings += winnings; // Add to total winnings
          newWinningSymbols.push(diagonal1[0]);
      }
      if (new Set(diagonal2).size === 1) {
          const winnings = (winAmounts[diagonal2[0]] || 0) * betSize; // Calculate winnings
          totalWinnings += winnings; // Add to total winnings
          newWinningSymbols.push(diagonal2[0]);
      }
  
      // If all three reels have the same symbol, multiply the total winnings by 5
      const allSymbols = [
          reels[0][0],
          reels[1][0],
          reels[2][0],
          reels[0][1],
          reels[1][1],
          reels[2][1],
          reels[0][2],
          reels[1][2],
          reels[2][2],
      ];
  
      // Check if all symbols are the same
      const uniqueSymbols = new Set(allSymbols);
      if (uniqueSymbols.size === 1) {
          const winningSymbol = allSymbols[0];
          const allWinnings = (winAmounts[winningSymbol] || 0) * betSize * 5; // Multiply winnings by 5 and by bet size
          totalWinnings += allWinnings; // Add to total winnings
          newWinningSymbols.push(winningSymbol);
      }
  
      setWinningSymbols(newWinningSymbols);
      return totalWinnings;
  };
  

    const handleBetChange = (event) => {
        setBetSize(Number(event.target.value));
    };

    // Betting functions
    const handleBetMax = () => {
        setBetSize(betOptions[betOptions.length - 1]); // Set bet size to maximum
    };

    const handleBetDecrease = () => {
        setBetSize((prevBet) => Math.max(prevBet - 1, 1)); // Decrease bet size, ensuring it doesn't go below 1
    };

    const handleBetIncrease = () => {
        setBetSize((prevBet) => Math.min(prevBet + 1, betOptions[betOptions.length - 1])); // Increase bet size, ensuring it doesn't exceed max
    };

    const handleBonusSpin = () => {
      if (spinsLeft > 0) {
          const currentMultiplier = getMultiplierForSpin(spinsLeft);
          spinReels(true, currentMultiplier); // Spin with bonus multiplier
          setSpinsLeft(spinsLeft - 1);
          setCurrentMultiplierMessage(`x${currentMultiplier}`);
  
          // Remove bonusMessageVisible update here
          if (spinsLeft === 1) { // This will be the last spin
              setTimeout(() => {
                  handleBonusComplete(); // Call to end bonus round
              }, 2000);
          }
      } else {
          alert("No spins left in the bonus round!");
      }
  };

  const startBonusRound = () => {
    setBonusRoundActive(true);
    setBonusTotal(0);
    setSpinsLeft(5);
    setBonusMessageVisible(true); // Show bonus message only when bonus round starts
    bonusSoundEffect.play();

    // Hide the message after a short time
    setTimeout(() => {
        setBonusMessageVisible(false); // Hide after initial trigger
    }, 1500); // Adjust delay as needed for message visibility
};
  
const handleBonusComplete = () => {
  if (bonusRoundActive) {
      console.log("Ending bonus round with total win:", bonusTotal);
      setBonusRoundActive(false);
      setCredits((prevCredits) => prevCredits + bonusTotal);
      setBonusRoundEndMessage(`Bonus Round Over - Total Win: ${bonusTotal}`);
      setWinnings(bonusTotal); // Set winnings to total bonus winnings
      setBonusTotal(0);
      setSpinsLeft(0);
      setCurrentMultiplierMessage('');

      // Reset after a timeout to clear end message
      setTimeout(() => {
          setBonusRoundEndMessage('');
          setWinnings(0);
      }, 3500);
  }
};




const handleBonus = () => {
    if (bonusRoundActive) {
        handleBonusComplete();
    } else {
        startBonusRound();
    }
};


    return (
    <div className="slot-machine">
      {gameOver && <div className="game-over-message">GAME OVER</div>}
      {win && <div className="win-message">You Won!</div>}

      {/* Bonus round message only visible for 1.5 seconds */}
      {bonusMessageVisible && (
        <div className="bonus-message">Bonus Round 5 Spins</div>
      )}
      {/* Show bonus round end message if set */}
      {bonusRoundEndMessage && <div className="bonus-end-message">{bonusRoundEndMessage}</div>}

      <div className="controls">
        <button className="control-button" onClick={handleBonus}>Bonus</button>
        <button className="control-button" onClick={handleBetMax}>Bet Max</button>
      </div>

      <div className="bet-size">
        <h3>Bet Size:</h3>
        <button className="betsize-b" onClick={handleBetDecrease}>{"<"}</button>
        <span className="betsize">{betSize}</span>
        <button className="betsize-b" onClick={handleBetIncrease}>{">"}</button>
      </div>
      {/* Display current multiplier message */}
      {currentMultiplierMessage && (
        <div className="multiplier-message">{currentMultiplierMessage}</div>
      )}
      <div className="reels">
        {reels.map((symbols, index) => (
          <Reel 
            key={index} 
            symbols={symbols} 
            reelIndex={index}
            spinning={spinning} 
            winningSymbols={winningSymbols} 
          />
        ))}
      </div>

      <button 
        className="spin" 
        onClick={bonusRoundActive ? handleBonusSpin : spinReels} 
        disabled={gameOver || spinCooldown || (bonusRoundActive && spinsLeft <= 0)}
      >
        {bonusRoundActive ? spinsLeft : 'Spin'}
      </button>
      <div className="winning-credits"><h3>Winnings: {winnings + bonusTotal}</h3></div>
      <div className="credits"><h2>Credits: {credits}</h2></div>
      <Instructions />
    </div>
  );
};

export default SlotMachine;
