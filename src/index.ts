import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Middleware
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

// Routes
import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/products/product.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// ─── MIDDLEWARE ─────────────────────────────────────────────────────────

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter()); // Global rate limiter

// ─── ROUTES ─────────────────────────────────────────────────────────────

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'pc-shop-api'
  });
});

// ─── ERROR HANDLING ─────────────────────────────────────────────────────

app.use(errorHandler);

// ─── SERVER START ───────────────────────────────────────────────────────

app.listen(port, () => {
  console.log(`🚀 PC Shop API running at http://localhost:${port}`);
});
