export interface ItemStats {
  damage?: number;
  defense?: number;
  healing?: number;
  durability?: number;
  weight?: number;
  duration?: number;
}

export interface ItemRequirements {
  level: number;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  constitution?: number;
}

export interface Item {
  id: number;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'misc';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
  stats: ItemStats;
  requirements: ItemRequirements;
  value: number;
  stackable: boolean;
  maxStack?: number;
  createdAt: string;
  updatedAt: string;
}
