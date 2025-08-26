import axios from '../axios';

export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  imageUrl: string;
  variantId?: string;
  customizations?: Array<{ name: string; value: string }>;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    currency: string;
  };
}

export const getCart = async (): Promise<CartResponse> => {
  const response = await axios.get('/cart');
  return response.data;
};

export const addToCart = async (
  productId: string,
  quantity: number = 1,
  variantId?: string,
  customizations?: Array<{ name: string; value: string }>
): Promise<CartResponse> => {
  const response = await axios.post('/cart/add', {
    productId,
    quantity,
    variantId,
    customizations,
  });
  return response.data;
};

export const updateCartItem = async (
  cartItemId: string,
  quantity: number
): Promise<CartResponse> => {
  const response = await axios.put(`/cart/update/${cartItemId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (
  cartItemId: string
): Promise<CartResponse> => {
  const response = await axios.delete(`/cart/remove/${cartItemId}`);
  return response.data;
};

export const clearCart = async (): Promise<CartResponse> => {
  const response = await axios.post('/cart/clear');
  return response.data;
};
