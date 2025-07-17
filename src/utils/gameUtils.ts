import { Enemy, Treasure } from '../types/game';

export const generateEnemies = (count: number, canvasWidth: number, canvasHeight: number): Enemy[] => {
  const enemies: Enemy[] = [];
  const enemyTypes: Array<{ type: 'goblin' | 'orc' | 'demon', health: number, damage: number, speed: number }> = [
    { type: 'goblin', health: 30, damage: 15, speed: 1 },
    { type: 'orc', health: 50, damage: 25, speed: 0.8 },
    { type: 'demon', health: 80, damage: 35, speed: 1.2 }
  ];

  for (let i = 0; i < count; i++) {
    const enemyTemplate = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemy: Enemy = {
      x: Math.random() * (canvasWidth - 32),
      y: Math.random() * (canvasHeight - 32),
      width: 32,
      height: 32,
      health: enemyTemplate.health,
      damage: enemyTemplate.damage,
      speed: enemyTemplate.speed,
      type: enemyTemplate.type
    };

    // Ensure enemies don't spawn too close to center (player spawn)
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const distance = Math.sqrt((enemy.x - centerX) ** 2 + (enemy.y - centerY) ** 2);
    
    if (distance < 100) {
      // Respawn further away
      const angle = Math.random() * 2 * Math.PI;
      enemy.x = centerX + Math.cos(angle) * (150 + Math.random() * 200);
      enemy.y = centerY + Math.sin(angle) * (150 + Math.random() * 200);
      
      // Keep within bounds
      enemy.x = Math.max(0, Math.min(canvasWidth - 32, enemy.x));
      enemy.y = Math.max(0, Math.min(canvasHeight - 32, enemy.y));
    }

    enemies.push(enemy);
  }

  return enemies;
};

export const generateTreasures = (count: number, canvasWidth: number, canvasHeight: number): Treasure[] => {
  const treasures: Treasure[] = [];
  const treasureTypes: Array<{ type: 'gold' | 'gem' | 'crystal', value: number }> = [
    { type: 'gold', value: 10 },
    { type: 'gem', value: 25 },
    { type: 'crystal', value: 50 }
  ];

  for (let i = 0; i < count; i++) {
    const treasureTemplate = treasureTypes[Math.floor(Math.random() * treasureTypes.length)];
    const treasure: Treasure = {
      x: Math.random() * (canvasWidth - 24),
      y: Math.random() * (canvasHeight - 24),
      width: 24,
      height: 24,
      value: treasureTemplate.value,
      type: treasureTemplate.type
    };

    treasures.push(treasure);
  }

  return treasures;
};

export const checkCollision = (
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
): boolean => {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
};