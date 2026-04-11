import { Document, Types, PopulatedDoc } from 'mongoose';
import { ICart } from './ICart.model.interfaces.js';
import { IOrder } from './IOrder.model.interface.js';

export interface IUser extends Document {
  fullname: string;
  gender?: string;
  dob?: Date | null;
  userId: string | null;
  gmail: string;
  phone?:string;
  orders?: PopulatedDoc<IOrder>[] | null;
  cart?: PopulatedDoc<ICart>[] | null;
  role: 'user' | 'admin' | 'cater' | 'chef';
  isSubscribe?: boolean;
  theme?: 'light' | 'dark' | 'system';
  isLoggedin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
