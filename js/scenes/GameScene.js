class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    this.mapKey = window.currentMapKey || 'forest_night';
    this.mapData = MAPS[this.mapKey];
    this.role = window.playerRole || 'runner';
    this.timeLeft = GAME.matchDuration;
    this.matchOver = false;
    this.isHidden = false;

    // === WORLD ===
    this.mapBg = this.add.image(0, 0, this.mapKey)
      .setOrigin(0, 0)
      .setDisplaySize(1600, 1067);

    this.physics.world.setBounds(0, 0, 1600, 1067);
    this.cameras.main.setBounds(0, 0, 1600, 1067);
    this.cameras.main.setZoom(1.1);

    // === BUSHES ===
    this.bushes = this.physics.add.staticGroup();
    this.mapData.bushes.forEach((pos) => {
      const bush = this.bushes.create(pos.x, pos.y, 'bushes');
      bush.setDisplaySize(90, 70);
      bush.setOrigin(0.5, 0.7);
      bush.refreshBody();
      bush.setDepth(5);
      bush.body.setSize(70, 40);
      bush.body.setOffset(10, 25);
    });

    // === EXIT BOAT ===
    this.boat = this.physics.add.staticImage(this.mapData.boatPos.x, this.mapData.boatPos.y, 'boat')
      .setDisplaySize(140, 140)
      .setDepth(6);
    this.boat.body.setSize(100, 60);
    this.boat.body.setOffset(20, 50);

    // === CHEST ===
    this.chest = this.physics.add.staticImage(800, 400, 'chest')
      .setDisplaySize(70, 50)
      .setDepth(4);
    this.chestOpened = false;

    // === CHARACTERS ===
    if (this.role === 'runner') {
      this.player = new Runner(this, this.mapData.playerSpawn.x, this.mapData.playerSpawn.y);
      this.killer = new Killer(this, this.mapData.killerSpawn.x, this.mapData.killerSpawn.y);
      this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    } else {
      this.player = new Killer(this, this.mapData.killerSpawn.x, this.mapData.killerSpawn.y);
      this.aiRunner = new Runner(this, this.mapData.playerSpawn.x, this.mapData.playerSpawn.y);
      this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    }

    // === CONTROLS ===
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D,SHIFT');
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.createMobileControls();
    this.createHUD();

    // === COLLISIONS ===
    if (this.role === 'runner') {
      this.physics.add.overlap(this.player, this.bushes, this.onBushOverlap, null, this);
      this.physics.add.overlap(this.player, this.boat, this.onReachBoat, null, this);
      this.physics.add.overlap(this.player, this.killer, this.onCaught, null, this);
      this.physics.add.overlap(this.player, this.chest, this.onChest, null, this);
    } else {
      this.physics.add.overlap(this.player, this.aiRunner, this.onCaughtAsKiller, null, this);
      this.physics.add.overlap(this.aiRunner, this.boat, this.onAIReachBoat, null, this);
    }

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.tickTimer,
      callbackScope: this,
      loop: true
    });

    this.cameras.main.fadeIn(500);
  }

  createMobileControls() {
    const isTouch = this.sys.game.device.input.touch || window.innerWidth < 900;
    if (!isTouch) {
      this.joystick = null;
      return;
    }

    const base = this.add.circle(100, this.cameras.main.height - 100, 55, 0x000000, 0.35)
      .setScrollFactor(0).setDepth(100).setStrokeStyle(2, 0xffffff, 0.4);
    const thumb = this.add.circle(100, this.cameras.main.height - 100, 28, 0xffffff, 0.5)
      .setScrollFactor(0).setDepth(101);

    this.joystick = { base, thumb, force: 0, angle: 0, active: false, pointerId: null };

    this.input.on('pointerdown', (pointer) => {
      if (pointer.x < this.cameras.main.width * 0.4 && pointer.y > this.cameras.main.height * 0.55) {
        this.joystick.active = true;
        this.joystick.pointerId = pointer.id;
        this.joystick.base.setPosition(pointer.x, pointer.y);
        this.joystick.thumb.setPosition(pointer.x, pointer.y);
      }
    });

    this.input.on('pointermove', (pointer) => {
      if (!this.joystick.active || pointer.id !== this.joystick.pointerId) return;
      const dx = pointer.x - this.joystick.base.x;
      const dy = pointer.y - this.joystick.base.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 50;
      const clamped = Math.min(dist, max);
      this.joystick.force = clamped / max;
      this.joystick.angle = Math.atan2(dy, dx);
      this.joystick.thumb.setPosition(
        this.joystick.base.x + Math.cos(this.joystick.angle) * clamped,
        this.joystick.base.y + Math.sin(this.joystick.angle) * clamped
      );
    });

    this.input.on('pointerup', (pointer) => {
      if (pointer.id === this.joystick.pointerId) {
        this.joystick.active = false;
        this.joystick.force = 0;
        this.joystick.thumb.setPosition(this.joystick.base.x, this.joystick.base.y);
      }
    });
  }

  createHUD() {
    const { width } = this.cameras.main;

    this.hudBg = this.add.rectangle(width / 2, 28, width, 56, 0x000000, 0.55)
      .setScrollFactor(0).setDepth(50);

    this.timerText = this.add.text(width / 2, 28, Helpers.formatTime(this.timeLeft), {
      fontFamily: 'Courier New', fontSize: '26px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(51);

    this.roleText = this.add.text(20, 28, this.role === 'runner' ? 'SURVIVOR' : 'HUNTER', {
      fontFamily: 'Courier New', fontSize: '14px',
      color: this.role === 'runner' ? '#44ff88' : '#ff5555'
    }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(51);

    this.mapLabel = this.add.text(width - 20, 28, MAPS[this.mapKey].name, {
      fontFamily: 'Courier New', fontSize: '12px', color: '#aaaaaa'
    }).setOrigin(1, 0.5).setScrollFactor(0).setDepth(51);

    this.hideHint = this.add.text(width / 2, 70, '', {
      fontFamily: 'Courier New', fontSize: '13px', color: '#88ffaa'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(51).setAlpha(0);

    this.add.text(width / 2, this.cameras.main.height - 18,
      this.role === 'runner'
        ? 'WASD / Arrows to move  •  Hold near bush to HIDE  •  Reach the boat'
        : 'WASD / Arrows to hunt  •  Catch the Survivor',
      { fontFamily: 'Courier New', fontSize: '11px', color: '#666666' }
    ).setOrigin(0.5).setScrollFactor(0).setDepth(51);
  }

  update(time, delta) {
    if (this.matchOver) return;

    if (this.role === 'runner') {
      this.player.update(this.cursors, this.wasd, this.joystick);

      let nearBush = false;
      this.bushes.children.entries.forEach(b => {
        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, b.x, b.y) < GAME.hideDetectionRadius) {
          nearBush = true;
        }
      });

      if (nearBush) {
        if (!this.isHidden) {
          this.isHidden = true;
          this.player.setHidden(true);
          this.hideHint.setText('HIDDEN IN BUSH').setAlpha(1);
        }
      } else {
        if (this.isHidden) {
          this.isHidden = false;
          this.player.setHidden(false);
          this.hideHint.setAlpha(0);
        }
      }

      this.killer.update(this.player, this.isHidden);
    } else {
      let vx = 0, vy = 0;
      if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -1;
      else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = 1;
      if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -1;
      else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = 1;

      if (this.joystick && this.joystick.force > 0.15) {
        vx = Math.cos(this.joystick.angle);
        vy = Math.sin(this.joystick.angle);
      }

      if (vx !== 0 && vy !== 0) {
        const len = Math.sqrt(vx * vx + vy * vy);
        vx /= len; vy /= len;
      }

      this.player.setVelocity(vx * GAME.killerSpeed * 1.1, vy * GAME.killerSpeed * 1.1);
      if (vx < 0) this.player.setFlipX(true);
      else if (vx > 0) this.player.setFlipX(false);

      this.updateAIRunner();
    }
  }

  updateAIRunner() {
    if (!this.aiRunner || !this.aiRunner.active) return;
    const dist = Phaser.Math.Distance.Between(this.aiRunner.x, this.aiRunner.y, this.player.x, this.player.y);
    if (dist < 280) {
      const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.aiRunner.x, this.aiRunner.y);
      this.aiRunner.setVelocity(Math.cos(angle) * GAME.runnerSpeed * 1.1, Math.sin(angle) * GAME.runnerSpeed * 1.1);
      this.aiRunner.play('runner-run', true);
    } else {
      const angle = Phaser.Math.Angle.Between(this.aiRunner.x, this.aiRunner.y, this.boat.x, this.boat.y);
      this.aiRunner.setVelocity(Math.cos(angle) * GAME.runnerSpeed * 0.7, Math.sin(angle) * GAME.runnerSpeed * 0.7);
      this.aiRunner.play('runner-walk', true);
    }
    if (this.aiRunner.body.velocity.x < 0) this.aiRunner.setFlipX(true);
    else this.aiRunner.setFlipX(false);
  }

  tickTimer() {
    if (this.matchOver) return;
    this.timeLeft--;
    this.timerText.setText(Helpers.formatTime(this.timeLeft));
    if (this.timeLeft <= 30) this.timerText.setColor('#ff4444');
    if (this.timeLeft <= 0) {
      if (this.role === 'runner') this.endMatch(true);
      else this.endMatch(false);
    }
  }

  onBushOverlap() {}
  onReachBoat() { if (!this.matchOver) this.endMatch(true); }
  onCaught() { if (!this.matchOver && !this.isHidden) this.endMatch(false); }
  onCaughtAsKiller() { if (!this.matchOver) this.endMatch(true); }
  onAIReachBoat() { if (!this.matchOver) this.endMatch(false); }

  onChest(player, chest) {
    if (this.chestOpened) return;
    this.chestOpened = true;
    this.tweens.add({ targets: chest, scaleX: 0.12, scaleY: 0.12, yoyo: true, duration: 200 });
    this.timeLeft += 15;
    this.timerText.setText(Helpers.formatTime(this.timeLeft));
  }

  endMatch(won) {
    if (this.matchOver) return;
    this.matchOver = true;
    this.timerEvent.remove();
    if (this.player) this.player.setVelocity(0, 0);
    if (this.killer) this.killer.setVelocity(0, 0);
    if (this.aiRunner) this.aiRunner.setVelocity(0, 0);

    window.matchResult = {
      won: won,
      role: this.role,
      map: this.mapKey,
      timeSurvived: GAME.matchDuration - this.timeLeft
    };

    this.cameras.main.fadeOut(600, 0, 0, 0);
    this.time.delayedCall(650, () => {
      this.scene.start('ResultScene');
    });
  }
}

window.GameScene = GameScene;
