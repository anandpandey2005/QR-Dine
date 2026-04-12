import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    userId: string;
    role: string;
}

export interface AuthRequest extends Request {
    user?: {
        _id: string;
        role: string;
    };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization || req?.cookies?.token;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: "You are not logged in. Please log in to get access." });
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as DecodedToken;
        req.user = {
            _id: decoded.userId,
            role: decoded.role
        };
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token. You are not logged in." });
    }
};