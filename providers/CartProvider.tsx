'use client';

import React from 'react';
import { useCartStore } from '@/config/store/cartStore';

export function CartProvider({ children }: { children: React.ReactNode }) {
  // This will initialize the cart store when the provider mounts
  useCartStore();
  return <>{children}</>;
}
