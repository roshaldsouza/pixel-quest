import React from 'react';
import { GameState, Player } from '../types/game';
import { Heart, Star, Trophy, Zap } from 'lucide-react';

interface GameUIProps {
  gameState: GameState;
  player: Player;
  enemiesCount: number;
  treasuresCount: number;
}

const GameUI: React.FC<GameUIProps> = ({ gameState, player, enemiesCount, treasuresCount }) => {
  const healthPercentage = (player.health / player.maxHealth) * 100;
  const expPercentage = (player.experience % 100);

  return (
    <div className="pixel-panel p-4 mb-4 space-y-4">
      {/* Top Stats Row */}
      <div className="flex justify-between items-center text-white">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 pixel-panel-inner p-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="pixel-font pixel-text-shadow text-yellow-400">
              {gameState.score.toString().padStart(6, '0')}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 pixel-panel-inner p-2">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="pixel-font pixel-text-shadow text-blue-400">
              LV.{gameState.level.toString().padStart(2, '0')}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 pixel-panel-inner p-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="pixel-font pixel-text-shadow text-red-400">
              x{gameState.lives}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="pixel-panel-inner p-2">
            <span className="pixel-font text-red-400 pixel-text-shadow">
              👹 {enemiesCount.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="pixel-panel-inner p-2">
            <span className="pixel-font text-yellow-400 pixel-text-shadow">
              💎 {treasuresCount.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Health Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="pixel-font flex items-center text-white pixel-text-shadow">
            <Heart className="w-3 h-3 text-red-400 mr-2" />
            HEALTH
          </span>
          <span className="pixel-font text-white pixel-text-shadow">
            {player.health.toString().padStart(3, '0')}/{player.maxHealth.toString().padStart(3, '0')}
          </span>
        </div>
        <div className="pixel-health-bar h-4 relative">
          <div 
            className={`h-full transition-none ${
              healthPercentage > 60 ? 'pixel-health-fill' :
              healthPercentage > 30 ? 'pixel-health-fill-warning' : 'pixel-health-fill-danger'
            }`}
            style={{ width: `${healthPercentage}%` }}
          />
          {/* Pixel-style health bar segments */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: 10 }, (_, i) => (
              <div 
                key={i} 
                className="flex-1 border-r border-gray-600 last:border-r-0" 
                style={{ borderRightWidth: '1px' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="pixel-font flex items-center text-white pixel-text-shadow">
            <Zap className="w-3 h-3 text-purple-400 mr-2" />
            EXP
          </span>
          <span className="pixel-font text-white pixel-text-shadow">
            {(player.experience % 100).toString().padStart(2, '0')}/100
          </span>
        </div>
        <div className="pixel-exp-bar h-3 relative">
          <div 
            className="pixel-exp-fill h-full transition-none"
            style={{ width: `${expPercentage}%` }}
          />
          {/* Pixel-style exp bar segments */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: 10 }, (_, i) => (
              <div 
                key={i} 
                className="flex-1 border-r border-gray-600 last:border-r-0" 
                style={{ borderRightWidth: '1px' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Game Status */}
      {gameState.isPlaying && (
        <div className="pixel-panel-inner p-3">
          <p className="pixel-font text-center pixel-text-shadow text-white">
            {treasuresCount === 0 ? '🎉 LEVEL COMPLETE!' : 
             enemiesCount > 5 ? '⚠️ DANGER! MANY ENEMIES!' :
             treasuresCount < 3 ? '🏃‍♂️ ALMOST DONE!' :
             '🎯 COLLECT ALL TREASURES!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default GameUI;