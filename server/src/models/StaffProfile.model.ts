import mongoose, { Schema } from "mongoose";
import { IStaff } from "../interfaces/Model/IStaffProfile.model.interface.js";

const StaffProfileSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    shift: { type: String, enum: ['MORNING', 'EVENING', 'FULL_DAY', 'NIGHT'] },
    password: {
        type: String,
        required: true,
        default: '',
    },
    role: {
        type: String,
        enum: ['MANAGER', 'KITCHEN', 'RUNNER'],
        required: true
    },
    permissions: [{
        type: String,
        enum: ['VIEW_PAYMENTS', 'EDIT_MENU', 'UPDATE_ORDER_STATUS', 'MANAGE_TABLES']
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

}, { timestamps: true });

const StaffProfile = mongoose.models.StaffProfile || mongoose.model<IStaff>("StaffProfile", StaffProfileSchema);
export default StaffProfile;