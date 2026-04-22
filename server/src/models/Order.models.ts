import mongoose, { Schema, PopulatedDoc } from 'mongoose';
import { IOrder, IPaymentDetails, IOrderItem } from '../interfaces/Model/IOrder.model.interface.js';

const OrderSchema = new Schema<IOrder>(
  {
    tableNumber: {
      type: String,
      default: null,
    },
    orderType: {
      type: String,
      enum: ['Dine-In', 'Takeaway'],
      required: true,
      default: 'Dine-In',
    },
    tokenNumber: {
      type: String,
      default: null,
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true },
        customizations: { type: String, default: '' },
        status: {
          type: String,
          enum: ['placed', 'Cooking', 'ready to server', 'Completed', 'Cancelled', 'served'],
          default: 'placed',
        }
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['placed', 'Cooking', 'ready to server', 'Completed', 'Cancelled', 'served'],
      default: 'placed',
    },
    paymentDetails: {
      orderId: {
        type: String,
        required: true,
        default: null,
      },
      transactionId: { type: String, required: true },
      paymentMethod: { type: String, required: true },
      signature: {
        type: String,
        default: null,
      },
      description: {
        type: String,
        default: null,
      },
      status: { type: String, required: true },
    },
    customerName: { type: String, default: null },
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
