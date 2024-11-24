import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import PetsPanel from './components/PetsPanel';
import { Pet, PetRarity } from './types/pets';
import { GameStats } from './types/achievements';
import { PET_TYPES } from './constants/gameConfig';
import { generatePetName } from './utils/petCalculations';
import { ACHIEVEMENTS } from './constants/achievements';
import './styles/App.css';

const App: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [score, setScore] = useState<number>(0);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [stats, setStats] = useState<GameStats>({
    totalScore: 0,
    tetrisCount: 0,
    petsCollected: {
      total: 0,
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0
    },
    specificPets: {}
  });

  const handlePetObtained = (newPet: Pet) => {
    setPets(prevPets => [...prevPets, newPet]);
    setStats(prevStats => ({
      ...prevStats,
      petsCollected: {
        ...prevStats.petsCollected,
        total: prevStats.petsCollected.total + 1,
        [newPet.rarity]: prevStats.petsCollected[newPet.rarity] + 1
      },
      specificPets: {
        ...prevStats.specificPets,
        [newPet.type]: (prevStats.specificPets[newPet.type] || 0) + 1
      }
    }));

    // Создаем уведомление о получении питомца
    createNotification(`Получен ${newPet.name}!`, `pet-notification ${newPet.rarity}`);
  };

  const handleTetris = () => {
    setStats(prevStats => ({
      ...prevStats,
      tetrisCount: prevStats.tetrisCount + 1
    }));
  };

  // Добавим функцию создания уведомлений
  const createNotification = (content: string, className: string) => {
    let container = document.querySelector('.notifications-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'notifications-container';
      document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = `notification ${className}`;
    notification.textContent = content;

    container.appendChild(notification);

    setTimeout(() => {
      notification.addEventListener('transitionend', () => {
        notification.remove();
        if (container && container.children.length === 0) {
          container.remove();
        }
      });
      notification.style.opacity = '0';
    }, 4500);
  };

  // Обновляем достижения при изменении статистики
  useEffect(() => {
    const newAchievements = achievements.map(achievement => {
      const wasCompleted = achievement.completed;
      const isCompleted = achievement.condition(stats);
      
      // Показываем уведомление только если достижение только что выполнено
      // и не было выполнено раньше
      if (!wasCompleted && isCompleted && !achievement.completed) {
        createNotification(
          `🏆 Достижение разблокировано: ${
            achievement.secret ? achievement.secretTitle : achievement.title
          }`,
          'achievement-notification'
        );
      }
      
      return {
        ...achievement,
        completed: isCompleted
      };
    });

    // Обнов��яем состояние только если есть изменения
    if (JSON.stringify(newAchievements) !== JSON.stringify(achievements)) {
      setAchievements(newAchievements);
    }
  }, [stats]);

  // Обновляем общий счет в статистике
  useEffect(() => {
    setStats(prevStats => ({
      ...prevStats,
      totalScore: score
    }));
  }, [score]);

  // Тестовая функция для добавления случайного питомца
  const addRandomPet = () => {
    const rarities: PetRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
    const possiblePets = PET_TYPES[randomRarity];
    const randomPet = possiblePets[Math.floor(Math.random() * possiblePets.length)];
    
    const newPet: Pet = {
      id: Date.now().toString(),
      name: generatePetName(randomPet.type, randomRarity),
      rarity: randomRarity,
      type: randomPet.type,
      dropRateBonus: randomPet.dropRateBonus
    };

    handlePetObtained(newPet);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Tetris Pets</h1>
        <div className="score-container">
          <span>Счёт: {score}</span>
          <button onClick={addRandomPet} className="debug-button">Получить питомца</button>
        </div>
      </header>
      <main className="game-container">
        <div className="game-board-container">
          <GameBoard 
            onPetObtained={handlePetObtained}
            onTetris={handleTetris}
            collectedPets={pets}
            score={score}
            setScore={setScore}
          />
        </div>
        <div className="pets-panel-container">
          <PetsPanel pets={pets} achievements={achievements} />
        </div>
      </main>
    </div>
  );
};

export default App; 