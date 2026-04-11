import mongoose, { Mongoose, Schema } from 'mongoose';

import { ICategory } from '../interfaces/Model/ICategory.models.interface.js';

const CategorySchema = new Schema<ICategory>(
  {
    image: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
