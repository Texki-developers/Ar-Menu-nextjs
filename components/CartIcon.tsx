'use client';

import React, { useEffect } from 'react';
import { useCartStore } from '@/config/store/cartStore';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const CartIcon = () => {
  const { totalItems, fetchCart } = useCartStore();
  const params = useParams();
  const itemCount = totalItems;

  useEffect(() => {
    // Fetch cart data when component mounts
    fetchCart();
  }, [fetchCart]);
  // Safely get lang and vendorId with fallbacks
  const lang = params?.lang || 'en';
  const vendorId = params?.vendorId || '';

  return (
    <div className="relative">
      <Link
        href={`/${lang}/${vendorId}/cart`}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200"
        aria-label="Shopping Cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-10 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </Link>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
