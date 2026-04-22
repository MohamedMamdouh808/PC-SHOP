# PC Shop Frontend

Standalone React + TypeScript frontend for PC Shop.

## Features
- React 19 + TypeScript
- Tailwind CSS styling
- MSW (Mock Service Worker) for API mocking
- React Router navigation
- Lucide icons

## Setup

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`

## API Configuration

By default, API calls are mocked via MSW. To use a real backend:

1. Create `.env` file:
```
VITE_API_URL=http://localhost:3001/api
VITE_USE_MOCK=false
```

2. Start the backend from `pc-shop-backend`

## Build

```bash
npm run build
```

Output goes to `dist/` folder.

## Deployment (Vercel)

1. Push this folder to GitHub
2. Import to Vercel
3. Build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output: `dist`
