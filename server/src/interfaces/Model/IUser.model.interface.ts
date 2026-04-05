import { Document, Types, PopulatedDoc } from 'mongoose';
import { ICart } from './ICart.model.interfaces.js';
import { IOrder } from './IOrder.model.interface.js';
export interface IUser extends Document {
  name: {
    first: string | null;
    last: string | null;
  };
  gender?: string | null;
  dob?: Date | null;
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
  orders: PopulatedDoc<IOrder>[] | null;
  cart: PopulatedDoc<ICart>[] | null;
  role: 'user' | 'admin' | 'cater' | 'chef';
  isSubscribe?: boolean;
  theme?: 'light' | 'dark' | 'system';
  isLoggedin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
