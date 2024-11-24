import { TetrominoType } from '../types/tetris';

interface Tetromino {
  shape: number[][];
  color: string;
}

export const TETROMINOS: Record<TetrominoType, Tetromino> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ] as number[][],
    color: 'cyan'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ] as number[][],
    color: 'yellow'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ] as number[][],
    color: 'purple'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ] as number[][],
    color: 'green'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ] as number[][],
    color: 'red'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ] as number[][],
    color: 'blue'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ] as number[][],
    color: 'orange'
  }
};

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const INITIAL_DROP_TIME = 1000; // 1 секунда

export type TetrominoShape = number[][];