'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import SideFoodCard from './SideFoodCard';
import { ProductType } from '@/types/home/product.types';

export default function RecommendedSwiper({ items }: { items: ProductType[] }) {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        freeMode
        modules={[FreeMode]}
        className="w-full"
      >
        {items &&
          items.map(sides => (
            <SwiperSlide key={sides?._id} className="w-auto">
              <SideFoodCard items={sides} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
