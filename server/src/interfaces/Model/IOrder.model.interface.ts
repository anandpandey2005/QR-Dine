import { Document, PopulatedDoc, Types } from 'mongoose';
import { IProduct } from './IProduct.model.interface.js';
import { string } from 'zod';

export interface IOrderItem {
  productId: PopulatedDoc<IProduct>;
  name: string;
  quantity: number;
  priceAtPurchase: number;
  customizations?: string;
  status?: 'placed' | 'Cooking' | 'ready to server' | 'Completed' | 'Cancelled' | 'served';
}

export interface IPaymentDetails {
  orderId: string | null;
  transactionId: string;
  paymentMethod: string;
  status: string;
  signature?: string | null;
  description?: string | null;
}

export interface IOrder extends Document {
  tableNumber?: string | null;
  orderType: 'Dine-In' | 'Takeaway';
  tokenNumber?: string | null;
  items: IOrderItem[];
  totalAmount: number;
  status?: 'placed' | 'Cooking' | 'ready to server' | 'Completed' | 'Cancelled' | 'served';
  paymentDetails: IPaymentDetails;
  customerName?: string | null;
  orderTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
