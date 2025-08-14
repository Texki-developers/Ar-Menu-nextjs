import { FoodType } from '../types/home/product.types';

export const foodTypeImages: Record<FoodType, string> = {
  EGGETARIAN: '/assets/Veg/Eggetarian.png',
  FLEXITARIAN: '/assets/Veg/Flexitarian.png',
  FRUITARIAN: '/assets/Veg/Fruitarian.png',
  JAIN_VEGAN: '/assets/Veg/JainVegan.png',
  JAIN_VEGETARIAN: '/assets/Veg/JainVegetairan.png',
  NON_VEGETARIAN: '/assets/Veg/non-veg.png',
  PESCATARIAN: '/assets/Veg/Pescatarian.png',
  POLLOTARIAN: '/assets/Veg/Pollotarian.png',
  VEGAN: '/assets/Veg/VEgan.png',
  VEGETARIAN: '/assets/Veg/Vegetarian.png',
  RAW_VEGAN: '/assets/Veg/Vegetarian.png',
};

export const isValidFoodType = (foodType: string): foodType is FoodType => {
  return foodType in foodTypeImages;
};
