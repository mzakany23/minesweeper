import { memo, useRef, useCallback } from 'react';
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

const LONG_PRESS_DURATION = 500;

export const Cell = memo(function Cell({ cell, gameOver, onClick, onRightClick }: CellProps) {
  const longPressTimer = useRef<number | null>(null);
  const isLongPress = useRef(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick();
  };

  const handleTouchStart = useCallback(() => {
    isLongPress.current = false;
    longPressTimer.current = window.setTimeout(() => {
      isLongPress.current = true;
      onRightClick();
    }, LONG_PRESS_DURATION);
  }, [onRightClick]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleClick = useCallback(() => {
    // Don't trigger click if it was a long press
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    onClick();
  }, [onClick]);

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
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchEnd}
      disabled={gameOver && !cell.isRevealed}
      style={numberColor ? { color: numberColor } : undefined}
    >
      {content}
    </button>
  );
});
