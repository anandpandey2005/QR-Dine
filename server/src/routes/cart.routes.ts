import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cart.controller.js';

const cartRoutes = express.Router();

cartRoutes.use(requireAuth);

cartRoutes.post('/add', addToCart);
cartRoutes.get('/', getCart);
cartRoutes.put('/update', updateCartItem);
cartRoutes.delete('/remove', removeFromCart);
cartRoutes.delete('/clear', clearCart);

export default cartRoutes;
