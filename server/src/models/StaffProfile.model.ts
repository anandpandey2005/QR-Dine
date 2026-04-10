import mongoose, { Schema } from "mongoose";

const StaffProfileSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    shift: { type: String, enum: ['MORNING', 'EVENING', 'FULL_DAY'] },
    passcode: { type: String },
    role: {
        type: String,
        enum: ['MANAGER', 'KITCHEN', 'RUNNER'],
        required: true
    },
    permissions: [{
        type: String,
        enum: ['VIEW_PAYMENTS', 'EDIT_MENU', 'UPDATE_ORDER_STATUS', 'MANAGE_TABLES']
    }]

}, { timestamps: true });

const StaffProfile = mongoose.models.StaffProfile || mongoose.model("StaffProfile", StaffProfileSchema);
export default StaffProfile;