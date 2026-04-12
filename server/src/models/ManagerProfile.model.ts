import mongoose, { Schema } from 'mongoose';
import { IManagerProfile } from '../interfaces/Model/IManagerProfile.model.interface.js';

const ManagerProfileSchema = new Schema<IManagerProfile>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shift: { type: String, enum: ['MORNING', 'EVENING', 'FULL_DAY', 'NIGHT'] },
    permissions: [
      {
        type: String,
        enum: [
          'VIEW_PAYMENTS',
          'EDIT_MENU',
          'UPDATE_ORDER_STATUS',
          'MANAGE_TABLES',
          'MANAGE_USERS',
        ],
      },
    ],
  },
  { timestamps: true },
);

const ManagerProfile =
  mongoose.models.ManagerProfile ||
  mongoose.model<IManagerProfile>('ManagerProfile', ManagerProfileSchema);
export default ManagerProfile;
