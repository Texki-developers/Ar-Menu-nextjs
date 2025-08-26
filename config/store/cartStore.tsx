import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as cartService from '@/core/services/cartService';

export type { CartItem } from '@/core/services/cartService';

interface CartState {
  items: cartService.CartItem[];
  loading: boolean;
  error: string | null;
  cartId: string | null;
  subtotal: number;
  totalItems: number;
  currency: string;
}

interface CartActions {
  // Actions
  addToCart: (
    productId: string,
    quantity?: number,
    variantId?: string,
    customizations?: Array<{ name: string; value: string }>
  ) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  // Reset state (for logout)
  reset: () => void;
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      loading: false,
      error: null,
      cartId: null,
      subtotal: 0,
      totalItems: 0,
      currency: 'AED',

      // Actions
      fetchCart: async () => {
        try {
          set({ loading: true, error: null });
          const response = await cartService.getCart();
          if (response.success && response.data) {
            set({
              items: response.data.items || [],
              cartId: response.data._id,
              subtotal: response.data.subtotal,
              totalItems: response.data.totalItems,
              currency: response.data.currency || 'AED',
              loading: false,
            });
          } else {
            set({
              error: response.message || 'Failed to fetch cart',
              loading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || 'Failed to fetch cart',
            loading: false,
          });
        }
      },

      addToCart: async (
        productId: string,
        quantity: number = 1,
        variantId?: string,
        customizations?: Array<{ name: string; value: string }>
      ) => {
        try {
          set({ loading: true, error: null });
          const response = await cartService.addToCart(
            productId,
            quantity,
            variantId,
            customizations
          );
          if (response.success && response.data) {
            set({
              items: response.data.items || [],
              cartId: response.data._id,
              subtotal: response.data.subtotal,
              totalItems: response.data.totalItems,
              currency: response.data.currency || 'USD',
              loading: false,
            });
          } else {
            throw new Error(response.message || 'Failed to add item to cart');
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Failed to add item to cart';
          set({
            error: errorMessage,
            loading: false,
          });
          throw new Error(errorMessage);
        }
      },

      updateQuantity: async (cartItemId: string, quantity: number) => {
        if (quantity < 1) {
          await get().removeFromCart(cartItemId);
          return;
        }

        try {
          set({ loading: true, error: null });
          const response = await cartService.updateCartItem(
            cartItemId,
            quantity
          );
          if (response.success && response.data) {
            set({
              items: response.data.items || [],
              subtotal: response.data.subtotal,
              totalItems: response.data.totalItems,
              currency: response.data.currency || 'USD',
              loading: false,
            });
          } else {
            throw new Error(response.message || 'Failed to update cart item');
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Failed to update cart item';
          set({
            error: errorMessage,
            loading: false,
          });
          throw new Error(errorMessage);
        }
      },

      removeFromCart: async (cartItemId: string) => {
        try {
          set({ loading: true, error: null });
          const response = await cartService.removeFromCart(cartItemId);
          if (response.success && response.data) {
            set({
              items: response.data.items || [],
              subtotal: response.data.subtotal,
              totalItems: response.data.totalItems,
              currency: response.data.currency || 'USD',
              loading: false,
            });
          } else {
            throw new Error(
              response.message || 'Failed to remove item from cart'
            );
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Failed to remove item from cart';
          set({
            error: errorMessage,
            loading: false,
          });
          throw new Error(errorMessage);
        }
      },

      clearCart: async () => {
        try {
          set({ loading: true, error: null });
          const response = await cartService.clearCart();
          if (response.success) {
            set({
              items: [],
              cartId: null,
              subtotal: 0,
              totalItems: 0,
              loading: false,
            });
          } else {
            throw new Error(response.message || 'Failed to clear cart');
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Failed to clear cart';
          set({
            error: errorMessage,
            loading: false,
          });
          throw new Error(errorMessage);
        }
      },

      // Getters are now part of the state
      // We keep them for backward compatibility
      getTotalItems: () => get().totalItems,
      getSubtotal: () => get().subtotal,

      // Reset state (for logout)
      reset: () => {
        set({
          items: [],
          cartId: null,
          loading: false,
          error: null,
          subtotal: 0,
          totalItems: 0,
          currency: 'AED',
        });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage), // Using localStorage for persistence
      partialize: state => ({
        // Persist all cart data except loading/error states
        items: state.items,
        cartId: state.cartId,
        subtotal: state.subtotal,
        totalItems: state.totalItems,
        currency: state.currency,
      }),
    }
  )
);
