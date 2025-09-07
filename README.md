# Habit Tracker PWA (GitHub Pages-ready)

This is a zero-build, installable **Progressive Web App** you can deploy to **GitHub Pages** and add to your iPhone Home Screen.

## Deploy (fastest path)
1. Create a new GitHub repo (e.g., `habit-tracker`).
2. Upload everything in this zip **as-is**, keeping the `docs/` folder.
3. On GitHub: **Settings → Pages** → **Source: `main` / `docs`**.
4. Open: `https://<yourname>.github.io/<repo>/`  
   On iPhone (Safari): Share → **Add to Home Screen**.

No Node/Vite build required. All assets are in `docs/` and the service worker + manifest handle install/offline.

## Customising
- App name/icon: edit `docs/manifest.json` and replace PNGs in `docs/icons/`.
- Styles: edit `docs/styles.css`.
- Logic: edit `docs/app.js` (currently uses `localStorage`).

## Optional: use the repo root instead of /docs
If you prefer `gh-pages` branch deployment:
- Move files from `docs/` to the repo root.
- Use a tool like `gh-pages` to publish the root directory to a `gh-pages` branch.
