import { Model } from 'mongoose';

type SubCategory = {
  id: string;
  title: string;
};

type Category = {
  id: string;
  title: string;
  subCategory: SubCategory;
};

type Offer = {
  buy1get1: boolean;
  free_delivery: boolean;
  percentage: number;
};

type ProductStatus = 'published' | 'unpublished';

type TProduct = {
  title: string;
  brand: string;
  price: number;
  size: string;
  inventory: number;
  category: Category;
  have_offer: boolean;
  offer: Offer;
  tax: number;
  status: ProductStatus;
};

export type TProductModel = Model<TProduct>;
