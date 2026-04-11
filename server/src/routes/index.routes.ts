import { Router } from 'express';
import cartRoutes from './cart.routes.js';
import orderRoutes from './order.routes.js';
import productRoutes from './product.routes.js';
import authRoutes from './auth.routes.js';
import kitchenRoutes from './kitchen.routes.js';
import runnerRoutes from './runner.routes.js';
import managerRoutes from './manager.routes.js';
import customerRoutes from './customer.routes.js';

const rootRouter = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/manager', managerRoutes);
rootRouter.use('/kitchen', kitchenRoutes);
rootRouter.use('/runner', runnerRoutes);
rootRouter.use('/customer', customerRoutes);
rootRouter.use('/products', productRoutes);
rootRouter.use('/cart', cartRoutes);
rootRouter.use('/order', orderRoutes);

export default rootRouter;
