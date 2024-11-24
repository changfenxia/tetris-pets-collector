import { Achievement } from '../types/achievements';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_pet',
    title: '🎉 Начинающий коллекционер',
    description: 'Получите своего первого питомца',
    condition: (stats) => stats.petsCollected.total >= 1,
    completed: false
  },
  {
    id: 'common_collector',
    title: '🐱 Любитель животных',
    description: 'Соберите 10 обычных питомцев',
    condition: (stats) => stats.petsCollected.common >= 10,
    completed: false
  },
  {
    id: 'first_rare',
    title: '✨ Редкий случай',
    description: 'Получите первого редкого питомца',
    condition: (stats) => stats.petsCollected.rare >= 1,
    completed: false
  },
  {
    id: 'epic_master',
    title: '🐲 Повелитель драконов',
    description: 'Соберите 3 эпических питомца',
    condition: (stats) => stats.petsCollected.epic >= 3,
    completed: false
  },
  {
    id: 'legendary_first',
    title: '👑 Легендарный коллекционер',
    description: 'Получите первого легендарного питомца',
    condition: (stats) => stats.petsCollected.legendary >= 1,
    completed: false
  },
  {
    id: 'unicorn_master',
    title: '❓ ???',
    description: '❓ ???',
    secretTitle: '🦄 Повелитель единорогов',
    secretDescription: 'Получите легендарного Радужного единорога',
    condition: (stats) => (stats.specificPets['Радужный единорог'] || 0) >= 1,
    completed: false,
    secret: true
  },
  {
    id: 'time_lord',
    title: '❓ ???',
    description: '❓ ???',
    secretTitle: '⌛ Властелин времени',
    secretDescription: 'Получите Хранителя времени и сделайте 100 тетрисов',
    condition: (stats) => (stats.specificPets['Хранитель времени'] || 0) >= 1 && stats.tetrisCount >= 100,
    completed: false,
    secret: true
  },
  {
    id: 'dragon_tamer',
    title: '❓ ???',
    description: '❓ ???',
    secretTitle: '🐉 Укротитель драконов',
    secretDescription: 'Соберите всех драконов в игре',
    condition: (stats) => 
      (stats.specificPets['Дракон'] || 0) >= 1 && 
      (stats.specificPets['Звёздный дракон'] || 0) >= 1,
    completed: false,
    secret: true
  },
  {
    id: 'tetris_god',
    title: '❓ ???',
    description: '❓ ???',
    secretTitle: '🏆 Бог тетриса',
    secretDescription: 'Сделайте 5 тетрисов подряд',
    condition: (stats) => stats.tetrisCount >= 50,
    completed: false,
    secret: true
  },
  {
    id: 'collector_5000',
    title: '❓ ???',
    description: '❓ ???',
    secretTitle: '💫 Коллекционер 5000',
    secretDescription: 'Соберите питомцев с общим бонусом более 50%',
    condition: (stats) => stats.petsCollected.total >= 20,
    completed: false,
    secret: true
  }
]; 