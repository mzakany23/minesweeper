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
      <h1>Minesweeper</h1>

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

      <p className="instructions">
        Left-click to reveal | Right-click to flag
      </p>
    </div>
  );
}

export default App;
