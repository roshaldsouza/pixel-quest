import React, { useRef, useEffect } from 'react';
import { Player, Enemy, Treasure, GameState } from '../types/game';

interface GameCanvasProps {
  width: number;
  height: number;
  player: Player;
  enemies: Enemy[];
  treasures: Treasure[];
  gameState: GameState;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  width,
  height,
  player,
  enemies,
  treasures,
  gameState
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Disable anti-aliasing for pixel-perfect rendering
    ctx.imageSmoothingEnabled = false;

    // Clear canvas with dark dungeon background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0f0f23');
    gradient.addColorStop(0.5, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw pixel-perfect grid background
    ctx.strokeStyle = '#16213e';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
      ctx.stroke();
    }

    // Draw treasures with pixel-perfect styling
    treasures.forEach(treasure => {
      const x = Math.floor(treasure.x);
      const y = Math.floor(treasure.y);
      
      // Main treasure body
      if (treasure.type === 'gold') {
        ctx.fillStyle = '#ffd700';
      } else if (treasure.type === 'gem') {
        ctx.fillStyle = '#ff1493';
      } else {
        ctx.fillStyle = '#00ffff';
      }
      
      ctx.fillRect(x + 4, y + 4, 16, 16);
      
      // Treasure border
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 2, y + 2, 20, 2); // top
      ctx.fillRect(x + 2, y + 20, 20, 2); // bottom
      ctx.fillRect(x + 2, y + 4, 2, 16); // left
      ctx.fillRect(x + 20, y + 4, 2, 16); // right
      
      // Inner highlight
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 6, y + 6, 2, 2);
      ctx.fillRect(x + 16, y + 16, 2, 2);
      
      // Dark outline
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, 24, 2); // top
      ctx.fillRect(x, y + 22, 24, 2); // bottom
      ctx.fillRect(x, y + 2, 2, 20); // left
      ctx.fillRect(x + 22, y + 2, 2, 20); // right
    });

    // Draw enemies with pixel-perfect styling
    enemies.forEach(enemy => {
      const x = Math.floor(enemy.x);
      const y = Math.floor(enemy.y);
      
      // Enemy body color
      if (enemy.type === 'goblin') {
        ctx.fillStyle = '#8b4513';
      } else if (enemy.type === 'orc') {
        ctx.fillStyle = '#228b22';
      } else {
        ctx.fillStyle = '#dc143c';
      }
      
      // Main body
      ctx.fillRect(x + 2, y + 2, 28, 28);
      
      // Dark outline
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, 32, 2); // top
      ctx.fillRect(x, y + 30, 32, 2); // bottom
      ctx.fillRect(x, y + 2, 2, 28); // left
      ctx.fillRect(x + 30, y + 2, 2, 28); // right
      
      // Eyes
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(x + 8, y + 8, 4, 4);
      ctx.fillRect(x + 20, y + 8, 4, 4);
      
      // Eye highlights
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 9, y + 9, 2, 2);
      ctx.fillRect(x + 21, y + 9, 2, 2);
      
      // Mouth
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + 12, y + 20, 8, 4);
      
      // Teeth
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 14, y + 20, 2, 2);
      ctx.fillRect(x + 18, y + 20, 2, 2);
    });

    // Draw player with pixel-perfect styling
    const px = Math.floor(player.x);
    const py = Math.floor(player.y);
    
    // Player body
    ctx.fillStyle = '#4169e1';
    ctx.fillRect(px + 2, py + 2, 28, 28);
    
    // Dark outline
    ctx.fillStyle = '#000000';
    ctx.fillRect(px, py, 32, 2); // top
    ctx.fillRect(px, py + 30, 32, 2); // bottom
    ctx.fillRect(px, py + 2, 2, 28); // left
    ctx.fillRect(px + 30, py + 2, 2, 28); // right
    
    // Player crown
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(px + 6, py - 4, 20, 8);
    ctx.fillStyle = '#000000';
    ctx.fillRect(px + 4, py - 6, 24, 2); // crown outline top
    ctx.fillRect(px + 4, py + 2, 24, 2); // crown outline bottom
    ctx.fillRect(px + 4, py - 4, 2, 6); // crown outline left
    ctx.fillRect(px + 26, py - 4, 2, 6); // crown outline right
    
    // Crown gems
    ctx.fillStyle = '#ff1493';
    ctx.fillRect(px + 10, py - 2, 2, 2);
    ctx.fillRect(px + 15, py - 2, 2, 2);
    ctx.fillRect(px + 20, py - 2, 2, 2);
    
    // Player face based on direction
    ctx.fillStyle = '#ffffff';
    if (player.direction === 'up') {
      // Eyes looking up
      ctx.fillRect(px + 8, py + 6, 4, 4);
      ctx.fillRect(px + 20, py + 6, 4, 4);
      // Pupils
      ctx.fillStyle = '#000000';
      ctx.fillRect(px + 9, py + 6, 2, 2);
      ctx.fillRect(px + 21, py + 6, 2, 2);
    } else if (player.direction === 'down') {
      // Eyes looking down
      ctx.fillRect(px + 8, py + 10, 4, 4);
      ctx.fillRect(px + 20, py + 10, 4, 4);
      // Pupils
      ctx.fillStyle = '#000000';
      ctx.fillRect(px + 9, py + 12, 2, 2);
      ctx.fillRect(px + 21, py + 12, 2, 2);
    } else if (player.direction === 'left') {
      // Eyes looking left
      ctx.fillRect(px + 6, py + 8, 4, 4);
      ctx.fillRect(px + 6, py + 20, 4, 4);
      // Pupils
      ctx.fillStyle = '#000000';
      ctx.fillRect(px + 6, py + 9, 2, 2);
      ctx.fillRect(px + 6, py + 21, 2, 2);
    } else {
      // Eyes looking right
      ctx.fillRect(px + 22, py + 8, 4, 4);
      ctx.fillRect(px + 22, py + 20, 4, 4);
      // Pupils
      ctx.fillStyle = '#000000';
      ctx.fillRect(px + 24, py + 9, 2, 2);
      ctx.fillRect(px + 24, py + 21, 2, 2);
    }
    
    // Player smile
    ctx.fillStyle = '#000000';
    ctx.fillRect(px + 12, py + 18, 8, 2);
    ctx.fillRect(px + 10, py + 20, 2, 2);
    ctx.fillRect(px + 20, py + 20, 2, 2);

  }, [width, height, player, enemies, treasures]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="pixel-glow-blue"
      style={{ 
        imageRendering: 'pixelated',
        imageRendering: '-moz-crisp-edges',
        imageRendering: '-webkit-crisp-edges',
        imageRendering: 'crisp-edges'
      }}
    />
  );
};

export default GameCanvas;