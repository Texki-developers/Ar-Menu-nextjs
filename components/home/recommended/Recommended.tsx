import { ProductCategoryResponse } from '@/types/home/product.types';
import React, { useState } from 'react';
import CardWrapper from '../card-wrapper/CardWrapper';
import DropDownIcon from '@/public/assets/svg/dropdown-icon';

const Recommended = ({ products }: { products: ProductCategoryResponse }) => {
  const [showAll, setShowAll] = useState(true);
  return (
    products?.recommendedProducts?.length > 0 && (
      <div className="flex w-full flex-col px-4">
        <div
          onClick={() => setShowAll(!showAll)}
          className={`flex cursor-pointer items-center justify-between ${showAll ? '' : 'border-b'} border-b-[#c2c2d2]`}
        >
          <h2 className={`text-primary py-3 capitalize`}>
            Recommended{' '}
            <span className="text-md text-gray-500">
              ({products?.recommendedProducts?.length})
            </span>
          </h2>
          <div className={`${!showAll ? 'rotate-180' : ''}`}>
            <DropDownIcon />
          </div>
        </div>
        {showAll && <CardWrapper products={products?.recommendedProducts} />}
      </div>
    )
  );
};

export default Recommended;
