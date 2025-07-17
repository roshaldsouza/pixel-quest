export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  level: number;
  lives: number;
  gameOver: boolean;
}

export interface Player extends Position {
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  experience: number;
  level: number;
  direction: 'up' | 'down' | 'left' | 'right';
}

export interface Enemy extends Position {
  width: number;
  height: number;
  health: number;
  damage: number;
  speed: number;
  type: 'goblin' | 'orc' | 'demon';
}

export interface Treasure extends Position {
  width: number;
  height: number;
  value: number;
  type: 'gold' | 'gem' | 'crystal';
}