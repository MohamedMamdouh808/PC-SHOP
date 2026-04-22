# PC Shop Backend

Standalone Express + TypeScript backend for PC Shop.

## Features
- Express 4 with TypeScript
- Prisma ORM (database included)
- JWT authentication
- Zod validation
- Mock database support for testing

## Setup

```bash
npm install
npx prisma generate
npm run dev
```

The server runs on `http://localhost:3001`

## Environment Variables

Create `.env` file:

```
PORT=3001
DATABASE_URL=postgresql://user:pass@localhost:5432/pcshop
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Database

Prisma schema is located in `database/schema.prisma`

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/products` - List products
- `GET /api/products/:slug` - Get single product
- `POST /api/orders` - Create order
- `GET /api/orders` - List user orders

## Build

```bash
npm run build
npm start
```

## Deployment (Render/Railway)

1. Push this folder to GitHub
2. Connect to Render or Railway
3. Set environment variables
4. Build command: `npm run build`
5. Start command: `npm start`
