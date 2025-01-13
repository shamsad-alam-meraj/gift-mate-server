import { Schema, model } from 'mongoose';
import { TProduct } from './products.interface';

const SubCategorySchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
});

const CategorySchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  subCategory: { type: SubCategorySchema, required: true },
});

const OfferSchema = new Schema({
  buy1get1: { type: Boolean, required: true },
  free_delivery: { type: Boolean, required: true },
  percentage: { type: Number, required: true },
});

const ProductSchema = new Schema<TProduct>({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  inventory: { type: Number, required: true },
  category: { type: CategorySchema, required: true },
  have_offer: { type: Boolean, required: true },
  offer: { type: OfferSchema, required: false },
  tax: { type: Number, required: false },
  status: {
    type: String,
    enum: ['published', 'unpublished'],
    default: 'published',
  },
});

export const ProductModel = model<TProduct>('Product', ProductSchema);
