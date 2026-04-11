import mongoose, { Schema, PopulatedDoc } from 'mongoose';
import { IOrder, IPaymentDetails, IOrderItem } from '../interfaces/Model/IOrder.model.interface.js';

const OrderSchema = new Schema<IOrder>(
  {
    tableNumber: {
      type: String,
      required: true,
      default: null,
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true },
        customizations: { type: String, default: '' },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['New', 'Cooking', 'Served', 'Completed', 'Cancelled'],
      default: 'New',
    },
    paymentDetails: {
      orderId: {
        type: String,
        required: true,
        default : null,
      },
      transactionId: { type: String, required: true },
      paymentMethod: { type: String, required: true },
      signature: {
        type: String,
        default: null,
      },
      description: {
        tyope: String,
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
