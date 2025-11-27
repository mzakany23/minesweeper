import { useState, useCallback } from 'react';
import type { CellData, GameState } from '../types';

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],          [0, 1],
  [1, -1],  [1, 0], [1, 1],
];

function createEmptyGrid(size: number): CellData[][] {
  return Array.from({ length: size }, (_, x) =>
    Array.from({ length: size }, (_, y) => ({
      x,
      y,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    }))
  );
}

function placeMines(grid: CellData[][], mineCount: number, excludeX?: number, excludeY?: number): void {
  const size = grid.length;
  let placed = 0;

  while (placed < mineCount) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    // Don't place mine on excluded cell (first click) or if already a mine
    if (grid[x][y].isMine) continue;
    if (excludeX !== undefined && excludeY !== undefined && x === excludeX && y === excludeY) continue;

    grid[x][y].isMine = true;
    placed++;
  }
}

function calculateNeighborMines(grid: CellData[][]): void {
  const size = grid.length;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (grid[x][y].isMine) continue;

      let count = 0;
      for (const [dx, dy] of DIRECTIONS) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size && grid[nx][ny].isMine) {
          count++;
        }
      }
      grid[x][y].neighborMines = count;
    }
  }
}

function revealCell(grid: CellData[][], x: number, y: number): void {
  const size = grid.length;
  const cell = grid[x][y];

  if (cell.isRevealed || cell.isFlagged) return;

  cell.isRevealed = true;

  // If cell has no neighbor mines, reveal neighbors (flood fill)
  if (cell.neighborMines === 0 && !cell.isMine) {
    for (const [dx, dy] of DIRECTIONS) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
        revealCell(grid, nx, ny);
      }
    }
  }
}

function checkWinCondition(grid: CellData[][]): boolean {
  for (const row of grid) {
    for (const cell of row) {
      // If there's a non-mine cell that's not revealed, game isn't won
      if (!cell.isMine && !cell.isRevealed) return false;
    }
  }
  return true;
}

function revealAllMines(grid: CellData[][]): void {
  for (const row of grid) {
    for (const cell of row) {
      if (cell.isMine) {
        cell.isRevealed = true;
      }
    }
  }
}

export function useMinesweeper(initialSize = 10, initialMines = 20) {
  const [gameState, setGameState] = useState<GameState>(() => ({
    grid: createEmptyGrid(initialSize),
    gameStatus: 'playing',
    minesCount: initialMines,
    flagsRemaining: initialMines,
    size: initialSize,
  }));

  const [isFirstClick, setIsFirstClick] = useState(true);

  const resetGame = useCallback((size = initialSize, mines = initialMines) => {
    setGameState({
      grid: createEmptyGrid(size),
      gameStatus: 'playing',
      minesCount: mines,
      flagsRemaining: mines,
      size,
    });
    setIsFirstClick(true);
  }, [initialSize, initialMines]);

  const handleCellClick = useCallback((x: number, y: number) => {
    setGameState((prev) => {
      if (prev.gameStatus !== 'playing') return prev;

      const cell = prev.grid[x][y];
      if (cell.isRevealed || cell.isFlagged) return prev;

      // Deep copy the grid
      const newGrid = prev.grid.map(row => row.map(c => ({ ...c })));

      // On first click, place mines avoiding the clicked cell
      if (isFirstClick) {
        placeMines(newGrid, prev.minesCount, x, y);
        calculateNeighborMines(newGrid);
        setIsFirstClick(false);
      }

      const clickedCell = newGrid[x][y];

      if (clickedCell.isMine) {
        revealAllMines(newGrid);
        return { ...prev, grid: newGrid, gameStatus: 'lost' };
      }

      revealCell(newGrid, x, y);

      const won = checkWinCondition(newGrid);
      return {
        ...prev,
        grid: newGrid,
        gameStatus: won ? 'won' : 'playing',
      };
    });
  }, [isFirstClick]);

  const handleCellRightClick = useCallback((x: number, y: number) => {
    setGameState((prev) => {
      if (prev.gameStatus !== 'playing') return prev;

      const cell = prev.grid[x][y];
      if (cell.isRevealed) return prev;

      // Can't place more flags than mines
      if (!cell.isFlagged && prev.flagsRemaining <= 0) return prev;

      const newGrid = prev.grid.map(row => row.map(c => ({ ...c })));
      newGrid[x][y].isFlagged = !newGrid[x][y].isFlagged;

      return {
        ...prev,
        grid: newGrid,
        flagsRemaining: prev.flagsRemaining + (cell.isFlagged ? 1 : -1),
      };
    });
  }, []);

  return {
    gameState,
    handleCellClick,
    handleCellRightClick,
    resetGame,
  };
}
