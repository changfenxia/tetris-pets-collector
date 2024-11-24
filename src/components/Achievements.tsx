import React from 'react';
import { Achievement } from '../types/achievements';
import '../styles/Achievements.css';

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <div className="achievements-panel">
      <h2>Достижения</h2>
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`achievement-card ${achievement.completed ? 'completed' : ''}`}
          >
            <div className="achievement-title">{achievement.title}</div>
            <div className="achievement-description">{achievement.description}</div>
            {achievement.completed && (
              <div className="achievement-completed">✓ Выполнено!</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements; 