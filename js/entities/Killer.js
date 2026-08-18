/**
 * Killer (Hunter) AI entity
 * Uses the hooded glowing-eyes sprite.
 * Simple chase AI with patrol when player is hidden.
 */
class Killer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'killer');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setScale(0.22);
    this.setDepth(9);

    this.body.setSize(90, 140);
    this.body.setOffset(40, 80);

    this.speed = GAME.killerSpeed;
    this.state = 'patrol'; // patrol | chase | search
    this.target = null;
    this.patrolTimer = 0;
    this.patrolDir = new Phaser.Math.Vector2(1, 0);
    this.searchTimer = 0;
    this.lastKnown = null;
  }

  update(player, isPlayerHidden) {
    if (!player || !player.active) return;

    const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    const detection = isPlayerHidden
      ? GAME.killerDetectionRadius * GAME.bushHideBonus
      : GAME.killerDetectionRadius;

    // State machine
    if (dist < detection && !isPlayerHidden) {
      this.state = 'chase';
      this.target = player;
      this.lastKnown = { x: player.x, y: player.y };
    } else if (this.state === 'chase' && (dist > detection * 1.4 || isPlayerHidden)) {
      this.state = 'search';
      this.searchTimer = 2.5;
      this.lastKnown = { x: player.x, y: player.y };
    }

    if (this.state === 'chase' && this.target) {
      this.chase(this.target);
    } else if (this.state === 'search' && this.lastKnown) {
      this.search();
    } else {
      this.patrol();
    }

    // Face movement direction
    if (this.body.velocity.x < -10) this.setFlipX(true);
    else if (this.body.velocity.x > 10) this.setFlipX(false);
  }

  chase(target) {
    const angle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
    this.setVelocity(
      Math.cos(angle) * this.speed * 1.15,
      Math.sin(angle) * this.speed * 1.15
    );
  }

  search() {
    this.searchTimer -= this.scene.game.loop.delta / 1000;
    if (this.searchTimer <= 0 || !this.lastKnown) {
      this.state = 'patrol';
      this.lastKnown = null;
      return;
    }
    const dist = Phaser.Math.Distance.Between(this.x, this.y, this.lastKnown.x, this.lastKnown.y);
    if (dist < 40) {
      this.state = 'patrol';
      this.lastKnown = null;
      this.setVelocity(0, 0);
      return;
    }
    const angle = Phaser.Math.Angle.Between(this.x, this.y, this.lastKnown.x, this.lastKnown.y);
    this.setVelocity(Math.cos(angle) * this.speed * 0.9, Math.sin(angle) * this.speed * 0.9);
  }

  patrol() {
    this.patrolTimer -= this.scene.game.loop.delta / 1000;
    if (this.patrolTimer <= 0) {
      // New random direction
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      this.patrolDir.set(Math.cos(angle), Math.sin(angle));
      this.patrolTimer = Phaser.Math.FloatBetween(1.8, 3.5);
    }
    this.setVelocity(this.patrolDir.x * this.speed * 0.55, this.patrolDir.y * this.speed * 0.55);
  }
}

window.Killer = Killer;
