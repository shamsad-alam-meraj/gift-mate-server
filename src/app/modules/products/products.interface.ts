import { Model } from 'mongoose';

export type SubCategory = {
  id?: string;
  title?: string;
};

export type Category = {
  id?: string;
  title?: string;
  subCategory?: SubCategory;
};

export type Offer = {
  buy1get1?: boolean;
  free_delivery?: boolean;
  percentage?: number;
};

export type Currency = {
  native_symbol: string; // E.g., "₹", "$"
  symbol: string; // E.g., "INR", "USD"
  country: string; // E.g., "India", "USA"
  name: string; // E.g., "Indian Rupee", "US Dollar"
  short_name: string; // E.g., "Rupee", "Dollar"
};

export type ProductStatus = 'published' | 'unpublished';

export type TProduct = {
  title: string;
  brand: string;
  price: number;
  size: string;
  inventory: number;
  category?: Category;
  have_offer: boolean;
  offer?: Offer;
  tax?: number;
  status: ProductStatus;
  image?: string;
  ratings?: number;
  description?: string;
  relationship?: string;
  budget?: string;
  age?: string;
  currency: Currency;
};

export type TProductModel = Model<TProduct>;
