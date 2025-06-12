import api from './axios';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export class ApiService {
  static async post<T, U>(url: string, body: T): Promise<ApiResponse<U>> {
    const response = await api.get(url);
    return response.data;
  }
  static async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await api.get(url);
    return response.data;
  }
}
