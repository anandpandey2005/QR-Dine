import mongoose, { Schema } from 'mongoose';
import { ICustomerProfile } from '../interfaces/Model/ICustomerProfile.model.interface.js';

const CustomerProfileSchema = new Schema<ICustomerProfile>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    loyaltyPoints: { type: Number, default: 0 },
    preferences: [{ type: String }],
  },
  { timestamps: true },
);

const CustomerProfile =
  mongoose.models.CustomerProfile ||
  mongoose.model<ICustomerProfile>('CustomerProfile', CustomerProfileSchema);
export default CustomerProfile;
