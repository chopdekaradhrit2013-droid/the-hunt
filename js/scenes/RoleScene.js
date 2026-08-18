class RoleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'RoleScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0x0a0a0a);

    // Title
    this.add.text(width / 2, 80, 'ROLE ASSIGNMENT', {
      fontFamily: 'Courier New',
      fontSize: '28px',
      color: '#ff3333',
      letterSpacing: 3
    }).setOrigin(0.5);

    // Random role
    this.role = Helpers.getRandomRole();
    window.playerRole = this.role;

    // Random map
    this.mapKey = Helpers.getRandomMap();
    window.currentMapKey = this.mapKey;

    // Reveal animation
    const roleText = this.add.text(width / 2, height / 2 - 40, '???', {
      fontFamily: 'Courier New',
      fontSize: '64px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setAlpha(0);

    const desc = this.add.text(width / 2, height / 2 + 40, '', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#aaaaaa',
      align: 'center',
      wordWrap: { width: 420 }
    }).setOrigin(0.5).setAlpha(0);

    // Character preview
    let preview;
    if (this.role === 'runner') {
      preview = this.add.image(width / 2, height / 2 - 160, 'runner_idle')
        .setScale(0.18)
        .setAlpha(0);
    } else {
      preview = this.add.image(width / 2, height / 2 - 160, 'killer')
        .setScale(0.16)
        .setAlpha(0);
    }

    this.tweens.add({
      targets: [preview, roleText],
      alpha: 1,
      duration: 600,
      delay: 300
    });

    this.time.delayedCall(900, () => {
      if (this.role === 'runner') {
        roleText.setText('SURVIVOR');
        roleText.setColor('#44ff88');
        desc.setText('Escape the island before the Hunter finds you.\nHide in bushes. Reach the boat.');
      } else {
        roleText.setText('HUNTER');
        roleText.setColor('#ff4444');
        desc.setText('Hunt the Survivor.\nDo not let them reach the boat.');
      }
      this.tweens.add({ targets: desc, alpha: 1, duration: 500 });
    });

    // Map name
    const mapName = this.add.text(width / 2, height - 140, `MAP: ${MAPS[this.mapKey].name.toUpperCase()}`, {
      fontFamily: 'Courier New',
      fontSize: '14px',
      color: '#888888'
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({ targets: mapName, alpha: 1, duration: 500, delay: 1400 });

    // Start button after delay
    this.time.delayedCall(2200, () => {
      const startBtn = this.add.rectangle(width / 2, height - 70, 200, 50, 0x880000)
        .setStrokeStyle(2, 0xff2222)
        .setInteractive({ useHandCursor: true });

      const startTxt = this.add.text(width / 2, height - 70, 'BEGIN MATCH', {
        fontFamily: 'Courier New',
        fontSize: '16px',
        color: '#fff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      startBtn.on('pointerover', () => startBtn.setFillStyle(0xaa0000));
      startBtn.on('pointerout', () => startBtn.setFillStyle(0x880000));
      startBtn.on('pointerdown', () => {
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.time.delayedCall(420, () => {
          this.scene.start('GameScene');
        });
      });
    });
  }
}

window.RoleScene = RoleScene;
