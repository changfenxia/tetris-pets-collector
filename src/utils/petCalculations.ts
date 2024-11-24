import { Pet, PetRarity } from '../types/pets';
import { BASE_CHANCES, LINE_CLEAR_MULTIPLIERS } from '../constants/gameConfig';

export const calculatePetChance = (
  rarity: PetRarity, 
  linesCleared: number,
  collectedPets: Pet[]
): number => {
  const baseChance = BASE_CHANCES[rarity];
  const multiplier = LINE_CLEAR_MULTIPLIERS[linesCleared as keyof typeof LINE_CLEAR_MULTIPLIERS] || 1;
  
  // Рассчитываем суммарный бонус от всех питомцев
  const totalBonus = collectedPets.reduce((sum, pet) => sum + pet.dropRateBonus, 0) / 100;
  
  // Применяем бонус к базовому шансу
  return baseChance * multiplier * (1 + totalBonus);
};

export const rollForPet = (
  linesCleared: number, 
  collectedPets: Pet[]
): PetRarity | null => {
  const roll = Math.random();
  let cumulativeChance = 0;

  for (const [rarity] of Object.entries(BASE_CHANCES)) {
    const adjustedChance = calculatePetChance(
      rarity as PetRarity, 
      linesCleared, 
      collectedPets
    );
    cumulativeChance += adjustedChance;
    
    if (roll < cumulativeChance) {
      return rarity as PetRarity;
    }
  }

  return null;
};

const COMMON_PREFIXES = [
  'Милый', 'Весёлый', 'Озорной', 'Сонный', 'Игривый', 'Пушистый', 'Забавный'
];

const UNCOMMON_PREFIXES = [
  'Хитрый', 'Ловкий', 'Быстрый', 'Смелый', 'Находчивый', 'Мудрый', 'Проворный'
];

const RARE_PREFIXES = [
  'Таинственный', 'Загадочный', 'Мистический', 'Волшебный', 'Сказочный', 'Чудесный'
];

const EPIC_PREFIXES = [
  'Величественный', 'Могущественный', 'Древний', 'Бессмертный', 'Легендарный', 
  'Божественный', 'Мифический', 'Потусторонний'
];

const LEGENDARY_PREFIXES = [
  'Всемогущий', 'Космический', 'Вселенский', 'Астральный', 'Божественный',
  'Запредельный', 'Трансцендентный', 'Бесконечный', 'Вечный'
];

const COMMON_SUFFIXES = [
  'Искатель', 'Странник', 'Путник', 'Друг', 'Хранитель'
];

const UNCOMMON_SUFFIXES = [
  'Следопыт', 'Охотник', 'Исследователь', 'Мечтатель', 'Защитник'
];

const RARE_SUFFIXES = [
  'Мудрец', 'Провидец', 'Чародей', 'Волшебник', 'Заклинатель'
];

const EPIC_SUFFIXES = [
  'Повелитель', 'Властелин', 'Покоритель', 'Разрушитель', 'Создатель',
  'Хранитель Миров', 'Властитель Судеб'
];

const LEGENDARY_SUFFIXES = [
  'Властелин', 'Хранитель', 'Повелитель',
  'Разрушитель', 'Создатель', 'Владыка'
];

const EPIC_TITLES = [
  'Древних Легенд', 'Стихий', 'Равновесия',
  'Судеб', 'Времени'
];

const LEGENDARY_TITLES = [
  'Границ Реальности', 
  'Вселенских Тайн',
  'Бесконечности', 
  'Новых Миров',
  'Пространства'
];

export const generatePetName = (type: string, rarity: PetRarity): string => {
  let prefixes: string[];
  let suffixes: string[];
  
  // Выбираем наборы префиксов и суффиксов в зависимости от редкости
  switch (rarity) {
    case 'legendary':
      prefixes = LEGENDARY_PREFIXES;
      suffixes = LEGENDARY_SUFFIXES;
      break;
    case 'epic':
      prefixes = EPIC_PREFIXES;
      suffixes = EPIC_SUFFIXES;
      break;
    case 'rare':
      prefixes = RARE_PREFIXES;
      suffixes = RARE_SUFFIXES;
      break;
    case 'uncommon':
      prefixes = UNCOMMON_PREFIXES;
      suffixes = UNCOMMON_SUFFIXES;
      break;
    default:
      prefixes = COMMON_PREFIXES;
      suffixes = COMMON_SUFFIXES;
  }

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  // Добавляем дополнительные титулы для эпических и легендарных питомцев
  if (rarity === 'legendary') {
    const title = LEGENDARY_TITLES[Math.floor(Math.random() * LEGENDARY_TITLES.length)];
    return `${prefix} ${type} ${suffix} ${title}`;
  } else if (rarity === 'epic') {
    const title = EPIC_TITLES[Math.floor(Math.random() * EPIC_TITLES.length)];
    return `${prefix} ${type} ${suffix} ${title}`;
  }

  return `${prefix} ${type} ${suffix}`;
}; 