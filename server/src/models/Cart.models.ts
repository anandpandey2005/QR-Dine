import mongoose, { Model, Schema } from 'mongoose';
import { ICart, ICartItem } from '../interfaces/Model/ICart.model.interfaces.js';
import { NextFunction } from 'express';

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity cannot be less than 1'],
          default: 1,
        },
        customizations: {
          type: String,
          default: '',
        },
        priceSnapshot: {
          type: Number,
          required: true,
          min: [0, 'Price cannot be negative'],
          set: (v: number) => parseFloat(v.toFixed(2)),
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
      set: (v: number) => parseFloat(v.toFixed(2)),
    },
  },
  { timestamps: true },
);

CartSchema.pre('save', async function () {
  const cart = this as ICart & { items: ICartItem[] };
  const Product = mongoose.model('Product');

  await Promise.all(
    cart.items.map(async (item: ICartItem) => {
      const product = await Product.findById(item.productId);
      if (product) {
        item.priceSnapshot = product.todayPrice;
      }
    }),
  );
});

CartSchema.pre('save', function () {
  const cart = this as ICart & { items: ICartItem[] };

  cart.totalAmount = cart.items.reduce((total: number, item: ICartItem) => {
    const price = item.priceSnapshot || 0;
    return total + price * item.quantity;
  }, 0);
});

const Cart = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
