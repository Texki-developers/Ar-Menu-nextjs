import React, { Dispatch, SetStateAction } from 'react';

export default function CategoriesSwiper({
  categories,
  setCategory,
}: {
  categories: string[];
  setCategory: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <div className="categories-wrapper flex flex-nowrap gap-[8px] overflow-x-auto px-[1rem]">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => setCategory(category)}
          className="btn-secondary text-description text-nowrap"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
