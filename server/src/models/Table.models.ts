import mongoose, { Schema } from 'mongoose';
import { ITable } from '../interfaces/Model/ITable.models.interface.js';

const TableSchema = new Schema<ITable>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tableNumber: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Table = mongoose.models.Table || mongoose.model<ITable>('Table', TableSchema);

export default Table;
