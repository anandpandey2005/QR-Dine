import mongoose, { Schema, Document } from 'mongoose';

export interface IUserId extends Document {
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserIdSchema = new Schema<IUserId>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,

    }
);

const UserId = mongoose.models.UserId || mongoose.model<IUserId>("UserId", UserIdSchema);

export default UserId;