export interface CellData {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export interface GameState {
  grid: CellData[][];
  gameStatus: 'playing' | 'won' | 'lost';
  minesCount: number;
  flagsRemaining: number;
  size: number;
}

export type CellStatus = 'hidden' | 'revealed' | 'flagged' | 'exploded';
