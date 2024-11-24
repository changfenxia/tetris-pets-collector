import React, { useState, useEffect, useCallback } from 'react';
import { TETROMINOS, BOARD_WIDTH, BOARD_HEIGHT, INITIAL_DROP_TIME } from '../constants/tetrominos';
import { Grid, TetrominoType, Position } from '../types/tetris';
import '../styles/GameBoard.css';
import { Pet } from '../types/pets';
import { rollForPet, generatePetName } from '../utils/petCalculations';
import { PET_TYPES } from '../constants/gameConfig';

interface GameBoardProps {
  onPetObtained: (pet: Pet) => void;
  onTetris: () => void;
  collectedPets: Pet[];
  score: number;
  setScore: (score: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  onPetObtained,
  onTetris,
  collectedPets,
  score,
  setScore
}) => {
  const createEmptyBoard = (): Grid => 
    Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));

  const [board, setBoard] = useState<Grid>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<TetrominoType>('I');
  const [position, setPosition] = useState<Position>({ x: BOARD_WIDTH / 2 - 2, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [dropTime, setDropTime] = useState<number | null>(INITIAL_DROP_TIME);
  const [gameOver, setGameOver] = useState(false);

  // Получить случайную фигуру
  const getRandomTetromino = (): TetrominoType => {
    const pieces: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
    return pieces[Math.floor(Math.random() * pieces.length)];
  };

  // Проверка столкновений
  const checkCollision = (
    pos: Position,
    shape: number[][],
    rot: number
  ): boolean => {
    const rotatedShape = rotateMatrix(shape, rot);
    
    for (let y = 0; y < rotatedShape.length; y++) {
      for (let x = 0; x < rotatedShape[y].length; x++) {
        if (rotatedShape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;

          if (
            newX < 0 || 
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Поворот матрицы
  const rotateMatrix = (matrix: number[][], times: number = 1): number[][] => {
    let rotated = [...matrix];
    for (let i = 0; i < times % 4; i++) {
      rotated = rotated[0].map((_, index) =>
        rotated.map(row => row[index]).reverse()
      );
    }
    return rotated;
  };

  // Обноление игрового поля
  const updateBoard = useCallback(() => {
    const newBoard = createEmptyBoard();
    
    // Добавляем зафиксированные фигуры
    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) newBoard[y][x] = cell;
      });
    });

    // Добавляем текущую фигуру
    const shape = TETROMINOS[currentPiece].shape;
    const rotatedShape = rotateMatrix(shape, rotation);

    rotatedShape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const newY = y + position.y;
          const newX = x + position.x;
          if (newY >= 0) {
            newBoard[newY][newX] = currentPiece;
          }
        }
      });
    });

    return newBoard;
  }, [board, currentPiece, position, rotation]);

  // Движение фигуры вниз
  const moveDown = () => {
    if (!checkCollision(
      { x: position.x, y: position.y + 1 },
      TETROMINOS[currentPiece].shape,
      rotation
    )) {
      setPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      // Фиксация фигуры
      if (position.y < 1) {
        setGameOver(true);
        return;
      }

      // Создаем новую доску и фиксируем текущую фигуру
      const newBoard = board.map(row => [...row]);
      const shape = rotateMatrix(TETROMINOS[currentPiece].shape, rotation);
      
      shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const newY = y + position.y;
            const newX = x + position.x;
            if (newY >= 0 && newY < BOARD_HEIGHT && newX >= 0 && newX < BOARD_WIDTH) {
              newBoard[newY][newX] = currentPiece;
            }
          }
        });
      });

      // Проверяем заполненные ряды
      let linesCleared = 0;
      const finalBoard: Grid = [];
      
      // Сначала собираем незаполненные ряды
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        const row = newBoard[y];
        if (!row.every(cell => cell !== null)) {
          finalBoard.push([...row]);
        } else {
          linesCleared++;
        }
      }

      // Добавляем пустые ряды сверху
      const emptyRows = Array(linesCleared).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
      const updatedBoard = [...emptyRows, ...finalBoard];

      // Обновляем состояние одним действием
      setBoard(updatedBoard);
      
      if (linesCleared > 0) {
        setScore(score + (linesCleared * 100));
        
        // Если собран тетрис
        if (linesCleared === 4) {
          onTetris();
        }
        
        // Проверяем получение питомца
        const petRarity = rollForPet(linesCleared, collectedPets);
        if (petRarity) {
          const possiblePets = PET_TYPES[petRarity];
          const randomPet = possiblePets[Math.floor(Math.random() * possiblePets.length)];
          
          const newPet: Pet = {
            id: Date.now().toString(),
            name: generatePetName(randomPet.type, petRarity),
            rarity: petRarity,
            type: randomPet.type,
            dropRateBonus: randomPet.dropRateBonus
          };

          onPetObtained(newPet);
        }
      }

      // Создаем новую фигуру
      setCurrentPiece(getRandomTetromino());
      setPosition({ x: BOARD_WIDTH / 2 - 2, y: 0 });
      setRotation(0);
    }
  };

  // Движение влево/впрво
  const move = (dir: number) => {
    if (!checkCollision(
      { x: position.x + dir, y: position.y },
      TETROMINOS[currentPiece].shape,
      rotation
    )) {
      setPosition(prev => ({ ...prev, x: prev.x + dir }));
    }
  };

  // Поворот фигуры
  const rotate = () => {
    const newRotation = (rotation + 1) % 4;
    if (!checkCollision(
      position,
      TETROMINOS[currentPiece].shape,
      newRotation
    )) {
      setRotation(newRotation);
    }
  };

  // Управление с клавиатуры
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameOver) {
        // Предотвращаем стандартное поведение клавиш
        e.preventDefault();
        
        switch (e.key) {
          case 'ArrowLeft':
            move(-1);
            break;
          case 'ArrowRight':
            move(1);
            break;
          case 'ArrowDown':
            moveDown();
            break;
          case 'ArrowUp':
            rotate();
            break;
          case ' ':
            // Мгновенное падение
            while (!checkCollision(
              { x: position.x, y: position.y + 1 },
              TETROMINOS[currentPiece].shape,
              rotation
            )) {
              setPosition(prev => ({ ...prev, y: prev.y + 1 }));
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameOver, position, currentPiece, rotation, board]);

  // Автоматическое падение
  useEffect(() => {
    if (!gameOver && dropTime) {
      const timer = setInterval(() => {
        moveDown();
      }, dropTime);

      return () => {
        clearInterval(timer);
      };
    }
  }, [gameOver, dropTime, position]);

  // Отрисовка игрового поля
  const renderBoard = () => {
    const displayBoard = updateBoard();
    return displayBoard.map((row, y) => (
      <div key={y} className="grid-row">
        {row.map((cell, x) => (
          <div 
            key={`${x}-${y}`} 
            className={`cell ${cell || ''}`}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="game-board">
      <div className="score">Счёт: {score}</div>
      <div className="tetris-grid">
        {renderBoard()}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <div className="final-stats">
            <div className="final-score">Финальный счёт: {score}</div>
            <div className="final-score">Питомцев получено: {collectedPets.length}</div>
          </div>
          <button onClick={() => {
            setBoard(createEmptyBoard());
            setCurrentPiece(getRandomTetromino());
            setPosition({ x: BOARD_WIDTH / 2 - 2, y: 0 });
            setRotation(0);
            setGameOver(false);
            setScore(0);
            setDropTime(INITIAL_DROP_TIME);
          }}>
            Новая игра
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard; 