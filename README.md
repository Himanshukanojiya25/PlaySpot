# PlaySpot (local workspace)

This project is a Vite + React + TypeScript starter augmented with Three.js and R3F for a 3D hero. The `three` library is bundled via npm and split into a separate vendor chunk by Vite for caching.

How to run locally

1. Install dependencies:

```powershell
cd "c:\Users\ASUS\OneDrive\Desktop\project"
npm install --legacy-peer-deps
```

2. Start dev server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

Notes on bundle size

- `three` is large by nature. The build creates a `vendor_three` chunk so browsers can cache it.
- If initial load is a concern, consider lazy-loading 3D-heavy components and keeping them out of the main route above-the-fold.

Notes

- The project uses vendor chunking; consider further code-splitting if needed.
- We ran `npm audit fix --force` to address vulnerabilities; please review the lockfile changes and test thoroughly.

If you'd like, we can:
- Explore deeper tree-shaking and selective imports,
- Add more route-level code-splitting for 3D features, or
- Create a git branch and push these changes for review.

Helper scripts:

```powershell
# start dev server (alias for npm run dev)
npm start

# remove dist output
npm run clean
```
