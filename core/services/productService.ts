import api from '@/core/axios';
import { ApiResponse, ApiService } from '../http';
import {
  IVendorDetails,
  ProductCategoryResponse,
} from '@/types/home/product.types';

export const getProductsCategories = async () => {
  try {
    const response = await api?.get('product/items');
    return response.data.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const getProductsById = async (id: string, vendorId: string) => {
  try {
    const response = await api?.get(`product/items/${id}?vendorId=${vendorId}`);
    return response.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const searchProducts = async (name: string) => {
  const response = await api?.get(`product/items/search?name=${name}`);
  return response.data;
};

export class ProductService extends ApiService {
  static async getProductsCategories(
    vendorId: string
  ): Promise<ApiResponse<ProductCategoryResponse> | null> {
    try {
      const response = await this.get<ProductCategoryResponse>(
        `product/items?vendorId=${vendorId}`
      );
      return response;
    } catch (error) {
      return null;
    }
  }

  static async getVendorDetails(
    vendorId: string
  ): Promise<ApiResponse<IVendorDetails> | null> {
    try {
      const response = await this.get<IVendorDetails>(
        `product/items/vendor/${vendorId}`
      );
      return response;
    } catch (error) {
      return null;
    }
  }
}
