/**
 * THE HUNT - Main Entry
 * Phaser 3.80+
 * Pixel-perfect, mobile + desktop
 */

const config = {
  type: Phaser.AUTO,
  width: GAME.width,
  height: GAME.height,
  parent: GAME.parent,
  backgroundColor: GAME.backgroundColor,
  pixelArt: true,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME.width,
    height: GAME.height
  },
  physics: GAME.physics,
  scene: [
    BootScene,
    PreloadScene,
    LoginScene,
    FaceUploadScene,
    RoleScene,
    GameScene,
    ResultScene
  ],
  input: {
    activePointers: 3
  }
};

// Global game instance
window.game = new Phaser.Game(config);

// Prevent scrolling / context menu on mobile
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('touchmove', e => {
  if (e.target.tagName !== 'INPUT') e.preventDefault();
}, { passive: false });
