/**
 * Runner (Survivor) entity
 * Uses the provided runner_spritesheet for animations.
 * Frame layout assumption (based on labels):
 * Row 0: Idle1, Idle2, Walk1-4, Run1, Run2   (8 frames)
 * Row 1: Hide1, Hide2, Hurt, Victory1, Victory2, Run3, Run4, (empty)
 * Frame size ~187.5 x 300 → we use 187 x 300
 */
class Runner extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'runner_sheet');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setScale(0.28); // high-res source → scale down for pixel feel
    this.setDepth(10);

    // Body size adjusted for scaled sprite
    this.body.setSize(80, 120);
    this.body.setOffset(50, 140);

    this.speed = GAME.runnerSpeed;
    this.isHidden = false;
    this.isHurt = false;
    this.facing = 'right';

    // Create animations from the sheet
    this.createAnims(scene);

    this.play('runner-idle');
  }

  createAnims(scene) {
    const sheet = 'runner_sheet';
    // Approximate frames. 1500/8 = 187.5 → we use frameWidth 187
    if (!scene.anims.exists('runner-idle')) {
      scene.anims.create({
        key: 'runner-idle',
        frames: scene.anims.generateFrameNumbers(sheet, { start: 0, end: 1 }),
        frameRate: 4,
        repeat: -1
      });
      scene.anims.create({
        key: 'runner-walk',
        frames: scene.anims.generateFrameNumbers(sheet, { start: 2, end: 5 }),
        frameRate: 8,
        repeat: -1
      });
      scene.anims.create({
        key: 'runner-run',
        frames: scene.anims.generateFrameNumbers(sheet, { start: 6, end: 7 }),
        frameRate: 12,
        repeat: -1
      });
      // Bottom row starts at frame 8
      scene.anims.create({
        key: 'runner-hide',
        frames: scene.anims.generateFrameNumbers(sheet, { start: 8, end: 9 }),
        frameRate: 3,
        repeat: -1
      });
      scene.anims.create({
        key: 'runner-hurt',
        frames: scene.anims.generateFrameNumbers(sheet, { start: 10, end: 10 }),
        frameRate: 1,
        repeat: 0
      });
      scene.anims.create({
        key: 'runner-victory',
        frames: scene.anims.generateFrameNumbers(sheet, { start: 11, end: 12 }),
        frameRate: 6,
        repeat: -1
      });
    }
  }

  update(cursors, wasd, joystick = null) {
    if (this.isHurt) return;

    let vx = 0;
    let vy = 0;

    // Keyboard
    if (cursors.left.isDown || wasd.A.isDown) vx = -1;
    else if (cursors.right.isDown || wasd.D.isDown) vx = 1;
    if (cursors.up.isDown || wasd.W.isDown) vy = -1;
    else if (cursors.down.isDown || wasd.S.isDown) vy = 1;

    // Mobile joystick override
    if (joystick && joystick.force > 0.15) {
      vx = Math.cos(joystick.angle);
      vy = Math.sin(joystick.angle);
    }

    // Normalize diagonal
    if (vx !== 0 && vy !== 0) {
      const len = Math.sqrt(vx * vx + vy * vy);
      vx /= len;
      vy /= len;
    }

    const isMoving = vx !== 0 || vy !== 0;
    const isRunning = isMoving && (cursors.shift?.isDown || (joystick && joystick.force > 0.7));

    this.setVelocity(vx * this.speed * (isRunning ? 1.25 : 1), vy * this.speed * (isRunning ? 1.25 : 1));

    // Flip
    if (vx < 0) {
      this.setFlipX(true);
      this.facing = 'left';
    } else if (vx > 0) {
      this.setFlipX(false);
      this.facing = 'right';
    }

    // Animation state
    if (this.isHidden) {
      if (this.anims.currentAnim?.key !== 'runner-hide') this.play('runner-hide', true);
    } else if (!isMoving) {
      if (this.anims.currentAnim?.key !== 'runner-idle') this.play('runner-idle', true);
    } else if (isRunning) {
      if (this.anims.currentAnim?.key !== 'runner-run') this.play('runner-run', true);
    } else {
      if (this.anims.currentAnim?.key !== 'runner-walk') this.play('runner-walk', true);
    }
  }

  setHidden(state) {
    this.isHidden = state;
    this.setAlpha(state ? 0.55 : 1);
    if (state) {
      this.play('runner-hide', true);
    }
  }

  takeHit() {
    this.isHurt = true;
    this.play('runner-hurt');
    this.setVelocity(0, 0);
    this.setTint(0xff4444);
    this.scene.time.delayedCall(600, () => {
      this.clearTint();
      this.isHurt = false;
    });
  }
}

window.Runner = Runner;
