import { FoodType, ProductCategoryResponse } from './types/product.types';

export const getCategoryNames = (data: ProductCategoryResponse): string[] => {
  if (!data?.categories) return [];

  return Object.values(data.categories).map(
    (category) => category.category.name
  );
};

export const getItemsbyCategory = (
  data: ProductCategoryResponse,
  category: string
) => {
  console.log(data, 'dataaa');
  if (!category || !data.categories[category]) return [];
  return data.categories[category].items;
};

export const foodTypeImages: Record<FoodType, string> = {
  EGGETARIAN: '/assets/Veg/Eggetarian.png',
  FLEXITARIAN: '/assets/Veg/Flexitarian.png',
  FRUITARIAN: '/assets/Veg/Fruitarian.png',
  JAIN_VEGAN: '/assets/Veg/Jain Vegan.png',
  JAIN_VEGETARIAN: '/assets/Veg/Jain Vegetairan.png',
  NON_VEG: '/assets/Veg/non-veg.png',
  PESCATARIAN: '/assets/Veg/Pescatarian.png',
  POLLOTARIAN: '/assets/Veg/Pollotarian.png',
  VEGAN: '/assets/Veg/VEgan.png',
  VEGETARIAN: '/assets/Veg/Vegetarian.png',
};

export const isValidFoodType = (foodType: string): foodType is FoodType => {
  return foodType in foodTypeImages;
};
