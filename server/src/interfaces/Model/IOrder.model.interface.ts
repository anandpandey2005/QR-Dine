import { Document, PopulatedDoc, Types } from 'mongoose';
import { IProduct } from './IProduct.model.interface.js';

export interface IOrderItem {
  productId: PopulatedDoc<IProduct>;
  name: string;
  quantity: number;
  priceAtPurchase: number;
  customizations?: string;
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
  tableNumber: string | null;
  items: IOrderItem[];
  totalAmount: number;
  status?: 'New' | 'Cooking' | 'Served' | 'Completed' | 'Cancelled';
  paymentDetails: IPaymentDetails;
  customerName?: string | null;
  orderTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
