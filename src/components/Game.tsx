import React, { useState, useEffect, useCallback } from 'react';
import GameCanvas from './GameCanvas';
import GameUI from './GameUI';
import { GameState, Player, Enemy, Treasure, Position } from '../types/game';
import { generateEnemies, generateTreasures } from '../utils/gameUtils';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_SPEED = 4;

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    score: 0,
    level: 1,
    lives: 3,
    gameOver: false
  });

  const [player, setPlayer] = useState<Player>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    width: 32,
    height: 32,
    health: 100,
    maxHealth: 100,
    experience: 0,
    level: 1,
    direction: 'down'
  });

  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [keys, setKeys] = useState<Set<string>>(new Set());

  // Initialize game
  const startGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      isPaused: false,
      score: 0,
      level: 1,
      lives: 3,
      gameOver: false
    });
    
    setPlayer({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      width: 32,
      height: 32,
      health: 100,
      maxHealth: 100,
      experience: 0,
      level: 1,
      direction: 'down'
    });

    setEnemies(generateEnemies(5, CANVAS_WIDTH, CANVAS_HEIGHT));
    setTreasures(generateTreasures(8, CANVAS_WIDTH, CANVAS_HEIGHT));
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => new Set(prev).add(e.key.toLowerCase()));
      
      // Handle pause with spacebar
      if (e.key === ' ' && gameState.isPlaying) {
        e.preventDefault();
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key.toLowerCase());
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.isPlaying]);

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.gameOver) return;

    const gameLoop = setInterval(() => {
      // Move player
      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;
        let newDirection = prev.direction;

        if (keys.has('arrowleft') || keys.has('a')) {
          newX = Math.max(0, prev.x - PLAYER_SPEED);
          newDirection = 'left';
        }
        if (keys.has('arrowright') || keys.has('d')) {
          newX = Math.min(CANVAS_WIDTH - prev.width, prev.x + PLAYER_SPEED);
          newDirection = 'right';
        }
        if (keys.has('arrowup') || keys.has('w')) {
          newY = Math.max(0, prev.y - PLAYER_SPEED);
          newDirection = 'up';
        }
        if (keys.has('arrowdown') || keys.has('s')) {
          newY = Math.min(CANVAS_HEIGHT - prev.height, prev.y + PLAYER_SPEED);
          newDirection = 'down';
        }

        return { ...prev, x: newX, y: newY, direction: newDirection };
      });

      // Move enemies
      setEnemies(prev => prev.map(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const moveX = (dx / distance) * enemy.speed;
          const moveY = (dy / distance) * enemy.speed;
          
          return {
            ...enemy,
            x: Math.max(0, Math.min(CANVAS_WIDTH - enemy.width, enemy.x + moveX)),
            y: Math.max(0, Math.min(CANVAS_HEIGHT - enemy.height, enemy.y + moveY))
          };
        }
        return enemy;
      }));

      // Check collisions with treasures
      setTreasures(prev => {
        const remaining = prev.filter(treasure => {
          const collision = checkCollision(player, treasure);
          if (collision) {
            setGameState(state => ({
              ...state,
              score: state.score + treasure.value
            }));
            setPlayer(p => ({
              ...p,
              experience: p.experience + treasure.value
            }));
          }
          return !collision;
        });
        return remaining;
      });

      // Check collisions with enemies
      setEnemies(prev => {
        return prev.filter(enemy => {
          const collision = checkCollision(player, enemy);
          if (collision) {
            setPlayer(p => ({
              ...p,
              health: Math.max(0, p.health - enemy.damage)
            }));
            return false; // Remove enemy after collision
          }
          return true;
        });
      });

      // Check if player died
      if (player.health <= 0) {
        setGameState(prev => {
          if (prev.lives > 1) {
            return { ...prev, lives: prev.lives - 1 };
          } else {
            return { ...prev, gameOver: true };
          }
        });
        
        if (gameState.lives > 1) {
          setPlayer(prev => ({ ...prev, health: prev.maxHealth }));
        }
      }

      // Check level completion
      if (treasures.length === 0) {
        setGameState(prev => ({ ...prev, level: prev.level + 1 }));
        setEnemies(generateEnemies(5 + gameState.level, CANVAS_WIDTH, CANVAS_HEIGHT));
        setTreasures(generateTreasures(8 + gameState.level, CANVAS_WIDTH, CANVAS_HEIGHT));
      }
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState.isPlaying, gameState.isPaused, gameState.gameOver, keys, player, treasures.length, gameState.level, gameState.lives]);

  const checkCollision = (rect1: Position & { width: number; height: number }, rect2: Position & { width: number; height: number }) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  const togglePause = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const resetGame = () => {
    setGameState({
      isPlaying: false,
      isPaused: false,
      score: 0,
      level: 1,
      lives: 3,
      gameOver: false
    });
  };

  return (
    <div className="game-background flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="pixel-panel p-6 scanlines relative">
          <div className="flex justify-between items-center mb-4">
            <h1 className="pixel-font-xl text-white pixel-text-shadow pixel-glow-blue">
              🎮 PIXEL QUEST
            </h1>
            <div className="flex space-x-3">
              {gameState.isPlaying && (
                <button
                  onClick={togglePause}
                  className="pixel-button pixel-button-yellow pixel-font px-4 py-2"
                >
                  {gameState.isPaused ? '▶ RESUME' : '⏸ PAUSE'}
                </button>
              )}
              <button
                onClick={resetGame}
                className="pixel-button pixel-button-red pixel-font px-4 py-2"
              >
                🔄 RESET
              </button>
            </div>
          </div>

          <GameUI 
            gameState={gameState}
            player={player}
            enemiesCount={enemies.length}
            treasuresCount={treasures.length}
          />

          <div className="relative">
            <GameCanvas
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              player={player}
              enemies={enemies}
              treasures={treasures}
              gameState={gameState}
            />
            
            {!gameState.isPlaying && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
                <div className="text-center text-white pixel-panel p-8">
                  <h2 className="pixel-font-xl mb-6 pixel-text-shadow pixel-glow-red">
                    {gameState.gameOver ? '💀 GAME OVER!' : '🌟 PIXEL QUEST'}
                  </h2>
                  {gameState.gameOver && (
                    <p className="pixel-font-large mb-6 pixel-text-shadow text-yellow-400">
                      FINAL SCORE: {gameState.score.toString().padStart(6, '0')}
                    </p>
                  )}
                  <button
                    onClick={startGame}
                    className="pixel-button pixel-button-green pixel-font-large px-8 py-4 mb-6"
                  >
                    {gameState.gameOver ? '🎮 PLAY AGAIN' : '🚀 START GAME'}
                  </button>
                  <div className="pixel-panel-inner p-4 space-y-2">
                    <p className="pixel-font text-white pixel-text-shadow">🎯 COLLECT TREASURES!</p>
                    <p className="pixel-font text-white pixel-text-shadow">👹 AVOID ENEMIES!</p>
                    <p className="pixel-font text-white pixel-text-shadow">⌨️ WASD OR ARROWS TO MOVE</p>
                    <p className="pixel-font text-white pixel-text-shadow">SPACE TO PAUSE</p>
                  </div>
                </div>
              </div>
            )}

            {gameState.isPaused && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
                <div className="text-center text-white pixel-panel p-8">
                  <h2 className="pixel-font-xl mb-4 pixel-text-shadow pixel-pulse">⏸️ PAUSED</h2>
                  <p className="pixel-font text-white pixel-text-shadow">PRESS RESUME OR SPACE TO CONTINUE</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;