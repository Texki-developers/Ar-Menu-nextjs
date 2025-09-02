import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductType } from '@/types/home/product.types';

// Define CartItem type locally since we're not using the service anymore
export interface CartItem {
  _id: string;
  product: ProductType;
  quantity: number;
  variantId?: string;
  customizations?: Array<{ name: string; value: string }>;
  price: number; // Store the price at the time of adding to cart
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  subtotal: number;
  totalItems: number;
  currency: string;
}

interface CartActions {
  // Actions
  addToCart: (
    product: ProductType,
    quantity?: number,
    variantId?: string,
    customizations?: Array<{ name: string; value: string }>
  ) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
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
      subtotal: 0,
      totalItems: 0,
      currency: 'AED',

      // Actions
      addToCart: (
        product: ProductType,
        quantity: number = 1,
        variantId?: string,
        customizations?: Array<{ name: string; value: string }>
      ) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => item._id === product._id
        );

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...items];
          const newQuantity =
            updatedItems[existingItemIndex].quantity + quantity;

          if (newQuantity <= 0) {
            // Remove item if quantity becomes 0 or negative
            get().removeFromCart(product._id);
            return;
          }

          updatedItems[existingItemIndex].quantity = newQuantity;

          // Update the cart state
          const newSubtotal = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const newTotalItems = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          set({
            items: updatedItems,
            subtotal: newSubtotal,
            totalItems: newTotalItems,
            loading: false,
            error: null,
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            _id: product._id,
            product,
            quantity,
            variantId,
            customizations,
            price: product.offer_price || product.actual_price,
          };

          const updatedItems = [...items, newItem];
          const newSubtotal = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const newTotalItems = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          set({
            items: updatedItems,
            subtotal: newSubtotal,
            totalItems: newTotalItems,
            loading: false,
            error: null,
          });
        }
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeFromCart(productId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map(item =>
          item._id === productId ? { ...item, quantity } : item
        );

        const newSubtotal = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const newTotalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        set({
          items: updatedItems,
          subtotal: newSubtotal,
          totalItems: newTotalItems,
          loading: false,
          error: null,
        });
      },

      removeFromCart: (productId: string) => {
        const { items } = get();
        const updatedItems = items.filter(item => item._id !== productId);

        const newSubtotal = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const newTotalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        set({
          items: updatedItems,
          subtotal: newSubtotal,
          totalItems: newTotalItems,
          loading: false,
          error: null,
        });
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          totalItems: 0,
          loading: false,
          error: null,
        });
      },

      // Reset state (for logout)
      reset: () => {
        set({
          items: [],
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
      storage: createJSONStorage(() => sessionStorage), // Using sessionStorage for persistence
      partialize: state => ({
        // Persist all cart data except loading/error states
        items: state.items,
        subtotal: state.subtotal,
        totalItems: state.totalItems,
        currency: state.currency,
      }),
    }
  )
);
