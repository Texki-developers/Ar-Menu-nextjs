'use client';

import React from 'react';
import { useCartStore } from '@/config/store/cartStore';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

const CartIcon = () => {
  const { totalItems } = useCartStore();
  const params = useParams();
  const itemCount = totalItems;

  // Safely get lang and vendorId with fallbacks
  const lang = params?.lang || 'en';
  const vendorId = params?.vendorId || '';

  return (
    <div className="relative">
      <Link
        href={`/${lang}/${vendorId}/cart`}
        className="bg-primary-100 hover:bg-primary-200 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="h-8 w-8 text-gray-600" />
      </Link>
      {itemCount > 0 && (
        <span className="bg-primary-500 absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
