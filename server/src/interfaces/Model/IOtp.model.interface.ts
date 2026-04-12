import { Document, Types, PopulatedDoc } from 'mongoose';
import { IUser } from './IUser.model.interface.js';
export interface IOtp extends Document {
  userId: PopulatedDoc<IUser>;
  otp: number;
  createdAt: Date;
  updatedAt: Date;
}
