/*
- Order Creation - fetch the item fromt e cart , calculte the total price and create the razorpay order id
- status management - track if a  order is pending  , paid or cancelled
- verify the razorpay signature sent back from the frontend to prevent to fraud
- inventory sync - reduce the stock levels only after a successful payment
- cart cleanup - empty the user's cart once the transaction is complete

*/

import { Request, Response } from 'express';
import crypto from 'crypto';
import Cart from '../models/Cart.models.js';
import Order from '../models/Order.models.js';
import Product from '../models/Products.models.js';

export const createOrder = async (req: any, res: Response) => {
  const userId = req?.userId;
  try {
    const cartItems = await Cart.findOne({ userId }).populate('items.productId');

    if (!cartItems || cartItems.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = cartItems.items.map((item: any) => {
      const itemTotal = item.productId.price * item.quantity;
      totalAmount += itemTotal;
      return {
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
        priceAtPurchase: item.productId.price,
        customizations: item.customizations || '',
        status: 'placed',
      };
    });

    // Create order
    const newOrder = new Order({
      tableNumber: req.body.tableNumber || null,
      orderType: req.body.orderType || 'Dine-In',
      tokenNumber: req.body.tokenNumber || null,
      items: orderItems,
      totalAmount: totalAmount,
      status: 'placed',
      paymentDetails: {
        orderId: null,
        transactionId: '',
        paymentMethod: req.body.paymentMethod || 'Cash',
        status: 'pending',
        signature: null,
        description: null,
      },
      customerName: req.body.customerName || null,
      orderTime: new Date(),
    });

    const savedOrder = await newOrder.save();

    // Clear the cart
    await Cart.findByIdAndDelete(cartItems._id);

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

export const verifyOrder = async (req: any, res: Response) => {
  try {
    const { orderId, transactionId, signature, paymentMethod, description } = req.body;

    if (!orderId || !transactionId || !signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment details',
      });
    }

    // Verify Razorpay signature
    const body = orderId + '|' + transactionId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY || '')
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    // Update order with payment details
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: 'Completed',
        paymentDetails: {
          orderId: orderId,
          transactionId: transactionId,
          paymentMethod: paymentMethod || 'Card',
          status: 'paid',
          signature: signature,
          description: description || null,
        },
      },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Update inventory
    for (const item of updatedOrder.items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true },
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Order verified and payment processed successfully',
      order: updatedOrder,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};
