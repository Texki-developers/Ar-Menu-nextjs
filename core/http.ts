import api from './axios';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export class ApiService {
  static async post<T, U>(
    url: string,
    body: T
  ): Promise<ApiResponse<U> | null> {
    try {
      const response = await api.post(url, body);
      return response.data;
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
  static async get<T>(url: string): Promise<ApiResponse<T> | null> {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
}
