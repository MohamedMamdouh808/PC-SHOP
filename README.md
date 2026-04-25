# PC Shop Frontend

Standalone React + TypeScript frontend for PC Shop with mock API.

## Features
- React 19 + TypeScript
- Tailwind CSS styling
- MSW (Mock Service Worker) for API mocking
- React Router navigation
- Lucide icons
- Mock authentication (no backend required)

## Quick Start

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`

## Test Credentials

Use these credentials to login:
- **Email:** `admin1@gmail.com`
- **Password:** `Mohamed12@#`

Or register a new account - users are stored in memory.

## How It Works

- **Products, Orders**: Mock data from `src/lib/mockData.ts`
- **Authentication**: Mock auth via MSW handlers in `src/mocks/handlers.ts`
- **Cart**: Stored in localStorage

## Switch to Real Backend

To use the actual backend (`pc-shop-backend`):

1. Create `.env` file:
```
VITE_API_URL=http://localhost:3001/api
VITE_USE_MOCK=false
```

2. Start the backend:
```bash
cd ../pc-shop-backend
npm install
npm run dev
```

3. Restart the frontend

## Build for Production

```bash
npm run build
```

Output goes to `dist/` folder.

## Project Structure

```
├── 📁 public
│   └── 📄 mockServiceWorker.js
├── 📁 src
│   ├── 📁 components
│   │   ├── 📄 Footer.tsx
│   │   ├── 📄 Icons.tsx
│   │   ├── 📄 Logo.tsx
│   │   ├── 📄 MobileNav.tsx
│   │   ├── 📄 Navbar.tsx
│   │   ├── 📄 ProductCard.tsx
│   │   └── 📄 ScrollToTop.tsx
│   ├── 📁 context
│   │   ├── 📄 AuthContext.tsx
│   │   └── 📄 CartContext.tsx
│   ├── 📁 lib
│   │   ├── 📄 api.ts
│   │   └── 📄 mockData.ts
│   ├── 📁 mocks
│   │   ├── 📄 browser.ts
│   │   └── 📄 handlers.ts
│   ├── 📁 pages
│   │   ├── 📄 CartPage.tsx
│   │   ├── 📄 CheckoutPage.tsx
│   │   ├── 📄 HomePage.tsx
│   │   ├── 📄 LoginPage.tsx
│   │   ├── 📄 OrderDetailPage.tsx
│   │   ├── 📄 OrdersPage.tsx
│   │   ├── 📄 PCBuilderPage.tsx
│   │   ├── 📄 ProductDetailPage.tsx
│   │   ├── 📄 ProductsPage.tsx
│   │   ├── 📄 ProfilePage.tsx
│   │   └── 📄 RegisterPage.tsx
│   ├── 📁 shared
│   │   ├── 📁 src
│   │   │   ├── 📄 index.ts
│   │   │   └── 📄 schemas.ts
│   │   └── ⚙️ package.json
│   ├── 📁 styles
│   │   └── 📁 pages
│   │       ├── 🎨 CartPage.css
│   │       ├── 🎨 CheckoutPage.css
│   │       ├── 🎨 HomePage.css
│   │       ├── 🎨 LoginPage.css
│   │       ├── 🎨 OrderDetailPage.css
│   │       ├── 🎨 OrdersPage.css
│   │       ├── 🎨 ProductDetailPage.css
│   │       ├── 🎨 ProductsPage.css
│   │       ├── 🎨 ProfilePage.css
│   │       └── 🎨 RegisterPage.css
│   ├── 📄 App.tsx
│   ├── 🎨 index.css
│   ├── 📄 main.tsx
│   └── 📄 vite-env.d.ts
├── ⚙️ .env.example
├── ⚙️ .gitignore
├── 📝 README.md
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.js
├── 📄 refactor.cjs
├── 📄 tailwind.config.js
├── ⚙️ tsconfig.json
├── 📄 tsconfig.tsbuildinfo
└── 📄 vite.config.ts
```

---

## Deployment (Vercel)

1. Push this folder to GitHub
2. Import to Vercel
3. Build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output: `dist`
