import React, { Dispatch, SetStateAction } from 'react';

export default function CategoriesSwiper({
  categories,
  selectedCategory,
  setCategoriesSelection,
}: {
  categories: string[];
  selectedCategory: string;
  setCategoriesSelection: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="categories-wrapper flex flex-nowrap gap-[8px] overflow-x-auto px-[1rem]">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => {
            if (category === selectedCategory) {
              setCategoriesSelection('');
            } else {
              setCategoriesSelection(category);
            }
          }}
          className={`btn-secondary${selectedCategory === category ? '-active' : ''} text-description text-nowrap`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
