import { memo } from 'react';
import type { CellData } from '../types';
import './Cell.css';

interface CellProps {
  cell: CellData;
  gameOver: boolean;
  onClick: () => void;
  onRightClick: () => void;
}

const NUMBER_COLORS: Record<number, string> = {
  1: 'blue',
  2: 'green',
  3: 'red',
  4: 'purple',
  5: 'maroon',
  6: 'turquoise',
  7: 'black',
  8: 'gray',
};

export const Cell = memo(function Cell({ cell, gameOver, onClick, onRightClick }: CellProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick();
  };

  const getCellContent = () => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    if (cell.neighborMines > 0) return cell.neighborMines;
    return '';
  };

  const getCellClass = () => {
    const classes = ['cell'];

    if (cell.isRevealed) {
      classes.push('revealed');
      if (cell.isMine) {
        classes.push('mine');
      }
    } else if (cell.isFlagged) {
      classes.push('flagged');
    } else {
      classes.push('hidden');
    }

    return classes.join(' ');
  };

  const content = getCellContent();
  const numberColor = typeof content === 'number' ? NUMBER_COLORS[content] : undefined;

  return (
    <button
      className={getCellClass()}
      onClick={onClick}
      onContextMenu={handleContextMenu}
      disabled={gameOver && !cell.isRevealed}
      style={numberColor ? { color: numberColor } : undefined}
    >
      {content}
    </button>
  );
});
