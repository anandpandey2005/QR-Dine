import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    name: {
        first: string | null;
        last: string | null;
    };
    gender: string | null;
    dob: Date | null;
    userId: string | null;
    gmail: {
        address: string;
        isVerified: boolean;
    };
    phone: {
        countryCode: string;
        number: string | null;
        isVerified: boolean;
    };
    otp: string | null;
    otpExpiry: Date | null;
    orders: Types.ObjectId[] | null;
    cart: Types.ObjectId[] | null;
    role: 'user' | 'admin' | 'cater' | 'chef';
    isSubscribe: boolean;
    theme: 'light' | 'dark' | 'system';
    isLoggedin: boolean;
    createdAt: Date;
    updatedAt: Date;
}