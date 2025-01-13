import express from 'express';
import { ProductController } from './products.controller';

const router = express.Router();

router.get('/', ProductController.getProducts);

export const ProductRoutes = router;
