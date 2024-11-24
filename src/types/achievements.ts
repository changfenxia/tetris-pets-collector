export interface Achievement {
  id: string;
  title: string;
  description: string;
  condition: (stats: GameStats) => boolean;
  icon?: string;
  completed: boolean;
  secret?: boolean;
  secretTitle?: string;
  secretDescription?: string;
}

export interface GameStats {
  totalScore: number;
  tetrisCount: number;
  petsCollected: {
    total: number;
    common: number;
    uncommon: number;
    rare: number;
    epic: number;
    legendary: number;
  };
  specificPets: {
    [key: string]: number;
  };
} 