/**
 * Utility helpers for The Hunt
 */

window.Helpers = {
  // Random map key
  getRandomMap() {
    const keys = Object.keys(MAPS);
    return keys[Math.floor(Math.random() * keys.length)];
  },

  // Random role
  getRandomRole() {
    return Math.random() < 0.5 ? 'runner' : 'killer';
  },

  // Format time mm:ss
  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  },

  // Distance between two points
  distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },

  // Clamp value
  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }
};
