import express from 'express';
import { ProductController } from './products.controller';

const router = express.Router();

// Get the product list as a normal user
router.get('/', ProductController.getProducts);
// Create Product As an Admin
router.post('/admin/create', ProductController.createProduct);
// Update Product as an Admin
router.put('/admin/update', ProductController.updateProduct);

export default router;

export const ProductRoutes = router;
