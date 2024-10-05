import express from 'express';
import { orderValidations } from './order.validation';
import { OrderControllers } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(orderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);

router.get('/', OrderControllers.getAllOrders);
router.get('/:id', OrderControllers.getSingleOrder);
router.put('/:id', OrderControllers.updateOrder);
router.delete('/:id', OrderControllers.deleteOrder);

export const OrderRoutes = router;
