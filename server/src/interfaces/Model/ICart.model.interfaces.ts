import { Types, Document, PopulatedDoc } from 'mongoose';
import { IUser } from './IUser.model.interface.js';
import { IProduct } from './IProduct.model.interface.js';

export interface ICart extends Document {
  userId?: PopulatedDoc<IUser> | null;
  items: {
    productId: PopulatedDoc<IProduct>;
    quantity: number;
    customizations?: string;
    priceSnapshot: number;
  }[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
