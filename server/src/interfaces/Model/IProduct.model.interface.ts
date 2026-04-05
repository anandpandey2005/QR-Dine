import { Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  images: string[];
  ingredients?: string[];
  regularPrice: number;
  todayPrice: number;
  discountPercentage: number;
  rating?: number;
  stock: number;
  underOffer?: boolean;
  isActive?: boolean;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}
