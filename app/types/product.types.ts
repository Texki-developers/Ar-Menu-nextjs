export type CategoryType = {
  _id: string;
  name: string;
  priority: number;
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
  speciality: string;
  food_type: string;
  priority?: number;
  recommended_sides: ProductType[];
};

export type ProductCategoryResponse = {
  categories: {
    [key: string]: {
      category: CategoryType;
      items: ProductType[];
    };
  };
  is_recommended: Record<string, unknown>;
};
