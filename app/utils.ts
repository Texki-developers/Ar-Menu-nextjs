import { ProductCategoryResponse } from './types/product.types';

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
