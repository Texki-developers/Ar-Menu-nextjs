import api from '../lib/axios';
export const LIVE_API = 'https://menu.hackphiles.in/api/v1/';

export const getProductsNcategories = async () => {
  const response = await api.get('product/items');
  return response.data.data;
};

export const getProductsById = async (id: string) => {
  const response = await api.get(`product/items/${id}`);
  return response.data;
};
