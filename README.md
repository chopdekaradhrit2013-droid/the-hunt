# THE HUNT
**Pixel Survival Game** — Phaser 3 · Browser · Mobile + PC

## Project Structure

```
the-hunt/
─── index.html
─── css/
│   └── styles.css
─── js/
│   ─── config.js          ← Asset manifest + game constants
│   ─── main.js
│   ─── entities/
│   │   ─── Runner.js
│   │   └── Killer.js
│   ─── scenes/
│   │   ─── BootScene.js
│   │   ─── PreloadScene.js
│   │   ─── LoginScene.js
│   │   ─── FaceUploadScene.js
│   │   ─── RoleScene.js
│   │   ─── GameScene.js
│   │   └── ResultScene.js
│   └── utils/
│       └── helpers.js
└── assets/
    ─── characters/
    │   ─── killer.jpg              ← hunter_hooded_cutout.jpg
    │   ─── runner_idle.jpg         ← survival_character_cutout.jpg
    │   ─── runner_scared.jpg       ← runner_hunting_cutout.jpg
    │   └── runner_sheet.jpg        ← runner_spritesheet.jpg
    ─── maps/
    │   ─── forest_day.jpg          ← 775783437_..._n.jpg
    │   ─── forest_night.jpg        ← 779742444_..._n.jpg
    │   ─── island.jpg              ← 776351511_..._n.jpg
    │   └── town.jpg                ← 774595004_..._n.jpg
    ─── props/
    │   ─── boat.jpg                ← escape_boat.jpg
    │   ─── cabins.jpg              ← cabin_pack.jpg
    │   ─── chest.jpg               ← treasure_chest.jpg
    │   └── footprints.jpg
    ─── tiles/
    │   ─── bushes.jpg              ← bush_tileset.jpg
    │   └── trees.jpg               ← tree_tileset.jpg
    └── ui/
        ─── avatars.jpg             ← avatar_template.jpg
        ─── defeat.jpg
        ─── loading.jpg
        ─── login_bg.jpg
        ─── logo.jpg                ← the_hunt_logo.jpg
        └── victory.jpg
```

## How to Run

1. Place **all** your original image files into the folders above using the exact filenames listed.
2. Open a terminal in the `the-hunt` folder.
3. Serve with any static server (required for local assets):

```bash
# Python
python3 -m http.server 8080

# or Node
npx serve .
```

4. Open `http://localhost:8080` in your browser (Chrome / Safari / Firefox).

## Controls

| Action          | Desktop              | Mobile                  |
|-----------------|----------------------|-------------------------|
| Move            | WASD / Arrow Keys    | Left virtual joystick   |
| Hide in bush    | Stand near bush      | Stand near bush         |
| Sprint          | Hold Shift           | Push joystick fully     |

## Game Flow

Login → Face Upload (optional) → Random Role (Survivor / Hunter) + Random Map → Match → Victory / Defeat

## Notes

- All assets are referenced **only** through `js/config.js`. Never hardcode paths elsewhere.
- Pixel-perfect rendering is enabled (`pixelArt: true` + `roundPixels`).
- Camera follows the player.
- Killer uses simple AI (patrol → chase → search).
- Bushes reduce detection radius when the Survivor is close.
- Escape by reaching the boat or surviving the full timer as Survivor.
- Catch the Survivor as Hunter.

Built for cross-platform browser play (iPad, Android, desktop).
