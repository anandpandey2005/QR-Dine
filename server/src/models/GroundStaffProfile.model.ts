import mongoose, { Schema } from 'mongoose';
import { IGroundStaffProfile } from '../interfaces/Model/IGroundStaffProfile.model.interface.js';

const GroundStaffProfileSchema = new Schema<IGroundStaffProfile>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shift: { type: String, enum: ['MORNING', 'EVENING', 'FULL_DAY', 'NIGHT'] },
    status: { type: String, enum: ['AVAILABLE', 'BUSY', 'OFF_DUTY'], default: 'OFF_DUTY' },
    vehicleType: { type: String, default: '' },
  },
  { timestamps: true },
);

const GroundStaffProfile =
  mongoose.models.GroundStaffProfile ||
  mongoose.model<IGroundStaffProfile>('GroundStaffProfile', GroundStaffProfileSchema);
export default GroundStaffProfile;
