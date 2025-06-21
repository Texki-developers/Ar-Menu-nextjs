import DropDownIcon from '@/public/assets/svg/dropdown-icon';
import FoodCard from '../card/FoodCard';
import { CategorizedType } from '@/types/home/product.types';
import React, { useEffect, useState } from 'react';
import useProductStore from '@/config/store/productStore';

interface Props {
  category: CategorizedType;
}

const CategorySection = ({ category }: Props) => {
  const [showAll, setShowAll] = useState(true);
  const { selectedCategory } = useProductStore();
  if (!category || !category.products || category.products.length === 0) {
    return null;
  }

  useEffect(() => {
    if (selectedCategory === category.category.name) {
      setShowAll(true);
    }
  }, [selectedCategory, category]);

  return (
    <div
      id={`category-${category.category.name}`}
      key={category.category._id}
      className="mb-4"
    >
      <div
        onClick={() => setShowAll(!showAll)}
        className={`flex cursor-pointer items-center justify-between ${showAll ? '' : 'border-b'} border-b-[#c2c2d2]`}
      >
        <h2
          className={`text-primary py-2 capitalize ${selectedCategory === category.category.name ? 'text-primary-300' : ''}`}
        >
          {category.category.name}{' '}
          <span className="text-md text-gray-500">
            ({category?.products?.length})
          </span>
        </h2>
        <div className={`${!showAll ? 'rotate-180' : ''}`}>
          <DropDownIcon />
        </div>
      </div>
      {showAll &&
        category.products.map(item => (
          <FoodCard type={'category'} key={item._id} items={item} />
        ))}
    </div>
  );
};

export default React.memo(CategorySection);
