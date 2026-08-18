class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Loading background (use the provided loading image)
    this.load.image('loading_temp', ASSETS.loading.path);

    // Create loading UI after first image
    this.load.once('filecomplete-image-loading_temp', () => {
      this.createLoadingUI();
    });

    // === ALL ASSETS ===
    // UI
    this.load.image(ASSETS.logo.key, ASSETS.logo.path);
    this.load.image(ASSETS.loginBg.key, ASSETS.loginBg.path);
    this.load.image(ASSETS.loading.key, ASSETS.loading.path);
    this.load.image(ASSETS.victory.key, ASSETS.victory.path);
    this.load.image(ASSETS.defeat.key, ASSETS.defeat.path);
    this.load.image(ASSETS.avatars.key, ASSETS.avatars.path);

    // Characters
    this.load.spritesheet(ASSETS.runnerSheet.key, ASSETS.runnerSheet.path, {
      frameWidth: 187,
      frameHeight: 300
    });
    this.load.image(ASSETS.killer.key, ASSETS.killer.path);
    this.load.image(ASSETS.runnerIdle.key, ASSETS.runnerIdle.path);
    this.load.image(ASSETS.runnerScared.key, ASSETS.runnerScared.path);

    // Maps
    this.load.image(ASSETS.forestDay.key, ASSETS.forestDay.path);
    this.load.image(ASSETS.forestNight.key, ASSETS.forestNight.path);
    this.load.image(ASSETS.town.key, ASSETS.town.path);
    this.load.image(ASSETS.island.key, ASSETS.island.path);

    // Props / Tiles
    this.load.image(ASSETS.bushes.key, ASSETS.bushes.path);
    this.load.image(ASSETS.trees.key, ASSETS.trees.path);
    this.load.image(ASSETS.cabins.key, ASSETS.cabins.path);
    this.load.image(ASSETS.chest.key, ASSETS.chest.path);
    this.load.image(ASSETS.boat.key, ASSETS.boat.path);
    this.load.image(ASSETS.footprints.key, ASSETS.footprints.path);

    // Progress events
    this.load.on('progress', (value) => {
      if (this.progressBar) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xcc0000, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 2 - 160,
          this.cameras.main.height / 2 + 80,
          320 * value,
          18
        );
      }
      if (this.percentText) {
        this.percentText.setText(Math.floor(value * 100) + '%');
      }
    });

    this.load.on('complete', () => {
      this.time.delayedCall(400, () => {
        this.scene.start('LoginScene');
      });
    });
  }

  createLoadingUI() {
    const { width, height } = this.cameras.main;

    // Background
    this.add.image(width / 2, height / 2, 'loading_temp')
      .setDisplaySize(width, height)
      .setAlpha(0.85);

    // Dark overlay for readability
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.45);

    // Title
    this.add.text(width / 2, height / 2 - 60, 'THE HUNT', {
      fontFamily: 'Courier New',
      fontSize: '48px',
      color: '#ff2222',
      stroke: '#000',
      strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 10, 'PREPARING THE WOODS...', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#cccccc'
    }).setOrigin(0.5);

    // Progress bar background
    this.add.rectangle(width / 2, height / 2 + 89, 328, 26, 0x222222)
      .setStrokeStyle(2, 0x555555);

    this.progressBar = this.add.graphics();
    this.percentText = this.add.text(width / 2, height / 2 + 120, '0%', {
      fontFamily: 'Courier New',
      fontSize: '18px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }
}

window.PreloadScene = PreloadScene;
