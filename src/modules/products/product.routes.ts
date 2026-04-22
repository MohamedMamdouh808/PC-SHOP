import { Router } from 'express';
import * as productController from './product.controller';
import { validate } from '../../middleware/validate';
import { productListQuerySchema } from '../../shared';

const router = Router();

// Public routes
router.get('/', validate(productListQuerySchema, 'query'), productController.getProducts);
router.get('/categories', productController.getCategories);
router.get('/:slug', productController.getProductBySlug);

export default router;
