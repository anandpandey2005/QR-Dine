import mongoose, { Schema } from "mongoose";
import { IOtp } from "../interfaces/Model/IOtp.model.interface.js";

const OtpSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    }
});

const Otp = mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);
export default Otp;