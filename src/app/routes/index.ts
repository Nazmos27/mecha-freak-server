import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { PaymentRoute } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
 
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes ,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path : '/payment',
    route : PaymentRoute
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
