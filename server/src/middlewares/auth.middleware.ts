import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.models.js';
import { PopulatedDoc } from 'mongoose';
import { ICart } from '../interfaces/Model/ICart.model.interfaces.js';
import { IOrder } from '../interfaces/Model/IOrder.model.interface.js';
import { IUserId } from '../models/UserId.models.js';

interface DecodedToken {
  userId: string;
  role: string;
  gmail: string;
  phone: string;
  isSubscribe: boolean;
  isLoggedin: boolean;
}

export interface AuthRequest extends Request {
  user?: {
    userId: PopulatedDoc<IUserId>;
    fullName: string;
    gender?: string;
    dob?: Date | null;
    gmail: string;
    phone?: string;
    password?: string;
    orders?: PopulatedDoc<IOrder>[] | null;
    cart?: PopulatedDoc<ICart>[] | null;
    role: 'customer' | 'manager' | 'chef' | 'groundStaff';
    roleModel: 'CustomerProfile' | 'ManagerProfile' | 'ChefProfile' | 'GroundStaffProfile';
    profile?: PopulatedDoc<Document> | null;
    isSubscribe?: boolean;
    theme?: 'light' | 'dark' | 'system';
    isLoggedin: boolean;
    accessToken: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
    generateAccessToken(): string;
    generateRefreshToken(): string;
    isPasswordCorrect(password: string): Promise<boolean>;
  };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      res.status(401).json({ message: 'You are not logged in. Please log in to get access.' });
      return;
    }

    const secret =
      process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN || process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined in environment variables');
    }

    const decoded = jwt.verify(token, secret) as DecodedToken;

    const userget: any = await User.findById(decoded.userId);

    if (!userget) {
      throw new Error('Something went wrong ');
    }

    req.user = userget;
    next();
  } catch (error: any) {
    return res
      .status(401)
      .json({
        success: false,
        message: error.message || 'Invalid or expired token. You are not logged in.',
      });
  }
};
