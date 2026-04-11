import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from '../interfaces/Model/IProduct.model.interface.js';

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    images: [
      {
        type: String,
        default: [],
      },
    ],
    ingredients: [
      {
        type: String,
        default: [],
      },
    ],
    regularPrice: {
      type: Number,
      required: true,
      set: (v: number) => parseFloat(v.toFixed(2)),
    },
    todayPrice: {
      type: Number,
      required: true,
      set: (v: number) => parseFloat(v.toFixed(2)),
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    rating: {
      type: Number,
      default: null,
      min: [0, 'Rating cannot be below 0'],
      max: [5, 'Rating cannot be above 5'],
      set: (v: number) => parseFloat(v.toFixed(1)),
    },
    stock: {
      type: Number,
      default: null,
    },
    underOffer: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
      default: '',
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
  },
);

ProductSchema.pre('save', function (next: any) {
  if (this.regularPrice && this.todayPrice) {
    const diff = this.regularPrice - this.todayPrice;
    const percentage = (diff / this.regularPrice) * 100;
    this.discountPercentage = parseFloat(percentage.toFixed(2));

    this.underOffer = this.discountPercentage > 0;
  }
  next();
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
