'use client';

import React from 'react';
import { useCartStore } from '@/config/store/cartStore';
import { ProductType } from '@/types/home/product.types';
import QuantityUpdater from './QuantityUpdater';
import { Button } from '../ui/button';

interface AddToCartButtonProps {
  product: ProductType;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
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
    <div>
      <Button variant="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCartButton;
