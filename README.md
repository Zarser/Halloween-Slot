# Halloween Slot Game

Welcome to the **Halloween Slot Game**! Spin the reels, match symbols, and enjoy thrilling bonus rounds in this spooky-themed slot machine experience. This project is built with React and offers a fun way to test your luck!

## Table of Contents

- [Game Description](#game-description)
- [How It Works](#how-it-works)
- [Game Logic](#game-logic)
- [Installation](#installation)
- [Attributions](#attributions)


## Game Description

The Halloween Slot Game is a browser-based slot machine featuring Halloween-themed symbols. Players can spin the reels to match symbols for prizes. The game includes a bonus round that can be triggered by pressing the Bonus button, which costs 100 times the current bet size. The goal is to match symbols either horizontally or diagonally to win!

## How It Works

1. **Reels and Symbols**: The game consists of multiple reels with various Halloween-themed symbols such as pumpkins, witches, and ghosts. Each symbol has a specific win value.
2. **Betting System**: Players can choose their bet size, and the total win is calculated based on the bet multiplied by the win amount of matched symbols.
3. **Bonus Rounds**: Players can trigger bonus rounds that offer extra spins and increased multipliers, enhancing the chances of winning big.
4. **User Interface**: The game features a simple user interface built with React, allowing players to interact seamlessly.

## Game Logic

The core game logic is implemented using React components. Here’s a high-level overview of how the logic works:

- **Spin Mechanism**: When the "Spin" button is clicked, the game checks for winning combinations on the reels. 
- **Win Calculation**: The win amount is calculated based on the symbols matched and the player's current bet size.
- **Bonus Round Activation**: The Bonus button activates a special round where players have a limited number of spins and can earn additional multipliers.
- **End Game Logic**: If no spins are left in the bonus round, the game resets the winnings and goes back to the default state.

### Code Structure

- **Components**:
  - `SlotMachine.js`: Main component that manages game state, including symbols, current bet, and spin logic.
  - `Login.js` and `Register.js`: User authentication components for managing user sessions.
  - Other components for displaying results and user interactions.

- **Assets**:
  - Images of symbols are stored in the `assets/images` folder and imported into the components for display.

### Attributions
- Symbols is from FlatIcon.
- All sounds if from free licens of youtube.

## Installation

To set up the Halloween Slot Game on your local machine, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/halloween-slot.git
