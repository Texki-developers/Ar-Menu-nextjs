import React from 'react';

const categories = [
  {
    title: 'Starters',
  },
  {
    title: 'Soups',
  },
  {
    title: 'Appetizer',
  },
  {
    title: 'Main Course',
  },
  {
    title: 'Pasta',
  },
  {
    title: 'Chinese',
  },
  {
    title: 'Desserts',
  },
];

export default function CategoriesSwiper() {
  return (
    <div className="categories-wrapper flex flex-nowrap gap-[8px] overflow-x-auto px-[1rem]">
      {categories.map((category, index) => (
        <button
          key={index}
          className="btn-secondary text-description text-nowrap"
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
