'use client';

import React from 'react';
import { useCartStore } from '@/config/store/cartStore';
import { ProductType } from '@/types/home/product.types';

interface AddToCartButtonProps {
  product: ProductType;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = '',
}) => {
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product._id);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex w-full justify-center rounded-lg bg-black px-4 py-3 text-base font-semibold text-white transition-all hover:bg-[rgba(0,0,0,0.8)] hover:shadow-md ${className}`}
      aria-label="Add to cart"
    >
      <span className="font-bold">Add to Cart</span>
    </button>
  );
};

export default AddToCartButton;
