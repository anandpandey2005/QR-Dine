import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces/Model/IUser.model.interface.js';

const UserSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      default: '',
    },
    gender: {
      type: String,
      enum: ['M', 'F', 'O', ''],
      default: '',
    },
    dob: {
      type: Date,
      default: null,
    },
    gmail: {
      type: String,
      required: true,
      default: ''
    },
    phone: {
      type: String,
      default: '',
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
