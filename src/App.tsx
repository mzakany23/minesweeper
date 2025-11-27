import { useState } from 'react';
import { useMinesweeper } from './hooks/useMinesweeper';
import { Board } from './components/Board';
import './App.css';

type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTIES: Record<Difficulty, { size: number; mines: number; label: string }> = {
  easy: { size: 8, mines: 10, label: 'Easy' },
  medium: { size: 10, mines: 20, label: 'Medium' },
  hard: { size: 16, mines: 40, label: 'Hard' },
};

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [showRules, setShowRules] = useState(false);

  const { size, mines } = DIFFICULTIES[difficulty];
  const { gameState, timer, handleCellClick, handleCellRightClick, resetGame } = useMinesweeper(
    size,
    mines
  );

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

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    const { size: newSize, mines: newMines } = DIFFICULTIES[newDifficulty];
    resetGame(newSize, newMines);
  };

  return (
    <div className="app">
      <header className="header">
        <img src="/me.jpg" alt="Author" className="author-logo" />
        <h1>Minesweeper</h1>
      </header>

      <div className="difficulty-selector">
        {(Object.keys(DIFFICULTIES) as Difficulty[]).map((diff) => (
          <button
            key={diff}
            className={`difficulty-btn ${difficulty === diff ? 'active' : ''}`}
            onClick={() => handleDifficultyChange(diff)}
          >
            {DIFFICULTIES[diff].label}
          </button>
        ))}
      </div>

      <div className={`game-container difficulty-${difficulty}`}>
        <div className="status-bar">
          <div className="counter">{String(gameState.flagsRemaining).padStart(3, '0')}</div>
          <button className="reset-button" onClick={() => resetGame(size, mines)}>
            {getStatusEmoji()}
          </button>
          <div className="counter">{String(timer).padStart(3, '0')}</div>
        </div>

        <Board
          grid={gameState.grid}
          gameOver={gameOver}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
        />

        {gameOver && (
          <div className="game-over-message">
            {gameState.gameStatus === 'won'
              ? `You Win! Time: ${timer}s`
              : 'Game Over!'}
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
            <li>The left counter shows remaining flags, the right shows time</li>
            <li>Click the face to restart the game</li>
          </ul>
          <h3>Difficulty Levels</h3>
          <ul>
            <li><strong>Easy:</strong> 8×8 grid, 10 mines</li>
            <li><strong>Medium:</strong> 10×10 grid, 20 mines</li>
            <li><strong>Hard:</strong> 16×16 grid, 40 mines</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
