# THE HUNT
**Pixel Survival Game** — Phaser 3 · Browser · Mobile + PC

> Optimized for iPad / browser development (Codespaces + github.dev).

## Quick Start on iPad

1. Open this repository: https://github.com/chopdekaradhrit2013-droid/the-hunt
2. Press the **`.`** (period) key to open **github.dev** editor, or create a Codespace.
3. Create the asset folders:
   - `assets/characters`
   - `assets/maps`
   - `assets/props`
   - `assets/tiles`
   - `assets/ui`
4. Upload your original images into the correct folders using the **exact names** listed below.
5. In the Codespaces / github.dev terminal run:
   ```bash
   npx serve .
   ```
6. Open the preview URL. The game runs immediately.

## Deploy to Vercel (easiest permanent link)

1. Go to vercel.com → New Project → Import this repo.
2. Framework: Other
3. Deploy. You get a permanent public URL.

## Exact Asset File Names

```
assets/
├── characters/
│   ├── killer.jpg                 ← hunter_hooded_cutout.jpg
│   ├── runner_idle.jpg            ← survival_character_cutout.jpg
│   ├── runner_scared.jpg          ← runner_hunting_cutout.jpg
│   └── runner_sheet.jpg           ← runner_spritesheet.jpg
├── maps/
│   ├── forest_day.jpg
│   ├── forest_night.jpg
│   ├── island.jpg
│   └── town.jpg
├── props/
│   ├── boat.jpg                   ← escape_boat.jpg
│   ├── cabins.jpg                 ← cabin_pack.jpg
│   ├── chest.jpg                  ← treasure_chest.jpg
│   └── footprints.jpg
├── tiles/
│   ├── bushes.jpg                 ← bush_tileset.jpg
│   └── trees.jpg                  ← tree_tileset.jpg
└── ui/
    ├── avatars.jpg                ← avatar_template.jpg
    ├── defeat.jpg
    ├── loading.jpg
    ├── login_bg.jpg
    ├── logo.jpg                   ← the_hunt_logo.jpg
    └── victory.jpg
```

## Game Flow

Login Screen → Face Upload → Random Role Assignment (Survivor or Hunter) + Random Map → Match → Victory / Defeat

## Features

- Full Phaser 3 preloader
- Pixel-perfect rendering
- Camera follow
- Bush hiding (reduces detection)
- Killer AI (patrol → chase → search)
- Survival timer
- Mobile virtual joystick + WASD/Arrow keys
- Collision detection
- Responsive UI

All assets are referenced only through `js/config.js`.
