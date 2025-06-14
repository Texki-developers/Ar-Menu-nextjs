import api from '@/core/axios';
import { ApiResponse, ApiService } from '../http';
import { ProductCategoryResponse } from '@/types/home/product.types';

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

export class ProductService extends ApiService {
  static async getProductsCategories(): Promise<ApiResponse<ProductCategoryResponse> | null> {
    try {
      const response = await this.get<ProductCategoryResponse>('product/items');
      return response;
    } catch (error) {
      return null;
    }
  }
}
