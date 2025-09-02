'use client';

import React from 'react';
import { useCartStore } from '@/config/store/cartStore';
import { ProductType } from '@/types/home/product.types';
import QuantityUpdater from './QuantityUpdater';

interface AddToCartButtonProps {
  product: ProductType;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = '',
}) => {
  const { addToCart, items } = useCartStore();
  const cartItem = items.find(item => item._id === product._id);
  const isInCart = !!cartItem;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleIncrement = () => {
    addToCart(product, 1);
  };

  const handleDecrement = () => {
    addToCart(product, -1);
  };

  if (isInCart) {
    return (
      <QuantityUpdater
        quantity={cartItem.quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        variant="compact"
        size="sm"
        className="text-black"
      />
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`bg-black btn-primary flex w-full justify-center rounded-lg px-4 py-2 text-base font-semibold text-white transition-all hover:shadow-md ${className}`}
      aria-label="Add to cart"
    >
      <span className="font-bold">Add to Cart</span>
    </button>
  );
};

export default AddToCartButton;
