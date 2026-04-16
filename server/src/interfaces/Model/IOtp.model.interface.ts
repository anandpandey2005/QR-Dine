import { Document, Types, PopulatedDoc } from 'mongoose';
import { IUserId } from '../../models/UserId.models.js';
export interface IOtp extends Document {
  userId: PopulatedDoc<IUserId>;
  otp: number;
  createdAt: Date;
  updatedAt: Date;
}
