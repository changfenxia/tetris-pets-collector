import React, { useState } from 'react';
import { Pet, PetRarity } from '../types/pets';
import { Achievement } from '../types/achievements';
import '../styles/PetsPanel.css';

interface PetsPanelProps {
  pets: Pet[];
  achievements: Achievement[];
}

const PetsPanel: React.FC<PetsPanelProps> = ({ pets, achievements }) => {
  const [activeTab, setActiveTab] = useState<'pets' | 'achievements'>('pets');

  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common': return '#ffffff';
      case 'uncommon': return '#1eff00';
      case 'rare': return '#0070dd';
      case 'epic': return '#a335ee';
      case 'legendary': return '#ff8000';
      default: return '#ffffff';
    }
  };

  const getRarityText = (rarity: PetRarity): string => {
    switch (rarity) {
      case 'common': return 'Обычный';
      case 'uncommon': return 'Необычный';
      case 'rare': return 'Редкий';
      case 'epic': return 'Эпический';
      case 'legendary': return 'Легендарный';
    }
  };

  return (
    <div className="pets-panel">
      <div className="panel-tabs">
        <button 
          className={`tab-button ${activeTab === 'pets' ? 'active' : ''}`}
          onClick={() => setActiveTab('pets')}
        >
          Питомцы
        </button>
        <button 
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Достижения
        </button>
      </div>

      {activeTab === 'pets' ? (
        <>
          <div className="pets-stats">
            <div>Всего питомцев: {pets.length}</div>
            <div>Бонус к шансу: {pets.reduce((sum, pet) => sum + pet.dropRateBonus, 0)}%</div>
          </div>
          <div className="pets-grid">
            {pets.map((pet) => (
              <div 
                key={pet.id} 
                className={`pet-card ${pet.rarity}`}
                style={{ borderColor: getRarityColor(pet.rarity) }}
              >
                <div className="pet-name" style={{ color: getRarityColor(pet.rarity) }}>
                  {pet.name}
                </div>
                <div className="pet-rarity" style={{ color: getRarityColor(pet.rarity) }}>
                  {getRarityText(pet.rarity)}
                </div>
                <div className="pet-type">{pet.type}</div>
                <div className="pet-bonus">+{pet.dropRateBonus}% к шансу</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`achievement-card ${achievement.completed ? 'completed' : ''} ${achievement.secret ? 'secret' : ''}`}
            >
              <div className="achievement-title">
                {achievement.secret && !achievement.completed 
                  ? '???'
                  : achievement.secret 
                    ? achievement.secretTitle 
                    : achievement.title}
              </div>
              <div className="achievement-description">
                {achievement.secret && !achievement.completed
                  ? '???'
                  : achievement.secret
                    ? achievement.secretDescription
                    : achievement.description}
              </div>
              {achievement.completed && (
                <div className="achievement-completed">✓ Выполнено!</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetsPanel; 