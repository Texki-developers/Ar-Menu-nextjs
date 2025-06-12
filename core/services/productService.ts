import api from '@/core/axios';

export const getProductsCategories = async () => {
  const response = await api.get('product/items');
  return response.data.data;
};

export const getProductsById = async (id: string) => {
  const response = await api.get(`product/items/${id}`);
  return response.data;
};

export const searchProducts = async (name: string) => {
  const response = await api.get(`product/items/search?name=${name}`);
  return response.data;
};
