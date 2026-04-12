import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces/Model/IUser.model.interface.js';

const UserSchema = new Schema<IUser>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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
      default: '',
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
      enum: ['customer', 'manager', 'chef', 'groundStaff'],
      required: true,
      default: 'customer',
    },
    roleModel: {
      type: String,
      enum: ['CustomerProfile', 'ManagerProfile', 'ChefProfile', 'GroundStaffProfile'],
      required: true,
      default: 'CustomerProfile',
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'roleModel',
      default: null,
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
