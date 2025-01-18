import { Request, Response } from 'express';
import { ProductService } from './products.service';
import {
  createProductSchema,
  ProductSchemeValidation,
} from './products.validation';
import { ProductModel } from './products.model';

export interface FilterProductsParams {
  budget?: 'Under $20' | '$20 - $50' | '$50 - $100' | 'Above $100';
  category?: string;
  age?: string;
  relationship?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  filters?: {
    price?: { $lt?: number; $gte?: number; $lte?: number; $gt?: number };
    'category.title'?: string;
    ageGroup?: string;
    relationship?: string;
    $text?: { $search: string };
  };
}

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
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: errorMessage });
    }
  },

  async getProducts(req: Request, res: Response) {
    const {
      page = 1,
      limit = 20,
      search = '',
      sortBy = 'createdAt',
      order = 'asc',
    } = req.query;

    try {
      const result = await ProductService.getProducts({
        page: Number(page),
        limit: Number(limit),
        search: String(search),
        sortBy: String(sortBy),
        order: String(order),
      });

      return res.status(200).json({
        status: 200,
        page: result.page,
        limit: result.limit,
        order,
        search,
        success: true,
        total: result.total,
        data: result.data,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return res
        .status(500)
        .json({ status: 500, success: false, error: errorMessage });
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
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: errorMessage });
    }
  },

  async filterProducts(params: FilterProductsParams) {
    const {
      filters = {},
      page = 1,
      limit = 20,
      search = '',
      sortBy = 'createdAt',
      order = 'asc',
    } = params;

    console.log(filters);

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    const limitValue = Number(limit);
    // Sort order
    const sortOrder = order === 'asc' ? 1 : -1;

    if (search) {
      filters.$text = { $search: search }; // Add $text dynamically for MongoDB text search
    }
    // Execute query with filters, pagination, and sorting
    const products = await ProductModel.find(filters)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitValue);

    // Count total documents for the query
    const total = await ProductModel.countDocuments(filters);

    return {
      data: products,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  },
};
