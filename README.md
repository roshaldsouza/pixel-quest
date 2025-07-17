# 🎮 Pixel Quest - Adventure RPG Game

<div align="center">
  <img src="https://img.shields.io/badge/Game-Pixel%20Quest-blue?style=for-the-badge&logo=gamepad" alt="Pixel Quest">
  <img src="https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-61DAFB?style=for-the-badge&logo=react" alt="React + TypeScript">
  <img src="https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Graphics-Pixel%20Perfect-FF6B6B?style=for-the-badge&logo=pixiv" alt="Pixel Perfect">
</div>

<div align="center">
  <h3>🏰 An authentic pixel-style adventure RPG built with modern web technologies</h3>
  <p><em>Embark on an epic quest to collect treasures while avoiding dangerous monsters!</em></p>
</div>

---

## 🌟 Features

### 🎨 **Authentic Pixel Art Style**
- **Pixel-Perfect Rendering** - Crisp, retro graphics with disabled anti-aliasing
- **Classic 8-bit Aesthetics** - Authentic color palettes and sprite design
- **CRT Scanline Effects** - Nostalgic arcade monitor simulation
- **Retro Typography** - "Press Start 2P" font for that classic arcade feel

### 🎮 **Engaging Gameplay**
- **Adventure RPG Mechanics** - Explore, collect, and survive
- **Progressive Difficulty** - Each level introduces more challenges
- **Multiple Enemy Types** - Face goblins, orcs, and demons
- **Treasure Collection** - Gather gold, gems, and crystals for points
- **Health & Experience System** - Classic RPG progression mechanics

### 🕹️ **Modern Game Features**
- **Smooth 60 FPS Gameplay** - Fluid animations and responsive controls
- **Real-time UI Updates** - Live health bars, score tracking, and level progression
- **Pause/Resume Functionality** - Full game state management
- **Multiple Lives System** - Three chances to complete your quest
- **Smart Enemy AI** - Enemies intelligently chase the player

### 🎯 **Technical Excellence**
- **TypeScript** - Type-safe game logic and state management
- **Canvas Rendering** - High-performance 2D graphics
- **Responsive Design** - Works perfectly on different screen sizes
- **Component Architecture** - Clean, modular React components
- **Pixel-Perfect Collision Detection** - Precise game physics

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pixel-quest.git

# Navigate to project directory
cd pixel-quest

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## 🎮 How to Play

### 🕹️ **Controls**
| Key | Action |
|-----|--------|
| `W` `A` `S` `D` | Move character |
| `Arrow Keys` | Alternative movement |
| `Spacebar` | Pause/Resume game |

### 🎯 **Objective**
- **Collect all treasures** on each level to advance
- **Avoid enemies** - they deal damage on contact
- **Survive with your 3 lives** to achieve the highest score
- **Progress through levels** with increasing difficulty

### 💎 **Treasure Types**
- **🪙 Gold Coins** - 10 points each
- **💎 Pink Gems** - 25 points each  
- **🔮 Cyan Crystals** - 50 points each

### 👹 **Enemy Types**
- **Goblin** (Brown) - 30 HP, 15 damage, normal speed
- **Orc** (Green) - 50 HP, 25 damage, slower but stronger
- **Demon** (Red) - 80 HP, 35 damage, faster and deadlier

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Game.tsx              # Main game component and logic
│   ├── GameCanvas.tsx        # Canvas rendering and graphics
│   └── GameUI.tsx           # User interface and HUD
├── types/
│   └── game.ts              # TypeScript type definitions
├── utils/
│   └── gameUtils.ts         # Game utility functions
├── App.tsx                  # Root application component
├── main.tsx                 # Application entry point
└── index.css               # Pixel-perfect styling and animations
```

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18** - Modern component-based UI library
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Lightning-fast build tool and development server

### **Styling & Graphics**
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Canvas** - High-performance 2D graphics rendering
- **Custom Pixel Art** - Hand-crafted sprites and animations
- **Google Fonts** - "Press Start 2P" for authentic retro typography

### **Game Development**
- **Custom Game Engine** - Built from scratch using React and Canvas
- **60 FPS Game Loop** - Smooth animations and responsive gameplay
- **State Management** - React hooks for game state
- **Collision Detection** - Custom physics system

---

## 🎨 Design Philosophy

### **Authentic Retro Aesthetics**
Every pixel is carefully crafted to recreate the authentic feel of classic 8-bit and 16-bit era games. From the color palette to the UI design, everything follows retro gaming conventions.

### **Modern Performance**
While maintaining classic aesthetics, the game leverages modern web technologies for smooth 60 FPS gameplay, responsive design, and optimal performance across devices.

### **Accessibility First**
Clear visual feedback, readable fonts, and intuitive controls ensure the game is enjoyable for players of all skill levels.

---

## 🚀 Performance Features

- **Optimized Rendering** - Efficient canvas drawing with minimal redraws
- **Memory Management** - Proper cleanup of game objects and event listeners
- **Responsive Design** - Adapts to different screen sizes and orientations
- **Fast Loading** - Optimized assets and code splitting
- **Cross-Browser Compatibility** - Works on all modern browsers

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain pixel-perfect styling
- Write clean, documented code
- Test on multiple browsers
- Keep the retro aesthetic consistent

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 Future Enhancements

- 🔊 **Sound Effects** - Retro-style audio and music
- 🏆 **Leaderboards** - Global high score tracking
- 🎮 **Power-ups** - Special abilities and temporary boosts
- 🗺️ **Multiple Worlds** - Different themed environments
- 👥 **Multiplayer Mode** - Real-time cooperative gameplay
- 📱 **Mobile Controls** - Touch-friendly interface
- 🎨 **Character Customization** - Unlockable skins and accessories

---

<div align="center">
  <h3>🌟 Star this repository if you enjoyed playing Pixel Quest! 🌟</h3>
  <p>Made with ❤️ and lots of ☕ by passionate developers</p>
  
  <a href="#top">⬆️ Back to Top</a>
</div>

---



**Happy Gaming! 🎮✨**
