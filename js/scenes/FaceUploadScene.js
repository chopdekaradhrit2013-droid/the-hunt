class FaceUploadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'FaceUploadScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Dim background
    this.add.rectangle(width / 2, height / 2, width, height, 0x050505);

    // Show the HTML overlay for file input (better UX than Phaser file dialog)
    const overlay = document.getElementById('face-upload-overlay');
    const faceInput = document.getElementById('face-input');
    const previewImg = document.getElementById('preview-img');
    const confirmBtn = document.getElementById('confirm-face');
    const skipBtn = document.getElementById('skip-face');

    overlay.classList.remove('hidden');

    // Reset
    window.userAvatarData = null;
    previewImg.src = 'assets/ui/avatars.jpg';
    confirmBtn.classList.add('hidden');

    const goNext = () => {
      overlay.classList.add('hidden');
      this.cameras.main.fadeOut(350, 0, 0, 0);
      this.time.delayedCall(380, () => {
        this.scene.start('RoleScene');
      });
    };

    faceInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        previewImg.src = ev.target.result;
        window.userAvatarData = ev.target.result; // data URL
        confirmBtn.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    };

    confirmBtn.onclick = () => goNext();
    skipBtn.onclick = () => {
      window.userAvatarData = null;
      goNext();
    };

    // Also allow clicking anywhere on canvas to skip if wanted (fallback)
    this.input.keyboard.once('keydown-SPACE', () => {
      window.userAvatarData = null;
      goNext();
    });
  }
}

window.FaceUploadScene = FaceUploadScene;
