import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { 
  ConflictError, 
  UnauthorizedError, 
  NotFoundError, 
  BusinessLogicError 
} from '../../lib/errors';
import { 
  RegisterInput, 
  LoginInput,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema
} from '../../shared';

// Mock database for testing
const mockUsers: any[] = [];
const mockSessions: any[] = [];
const mockResetTokens: any[] = [];
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function generateOpaqueToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function generateAccessToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

/**
 * Controller for authentication and session management.
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName } = req.body as RegisterInput;

  try {
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new ConflictError('A user with this email already exists.', 'email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = 'user_' + Date.now();
    
    const user = {
      id: userId,
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
      role: 'CUSTOMER',
      status: 'ACTIVE',
      createdAt: new Date(),
      lastLoginAt: null,
    };
    
    mockUsers.push(user);
    console.log('✅ User registered:', email);

    res.status(201).json({
      message: 'Registration successful! You can now login.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as LoginInput;

  try {
    const user = mockUsers.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (user.status === 'DEACTIVATED') {
      throw new BusinessLogicError('Account is deactivated. Please contact support.');
    }

    const accessToken = generateAccessToken({ sub: user.id, role: user.role });
    const refreshToken = generateOpaqueToken();

    // Create mock session
    mockSessions.push({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isActive: true,
    });

    // Update last login
    user.lastLoginAt = new Date();

    // Set refresh token in HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    if (!refreshToken) {
      throw new UnauthorizedError('No refresh token provided');
    }

    const session = mockSessions.find(s => s.token === refreshToken);
    const user = mockUsers.find(u => u.id === session?.userId);

    if (!session || session.expiresAt < new Date() || !session.isActive || !user) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    const accessToken = generateAccessToken({ sub: user.id, role: user.role });

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    if (refreshToken) {
      const session = mockSessions.find(s => s.token === refreshToken);
      if (session) {
        session.isActive = false;
      }
    }

    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
    }

    const resetToken = generateOpaqueToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    mockResetTokens.push({
      userId: user.id,
      token: resetToken,
      expiresAt,
      isActive: true,
    });

    console.log(`Password reset link: http://localhost:5173/reset-password?token=${resetToken}`);

    res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { token, password } = req.body;

  try {
    const resetRecord = mockResetTokens.find(t => t.token === token);

    if (!resetRecord || resetRecord.expiresAt < new Date() || !resetRecord.isActive) {
      throw new BusinessLogicError('Invalid or expired reset token');
    }

    const user = mockUsers.find(u => u.id === resetRecord.userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.passwordHash = hashedPassword;
    resetRecord.isActive = false;

    // Invalidate all user sessions
    mockSessions.filter(s => s.userId === user.id).forEach(s => s.isActive = false);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};
