export type PetRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Pet {
  id: string;
  name: string;
  rarity: PetRarity;
  type: string;
  dropRateBonus: number;
}

export interface PetChances {
  common: number;
  uncommon: number;
  rare: number;
  epic: number;
  legendary: number;
} 