import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces/Model/IUser.model.interface.js';

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      first: {
        type: String,
        default: null,
      },
      last: {
        type: String,
        default: null,
      },
    },
    gender: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },
    gmail: {
      address: { type: String, required: [true, 'gmail mandatory.'] },
      isVerified: { type: Boolean, default: false },
    },
    phone: {
      countryCode: { type: String, default: '+91' },
      number: { type: String, default: null },
      isVerified: { type: Boolean, default: false },
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        default: null,
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        default: null,
      },
    ],
    role: {
      type: String,
      enum: ['user', 'admin', 'cater', 'chef'],
      required: true,
    },
    isSubscribe: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'dark',
    },
    isLoggedin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
