import { ProductModel } from './products.model';
import { TProduct } from './products.interface';

export const ProductService = {
  async createProduct(productData: TProduct) {
    const product = new ProductModel(productData);
    return await product.save();
  },

  async getProducts() {
    return await ProductModel.find({});
  },

  async updateProduct(productId: string, updateData: Partial<TProduct>) {
    return await ProductModel.findByIdAndUpdate(productId, updateData, {
      new: true,
    });
  },
};
