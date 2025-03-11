import Image from 'next/image';
import SearchBox from '@/components/SearchBox';
import FoodCard from '@/components/FoodCard';
import CategoriesSwiper from '@/components/CategoriesSwiper';

export default function Home() {
  return (
    <div className="flex flex-col gap-[2rem]">
      {/* Banner Part */}
      <div className="relative flex h-[7rem] w-[100%] items-center justify-start px-[1rem]">
        <Image
          src="/assets/coffee-banner.webp"
          alt="Coffee shop"
          fill
          className="object-cover"
        />
        <div className="relative z-10 aspect-square h-[100%] transform-[translateY(20%)] overflow-hidden rounded-[16px] border-[3px] border-[#a7a7a7]">
          <Image
            src="/assets/coffee-shop-logo.jpg"
            fill
            alt="restaurant logo"
          />
        </div>
      </div>

      {/* Name and Location */}
      <div className="flex flex-col px-[1rem]">
        <h3 className="text-heading">Coz Coffee</h3>
        <p className="text-description">Karama, Dubai</p>
      </div>

      <div className="w-[100%] px-[1rem]">
        <SearchBox />
      </div>

      <div className="flex flex-col categories-wrapper">
        <h2 className="text-primary px-[1rem] pb-[0.5rem]">Categories</h2>
        <CategoriesSwiper />
      </div>

      <div className="flex w-[100%] flex-col px-[1rem]">
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </div>
    </div>
  );
}
