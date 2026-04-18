import { Document, PopulatedDoc, Types } from 'mongoose';
import { ICategory } from './ICategory.models.interface.js';

export interface IProduct extends Document {
  name: string;
  images?: {
    secure_url: string;
    public_id: string;
  };
  ingredients?: string[];
  regularPrice: number;
  todayPrice: number;
  discountPercentage?: number;
  category: PopulatedDoc<ICategory>;
  rating?: number | null;
  stock?: number | null;
  underOffer?: boolean;
  isActive?: boolean;
  isVegetarian?: boolean;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}
