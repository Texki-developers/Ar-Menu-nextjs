import { ProductType } from '@/types/home/product.types';
import FoodCard from '../card/FoodCard';
import React from 'react';

interface Props {
  products: ProductType[];
}

const CardWrapper = ({ products }: Props) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products available.</p>;
  }
  return products.map((item) => <FoodCard key={item._id} items={item} />);
};

export default React.memo(CardWrapper);
