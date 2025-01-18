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

const CurrencySchema = new Schema({
  native_symbol: { type: String, required: true }, // E.g., "₹", "$"
  symbol: { type: String, required: true }, // E.g., "INR", "USD"
  country: { type: String, required: true }, // E.g., "India", "USA"
  name: { type: String, required: true }, // E.g., "Indian Rupee", "US Dollar"
  short_name: { type: String, required: true }, // E.g., "Rupee", "Dollar"
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
  image: { type: String },
  ratings: { type: Number, min: 0, max: 5, required: true },
  description: { type: String, minlength: 50, required: true },
  relationship: { type: String },
  budget: { type: String },
  age: { type: String },
  currency: { type: CurrencySchema, required: true }, // New field
});

export const ProductModel = model<TProduct>('Product', ProductSchema);
