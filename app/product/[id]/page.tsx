import { HugeiconsChefHat, MageBox3dDownload } from '@/components/Icons';
import ProductImageSwiper from '@/components/ProductImageSwiper';
import RecommendedSwiper from '@/components/RecommendedSwiper';
import SideFoodCard from '@/components/SideFoodCard';
import SpecialityTag from '@/components/atoms/SpecialityTag';
import Tag from '@/components/atoms/Tag';
import React from 'react';

const recipes = [
  'Fresh Fettuccine',
  'Black Truffle Oil',
  'Wild Mushrooms',
  'Heavy Cream',
  'Parmesan',
  'Fresh Thyme',
  'Garlic',
];

export default function Product({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-[2rem]">
      <ProductImageSwiper />

      <div className="mt-[-4rem] flex flex-col gap-[1.5rem] rounded-t-[32px] bg-white p-[1rem] z-100">
        <div className="flex flex-col gap-[1rem] px-[1rem]">
          <div className="flex gap-[1rem]">
            <SpecialityTag
              variant="dark"
              tag="Chef Special"
              icon={<HugeiconsChefHat color="#80ed99" />}
            />
          </div>
          <h2 className="text-large">Truffle Mushroom Pasta</h2>
        </div>

        <p className="text-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis saepe
          suscipit sed iure voluptatum numquam laborum obcaecati molestiae
          necessitatibus ipsum.
        </p>

        <div className="flex flex-wrap gap-[0.5rem]">
          {recipes.map((recipe) => (
            <Tag text={recipe} />
          ))}
        </div>

        <div className="flex w-full flex-col gap-[1rem] overflow-x-auto">
          <h2 className="text-primary">Recommended Sides</h2>
          <RecommendedSwiper />
        </div>

        <div className="fixed bottom-0 left-0 z-100 flex h-[4rem] w-[100%] items-center justify-between border-y-[1px] border-y-[rgba(117,107,107,0.3)] bg-white px-[1rem]">
          <p className="text-body flex h-max items-center gap-1 font-[600_!important]">
            AED 100{' '}
            <span className="text-description text-[#c2c2c2] line-through">
              AED 150
            </span>
          </p>
          <button className="btn-primary text-descriptionflex flex items-center gap-[0.5rem] rounded-full font-[600] text-white">
            <MageBox3dDownload className="text-[1rem]" />
            <span>View in Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}
