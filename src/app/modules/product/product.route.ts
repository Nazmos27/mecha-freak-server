import { Router } from "express";
import { ProductControllers } from "./product.controller";

const router = Router()

router.post('/create-product',ProductControllers.postProduct)

router.get('/get-products',ProductControllers.getAllProduct)

export const ProductRoutes = router