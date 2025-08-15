import { EFoodSpecialty } from '@/components/atoms/SpecialtyTag';

export type CategoryType = {
  _id: string;
  name: string;
  priority?: number;
};

export type ProductType = {
  _id: string;
  name: string;
  desc: string;
  image: string;
  three_glb: string;
  three_usdz: string;
  actual_price: number;
  offer_price: number;
  category: string;
  non_veg: boolean;
  recipes: string[];
  is_recommended: boolean;
  speciality: EFoodSpecialty;
  food_type: string;
  priority?: number;
  recommended_sides: ProductType[];
};

export type CategorizedType = {
  category: CategoryType;
  products: ProductType[];
};

export type ProductCategoryResponse = {
  recommendedProducts: ProductType[];
  categorizedProducts: CategorizedType[];
};

export type FoodType =
  | 'EGGETARIAN'
  | 'FLEXITARIAN'
  | 'FRUITARIAN'
  | 'JAIN_VEGAN'
  | 'JAIN_VEGETARIAN'
  | 'NON_VEGETARIAN'
  | 'PESCATARIAN'
  | 'POLLOTARIAN'
  | 'VEGAN'
  | 'VEGETARIAN'
  | 'RAW_VEGAN';

export interface IVendorDetails {
  _id: string;
  name: string;
  location: string;
  logo: string;
  banner: string;
}
