import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
        _id: string;
        role: string;
        gmail: string;
        phone: string;
        isSubscribe: boolean;
        isLoggedin: boolean;

    };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        let token: string | undefined;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && (req.cookies.accessToken)) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            res.status(401).json({ message: "You are not logged in. Please log in to get access." });
            return;
        }

        const secret = process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN || process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
        }

        const decoded = jwt.verify(token, secret) as DecodedToken;
        req.user = {
            _id: decoded.userId,
            role: decoded.role,
            gmail: decoded.gmail,
            phone: decoded.phone,
            isLoggedin: decoded.isLoggedin,
            isSubscribe: decoded.isSubscribe,
        };
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token. You are not logged in." });
    }
};

