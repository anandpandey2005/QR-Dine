import { Document, Types, PopulatedDoc } from 'mongoose';

export interface ICategory extends Document {
  name: string | null;
  image?: string | null;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
