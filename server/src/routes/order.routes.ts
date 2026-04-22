import express, { Request, Response } from 'express';
import { createOrder, verifyOrder } from '../controllers/order.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';


const orderRoutes = express.Router();

orderRoutes.post('/create', requireAuth, createOrder);
orderRoutes.post('/verify', requireAuth, verifyOrder);

export default orderRoutes;
