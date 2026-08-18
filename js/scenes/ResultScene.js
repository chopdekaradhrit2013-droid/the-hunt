class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    const result = window.matchResult || { won: false, role: 'runner' };

    // Background image based on outcome
    const bgKey = result.won ? 'victory' : 'defeat';
    this.add.image(width / 2, height / 2, bgKey)
      .setDisplaySize(width, height);

    // Dark overlay for text readability
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.45);

    // Big result text
    const title = result.won ? 'VICTORY' : 'DEFEAT';
    const color = result.won ? '#44ff88' : '#ff3333';

    const resultText = this.add.text(width / 2, height * 0.22, title, {
      fontFamily: 'Courier New',
      fontSize: '64px',
      color: color,
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 8
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: resultText,
      alpha: 1,
      y: height * 0.20,
      duration: 700,
      ease: 'Back.easeOut'
    });

    // Flavor text
    let flavor = '';
    if (result.won && result.role === 'runner') {
      flavor = 'You escaped the woods.\nThe Hunt continues... for another.';
    } else if (result.won && result.role === 'killer') {
      flavor = 'The prey has fallen.\nThe woods claim another.';
    } else if (!result.won && result.role === 'runner') {
      flavor = 'The Hunt was claimed by the woods...';
    } else {
      flavor = 'The Survivor slipped away into the mist.';
    }

    const flavorTxt = this.add.text(width / 2, height * 0.42, flavor, {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#dddddd',
      align: 'center',
      lineSpacing: 6
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: flavorTxt,
      alpha: 1,
      duration: 600,
      delay: 400
    });

    // Stats
    const stats = this.add.text(width / 2, height * 0.58,
      `ROLE: ${result.role.toUpperCase()}   •   MAP: ${MAPS[result.map]?.name || 'Unknown'}`,
      {
        fontFamily: 'Courier New',
        fontSize: '13px',
        color: '#999999'
      }
    ).setOrigin(0.5).setAlpha(0);

    this.tweens.add({ targets: stats, alpha: 1, duration: 500, delay: 700 });

    // Buttons
    this.time.delayedCall(1100, () => {
      // Play again
      const againBtn = this.add.rectangle(width / 2 - 110, height * 0.78, 180, 48, 0xaa0000)
        .setStrokeStyle(2, 0xff3333)
        .setInteractive({ useHandCursor: true });

      this.add.text(width / 2 - 110, height * 0.78, 'PLAY AGAIN', {
        fontFamily: 'Courier New',
        fontSize: '15px',
        color: '#fff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      againBtn.on('pointerover', () => againBtn.setFillStyle(0xcc0000));
      againBtn.on('pointerout', () => againBtn.setFillStyle(0xaa0000));
      againBtn.on('pointerdown', () => {
        this.cameras.main.fadeOut(350);
        this.time.delayedCall(380, () => this.scene.start('RoleScene'));
      });

      // Main menu
      const menuBtn = this.add.rectangle(width / 2 + 110, height * 0.78, 180, 48, 0x333333)
        .setStrokeStyle(2, 0x666666)
        .setInteractive({ useHandCursor: true });

      this.add.text(width / 2 + 110, height * 0.78, 'MAIN MENU', {
        fontFamily: 'Courier New',
        fontSize: '15px',
        color: '#ccc',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      menuBtn.on('pointerover', () => menuBtn.setFillStyle(0x444444));
      menuBtn.on('pointerout', () => menuBtn.setFillStyle(0x333333));
      menuBtn.on('pointerdown', () => {
        this.cameras.main.fadeOut(350);
        this.time.delayedCall(380, () => this.scene.start('LoginScene'));
      });
    });
  }
}

window.ResultScene = ResultScene;
