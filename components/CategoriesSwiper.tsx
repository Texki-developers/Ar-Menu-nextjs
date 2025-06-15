import useProductStore from '@/config/store/productStore';
import React, { useEffect } from 'react';

export default function CategoriesSwiper({
  categories,
}: {
  categories: string[];
}) {
  const { selectedCategory, setSelectedCategory } = useProductStore();

  useEffect(() => {
    const item = document.getElementById(`category-${selectedCategory}`);
    if (item) {
      item.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCategory]);
  
  return (
    <div className="categories-wrapper flex flex-nowrap gap-[8px] overflow-x-auto px-[1rem]">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => {
            if (category === selectedCategory) {
              setSelectedCategory('');
            } else {
              setSelectedCategory(category);
            }
          }}
          className={`btn-secondary${selectedCategory === category ? '-active' : ''} text-description capitalize text-nowrap`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
