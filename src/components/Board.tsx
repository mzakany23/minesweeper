import { Cell } from './Cell';
import type { CellData } from '../types';
import './Board.css';

interface BoardProps {
  grid: CellData[][];
  gameOver: boolean;
  onCellClick: (x: number, y: number) => void;
  onCellRightClick: (x: number, y: number) => void;
}

export function Board({ grid, gameOver, onCellClick, onCellRightClick }: BoardProps) {
  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${grid.length}, var(--cell-size, 32px))` }}>
      {grid.map((row, x) =>
        row.map((cell, y) => (
          <Cell
            key={`${x}-${y}`}
            cell={cell}
            gameOver={gameOver}
            onClick={() => onCellClick(x, y)}
            onRightClick={() => onCellRightClick(x, y)}
          />
        ))
      )}
    </div>
  );
}
