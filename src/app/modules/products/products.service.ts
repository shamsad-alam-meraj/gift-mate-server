import { TProduct } from './products.interface';
import { ProductModel } from './products.model';

interface GetProductsParams {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  order: string;
}

interface FilterProductsParams {
  budget?: 'Under $20' | '$20 - $50' | '$50 - $100' | 'Above $100';
  category?: string;
  age?: string;
  relationship?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
}

export const ProductService = {
  async createProduct(productData: TProduct) {
    const product = new ProductModel(productData);
    return await product.save();
  },

  async getProducts({ page, limit, search, sortBy, order }: GetProductsParams) {
    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    const query = search ? { title: { $regex: search, $options: 'i' } } : {};

    const products = await ProductModel.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await ProductModel.countDocuments(query);

    return {
      data: products,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      total,
    };
  },

  async updateProduct(id: string, productData: Partial<TProduct>) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  },

  async filterProducts(filters: FilterProductsParams) {
    const {
      page = 1,
      limit = 20,
      search = '',
      sortBy = 'createdAt',
      order = 'asc',
    } = filters;

    // Define a strongly typed query object
    const query: Record<string, unknown> = {};

    // Add budget filter
    if (filters.budget) {
      if (filters.budget === 'Under $20') query.price = { $lt: 20 };
      else if (filters.budget === '$20 - $50')
        query.price = { $gte: 20, $lte: 50 };
      else if (filters.budget === '$50 - $100')
        query.price = { $gte: 50, $lte: 100 };
      else if (filters.budget === 'Above $100') query.price = { $gt: 100 };
    }

    // Add category filter
    if (filters.category) {
      query['category.title'] = filters.category;
    }

    // Add age group filter
    if (filters.age) {
      query.ageGroup = filters.age;
    }

    // Add relationship filter
    if (filters.relationship) {
      query.relationship = filters.relationship;
    }

    // Add search filter
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    const limitValue = Number(limit);

    // Sort order
    const sortOrder = order === 'asc' ? 1 : -1;

    // Execute query with pagination and sorting
    const products = await ProductModel.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitValue);

    // Count total documents for the query
    const total = await ProductModel.countDocuments(query);

    return {
      data: products,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  },
};
