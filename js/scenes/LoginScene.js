class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoginScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background from provided login art
    this.add.image(width / 2, height / 2, 'login_bg')
      .setDisplaySize(width, height);

    // Dark vignette
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.35);

    // Logo
    const logo = this.add.image(width / 2, height * 0.28, 'logo')
      .setScale(0.38)
      .setAlpha(0);

    this.tweens.add({
      targets: logo,
      alpha: 1,
      y: height * 0.26,
      duration: 900,
      ease: 'Power2'
    });

    // Tagline
    const tag = this.add.text(width / 2, height * 0.48, 'SURVIVE THE NIGHT', {
      fontFamily: 'Courier New',
      fontSize: '18px',
      color: '#ffaaaa',
      letterSpacing: 4
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: tag,
      alpha: 1,
      duration: 800,
      delay: 400
    });

    // Play button
    const playBtn = this.add.container(width / 2, height * 0.68);

    const btnBg = this.add.rectangle(0, 0, 220, 56, 0xaa0000)
      .setStrokeStyle(3, 0xff3333)
      .setInteractive({ useHandCursor: true });

    const btnText = this.add.text(0, 0, 'ENTER THE HUNT', {
      fontFamily: 'Courier New',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    playBtn.add([btnBg, btnText]);
    playBtn.setAlpha(0);

    this.tweens.add({
      targets: playBtn,
      alpha: 1,
      duration: 700,
      delay: 700
    });

    btnBg.on('pointerover', () => {
      btnBg.setFillStyle(0xcc0000);
      this.tweens.add({ targets: playBtn, scale: 1.05, duration: 120 });
    });
    btnBg.on('pointerout', () => {
      btnBg.setFillStyle(0xaa0000);
      this.tweens.add({ targets: playBtn, scale: 1, duration: 120 });
    });
    btnBg.on('pointerdown', () => {
      this.cameras.main.fadeOut(400, 0, 0, 0);
      this.time.delayedCall(420, () => {
        this.scene.start('FaceUploadScene');
      });
    });

    // Footer
    this.add.text(width / 2, height - 28, 'PIXEL SURVIVAL  •  CROSS PLATFORM', {
      fontFamily: 'Courier New',
      fontSize: '11px',
      color: '#555555'
    }).setOrigin(0.5);
  }
}

window.LoginScene = LoginScene;
