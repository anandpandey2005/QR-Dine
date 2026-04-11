import mongoose, { Types, Document, PopulatedDoc } from 'mongoose';
import { IUser } from './IUser.model.interface.js';

export interface IStaff extends Document {
    userId: PopulatedDoc<IUser>;
    fullname: string;
    password: string;
    role: string[];
    permission?: string[];
    shift?: string[];
    createdAt: Date;
    updatedAt: Date;
};