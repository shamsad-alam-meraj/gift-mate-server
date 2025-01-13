import { TProduct } from './products.interface';
import { ProductModel } from './products.model';

interface GetProductsParams {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  order: string;
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
};
