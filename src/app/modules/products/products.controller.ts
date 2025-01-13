import { Request, Response } from 'express';
import { ProductService } from './products.service';
import {
  createProductSchema,
  ProductSchemeValidation,
} from './products.validation';

export const ProductController = {
  async createProduct(req: Request, res: Response) {
    const validation = createProductSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    try {
      const product = await ProductService.createProduct(validation.data);
      return res.status(201).json({ product });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: errorMessage });
    }
  },

  async getProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getProducts();
      return res.status(200).json({ products });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: errorMessage });
    }
  },

  async updateProduct(req: Request, res: Response) {
    const validation = ProductSchemeValidation.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    try {
      const product = await ProductService.updateProduct(
        req.params.id,
        validation.data,
      );
      return res.status(200).json({ product });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: errorMessage });
    }
  },
};
