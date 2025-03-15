import React from 'react';

export default function CategoriesSwiper({ categories, setCategory }) {
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
