import mongoose, { Document, Types, PopulatedDoc } from 'mongoose';
import { ICart } from './ICart.model.interfaces.js';
import { IOrder } from './IOrder.model.interface.js';

export interface IUser extends Document {
  userId: Types.ObjectId;
  fullname: string;
  gender?: string;
  dob?: Date | null;
  gmail: string;
  phone?: string;
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
}
