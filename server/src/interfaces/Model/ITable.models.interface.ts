import mongoose, { Types, Document, PopulatedDoc } from 'mongoose';
import { IUser } from './IUser.model.interface.js';

export interface ITable extends Document {
  userId: PopulatedDoc<IUser>;
  tableNumber: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
