import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.models.js';
import UserId from '../models/UserId.models.js';
import CustomerProfile from '../models/CustomerProfile.model.js';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export interface IAuthRegistration {
  fullName: string;
  gmail: string;
  otp: string;
  phone: string;
  password: string;
  cnfrmPassword: string;
  role: string;
  userId: string;
}

export const authRegistration = async (req: Request<{}, {}, IAuthRegistration>, res: Response) => {
  let {
    fullName,
    gmail,
    otp,
    phone,
    password,
    cnfrmPassword,
    role = 'customer',
    userId,
  } = req.body || {};

  if (!fullName || !gmail || !otp || !password || !cnfrmPassword || !userId) {
    return res.status(400).json({ data: null, success: false, message: 'Empty values received' });
  }

  if (password !== cnfrmPassword) {
    return res
      .status(400)
      .json({ data: null, success: false, message: "Password doesn't match confirm password" });
  }

  userId = userId.trim();

  if (otp !== '345') {
    return res.status(400).json({ data: null, success: false, message: 'Invalid OTP provided' });
  }

  try {
    const is_gmail_phone_exists = await User.findOne({
      $or: [{ gmail }, { phone }],
    });

    const userId_exists = await UserId.findOne({ userId });

    if (userId_exists) {
      return res.status(409).json({ success: false, message: 'User id already exists' });
    }
    if (is_gmail_phone_exists) {
      return res
        .status(409)
        .json({ success: false, message: 'User with this gmail or phone already exists.' });
    }

    const newUserId = new mongoose.Types.ObjectId();

    let roleModel: string = 'CustomerProfile';
    switch (role) {
      case 'customer':
        roleModel = 'CustomerProfile';
        break;
      case 'manager':
        roleModel = 'ManagerProfile';
        break;
      case 'groundstaff':
        roleModel = 'GroundStaffProfile';
        break;
      case 'chef':
        roleModel = 'ChefProfile';
        break;
      default:
        roleModel = 'CustomerProfile';
        role = 'customer';
    }

    // TODO: Hash the password here using bcrypt before saving!
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId: userId,
      fullName: fullName,
      gmail,
      phone,
      password: password,
      role: role,
      roleModel: roleModel,
    });

    const newCustomerProfile = new CustomerProfile({
      userId: newUserId,
      loyaltyPoints: 0,
      preferences: [],
    });

    newUser.profile = newCustomerProfile._id as any;

    await newCustomerProfile.save();
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: newUser.userId,
        fullname: newUser.fullname,
        gmail: newUser.gmail,
        role: newUser.role,
      },
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
