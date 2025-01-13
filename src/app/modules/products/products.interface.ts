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
  ratings?: number;
  description?: string;
};

export type TProductModel = Model<TProduct>;
