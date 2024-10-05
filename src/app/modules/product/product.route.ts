import { Router } from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { productsValidation } from './products.validation';

const router = Router();

router.post(
  '/create-product',
  validateRequest(productsValidation.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get('/', ProductControllers.getAllProducts);
router.get('/:id', ProductControllers.getSingleProduct);
router.put('/:id', ProductControllers.updateProduct);
router.delete('/:id', ProductControllers.deleteProduct);

export const ProductRoutes = router;
