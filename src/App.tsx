import { useState } from 'react';
import { useMinesweeper } from './hooks/useMinesweeper';
import { Board } from './components/Board';
import './App.css';

const GAME_SIZE = 10;
const MINE_COUNT = 20;

function App() {
  const { gameState, handleCellClick, handleCellRightClick, resetGame } = useMinesweeper(
    GAME_SIZE,
    MINE_COUNT
  );
  const [showRules, setShowRules] = useState(false);

  const gameOver = gameState.gameStatus !== 'playing';

  const getStatusEmoji = () => {
    switch (gameState.gameStatus) {
      case 'won':
        return '😎';
      case 'lost':
        return '😵';
      default:
        return '🙂';
    }
  };

  return (
    <div className="app">
      <header className="header">
        <img src="/me.jpg" alt="Author" className="author-logo" />
        <h1>Minesweeper</h1>
      </header>

      <div className="game-container">
        <div className="status-bar">
          <div className="counter">{String(gameState.flagsRemaining).padStart(3, '0')}</div>
          <button className="reset-button" onClick={() => resetGame()}>
            {getStatusEmoji()}
          </button>
          <div className="counter">{String(gameState.minesCount).padStart(3, '0')}</div>
        </div>

        <Board
          grid={gameState.grid}
          gameOver={gameOver}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
        />

        {gameOver && (
          <div className="game-over-message">
            {gameState.gameStatus === 'won' ? 'You Win!' : 'Game Over!'}
          </div>
        )}
      </div>

      <button className="rules-toggle" onClick={() => setShowRules(!showRules)}>
        {showRules ? 'Hide Rules' : 'Show Rules'}
      </button>

      {showRules && (
        <div className="rules-section">
          <h2>How to Play</h2>
          <ul>
            <li><strong>Goal:</strong> Reveal all cells that don't contain mines</li>
            <li><strong>Click</strong> (or tap) a cell to reveal it</li>
            <li><strong>Right-click</strong> (or long-press on mobile) to flag a suspected mine</li>
            <li><strong>Numbers</strong> show how many mines are adjacent to that cell</li>
            <li><strong>Empty cells</strong> automatically reveal their neighbors</li>
            <li>The left counter shows remaining flags, the right shows total mines</li>
            <li>Click the face to restart the game</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
