/**
 * THE HUNT - Asset Manifest & Game Configuration
 * All assets reference the exact files placed in /assets/
 * DO NOT change paths - they match the provided images exactly.
 */

const ASSETS = {
  // UI
  logo: { key: 'logo', path: 'assets/ui/logo.jpg' },
  loginBg: { key: 'login_bg', path: 'assets/ui/login_bg.jpg' },
  loading: { key: 'loading', path: 'assets/ui/loading.jpg' },
  victory: { key: 'victory', path: 'assets/ui/victory.jpg' },
  defeat: { key: 'defeat', path: 'assets/ui/defeat.jpg' },
  avatars: { key: 'avatars', path: 'assets/ui/avatars.jpg' },

  // Characters
  runnerSheet: { key: 'runner_sheet', path: 'assets/characters/runner_sheet.jpg' },
  killer: { key: 'killer', path: 'assets/characters/killer.jpg' },
  runnerIdle: { key: 'runner_idle', path: 'assets/characters/runner_idle.jpg' },
  runnerScared: { key: 'runner_scared', path: 'assets/characters/runner_scared.jpg' },

  // Maps (1500x1000)
  forestDay: { key: 'forest_day', path: 'assets/maps/forest_day.jpg' },
  forestNight: { key: 'forest_night', path: 'assets/maps/forest_night.jpg' },
  town: { key: 'town', path: 'assets/maps/town.jpg' },
  island: { key: 'island', path: 'assets/maps/island.jpg' },

  // Tiles / Props
  bushes: { key: 'bushes', path: 'assets/tiles/bushes.jpg' },
  trees: { key: 'trees', path: 'assets/tiles/trees.jpg' },
  cabins: { key: 'cabins', path: 'assets/props/cabins.jpg' },
  chest: { key: 'chest', path: 'assets/props/chest.jpg' },
  boat: { key: 'boat', path: 'assets/props/boat.jpg' },
  footprints: { key: 'footprints', path: 'assets/props/footprints.jpg' }
};

// Game Constants
const GAME = {
  width: 1280,
  height: 720,
  pixelArt: true,
  backgroundColor: '#0a0a0a',
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  // Survival
  matchDuration: 180, // seconds
  killerSpeed: 140,
  runnerSpeed: 160,
  hideDetectionRadius: 80,
  killerDetectionRadius: 220,
  bushHideBonus: 0.4 // detection multiplier when hidden
};

// Map configs (spawn points, bush positions approx, exit)
const MAPS = {
  forest_day: {
    key: 'forest_day',
    name: 'Whispering Woods',
    playerSpawn: { x: 400, y: 500 },
    killerSpawn: { x: 1100, y: 300 },
    boatPos: { x: 1200, y: 650 },
    bushes: [
      { x: 300, y: 250 }, { x: 550, y: 180 }, { x: 700, y: 350 },
      { x: 250, y: 450 }, { x: 850, y: 280 }, { x: 950, y: 500 },
      { x: 450, y: 600 }, { x: 1050, y: 150 }
    ]
  },
  forest_night: {
    key: 'forest_night',
    name: 'Midnight Grove',
    playerSpawn: { x: 380, y: 480 },
    killerSpawn: { x: 1050, y: 280 },
    boatPos: { x: 1150, y: 620 },
    bushes: [
      { x: 320, y: 220 }, { x: 580, y: 200 }, { x: 720, y: 380 },
      { x: 280, y: 480 }, { x: 880, y: 300 }, { x: 980, y: 520 },
      { x: 480, y: 580 }, { x: 1080, y: 180 }
    ]
  },
  town: {
    key: 'town',
    name: 'Abandoned Settlement',
    playerSpawn: { x: 350, y: 550 },
    killerSpawn: { x: 1000, y: 250 },
    boatPos: { x: 1180, y: 600 },
    bushes: [
      { x: 280, y: 200 }, { x: 520, y: 320 }, { x: 750, y: 180 },
      { x: 420, y: 480 }, { x: 900, y: 400 }, { x: 1100, y: 500 },
      { x: 200, y: 350 }, { x: 650, y: 550 }
    ]
  },
  island: {
    key: 'island',
    name: 'Lost Isle',
    playerSpawn: { x: 450, y: 600 },
    killerSpawn: { x: 900, y: 250 },
    boatPos: { x: 750, y: 850 }, // near dock conceptually
    bushes: [
      { x: 300, y: 300 }, { x: 550, y: 250 }, { x: 800, y: 350 },
      { x: 400, y: 450 }, { x: 700, y: 500 }, { x: 1000, y: 400 },
      { x: 250, y: 550 }, { x: 950, y: 550 }
    ]
  }
};

window.ASSETS = ASSETS;
window.GAME = GAME;
window.MAPS = MAPS;
