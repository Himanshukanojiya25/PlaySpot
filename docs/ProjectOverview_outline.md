# Project Overview - Slide Outline

## Title
- Project name, author, date

## High-level summary
- Purpose
- Tech stack (React, Vite, TypeScript, r3f/drei/three, Tailwind, Framer Motion)

## Folder structure (top-level)
- `src/`
  - `App.tsx` - app root, holds main state
  - `main.tsx` - app entry
  - `components/` - UI components: Navbar, Hero, Hero3D, Hero3D subcomponents, TurfsSection, TurfCard, TurfDetails, BookingModal, AboutSection, Footer
  - `data/turfs.json` - static turf dataset
  - `index.css` - tailwind + custom styles

## Entry points
- `main.tsx` -> `App.tsx` -> components

## 3D flow
- `Hero` uses `Client3DLoader` which dynamically imports `Hero3D`.
- `Hero3D` contains a `Canvas` from `@react-three/fiber` and lazy-loads `AnimatedSphere`.
- `AnimatedSphere` uses `@react-three/drei` (Sphere, MeshDistortMaterial) and `three` for geometry.

## State flow
- App state: `selectedTurfId`, `isDetailsOpen`, `isBookingOpen`
- `TurfsSection` -> `TurfDetails` (open) -> `BookingModal` (book)

## Build & scripts
- `npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint`

## Next steps
- Dependency pinning or upgrades, bundle optimization, tests & CI, security audit
