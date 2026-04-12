import mongoose, { Schema } from 'mongoose';
import { IChefProfile } from '../interfaces/Model/IChefProfile.model.interface.js';

const ChefProfileSchema = new Schema<IChefProfile>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shift: { type: String, enum: ['MORNING', 'EVENING', 'FULL_DAY', 'NIGHT'] },
    specialty: [{ type: String }],
  },
  { timestamps: true },
);

const ChefProfile =
  mongoose.models.ChefProfile || mongoose.model<IChefProfile>('ChefProfile', ChefProfileSchema);
export default ChefProfile;
