import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';

const cartRoutes = express.Router();

cartRoutes.use(requireAuth);


export default cartRoutes;
