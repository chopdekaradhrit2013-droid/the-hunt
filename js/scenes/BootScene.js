class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Minimal boot - nothing critical
  }

  create() {
    // Pixel perfect settings
    this.cameras.main.setRoundPixels(true);
    this.scene.start('PreloadScene');
  }
}

window.BootScene = BootScene;
