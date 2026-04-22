import express, { Request, Response } from 'express';
import {
  addProduct,
  getProduct,
  deleteProduct,
  manageActiveStatus,
  updateProduct,
} from '../controllers/product.controller.js';

const productRoutes = express.Router();

productRoutes.post('/', addProduct);
productRoutes.get('/', getProduct);
productRoutes.delete('/', deleteProduct);
productRoutes.patch('/:id', updateProduct);
productRoutes.put('/manage-active', manageActiveStatus);

export default productRoutes;
