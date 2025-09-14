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

/**
 * Tipos de itens disponíveis no sistema
 * 1 = consumables (consumíveis)
 * 2 = equipment (equipamentos)  
 * 3 = miscellaneous (diversos)
 */
export type ItemTypeId = 1 | 2 | 3;

export interface Item {
  id: number;
  name: string;
  typeId: ItemTypeId;
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
