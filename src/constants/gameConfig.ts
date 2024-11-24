import { PetChances, PetRarity } from '../types/pets';

export const BASE_CHANCES: PetChances = {
  common: 0.15,    // 15%
  uncommon: 0.05,  // 5%
  rare: 0.01,      // 1%
  epic: 0.001,     // 0.1%
  legendary: 0.0001 // 0.01%
};

export const LINE_CLEAR_MULTIPLIERS = {
  1: 1,  // один ряд - базовый множитель
  2: 2,  // два ряда - x2
  3: 3,  // три ряда - x3
  4: 5   // тетрис - x5
};

export const PET_TYPES: Record<PetRarity, Array<{type: string, dropRateBonus: number}>> = {
  common: [
    { type: 'Котёнок', dropRateBonus: 2 },
    { type: 'Щенок', dropRateBonus: 2 },
    { type: 'Хомячок', dropRateBonus: 2 },
    { type: 'Кролик', dropRateBonus: 2 }
  ],
  uncommon: [
    { type: 'Лиса', dropRateBonus: 4 },
    { type: 'Енот', dropRateBonus: 4 },
    { type: 'Панда', dropRateBonus: 4 },
    { type: 'Капибара', dropRateBonus: 4 }
  ],
  rare: [
    { type: 'Единорог', dropRateBonus: 10 },
    { type: 'Феникс', dropRateBonus: 10 },
    { type: 'Грифон', dropRateBonus: 10 }
  ],
  epic: [
    { type: 'Дракон', dropRateBonus: 15 },
    { type: 'Левиафан', dropRateBonus: 15 }
  ],
  legendary: [
    { type: 'Космический кит', dropRateBonus: 20 },
    { type: 'Древний феникс', dropRateBonus: 20 },
    { type: 'Звёздный дракон', dropRateBonus: 20 },
    { type: 'Хранитель времени', dropRateBonus: 20 },
    { type: 'Радужный единорог', dropRateBonus: 20 }
  ]
};

export const LEGENDARY_BONUSES = {
  'Космический кит': {
    type: 'slowFall' as const,
    description: 'Замедляет падение фигур на 15%',
    value: 15
  },
  'Древний феникс': {
    type: 'burnPiece' as const,
    description: 'Позволяет "сжечь" одну фигуру раз в 3 минуты',
    value: 180 // секунд
  },
  'Звёздный дракон': {
    type: 'showExtraNextPiece' as const,
    description: 'Показывает тень следующей фигуры после следующей',
    value: 1
  },
  'Хранитель времени': {
    type: 'undoMove' as const,
    description: 'Возможность отменить последнее действие раз в 5 минут',
    value: 300 // секунд
  },
  'Радужный единорог': {
    type: 'guaranteedRare' as const,
    description: 'Каждый 10-й тетрис даёт гарантированного редкого питомца',
    value: 10
  }
}; 