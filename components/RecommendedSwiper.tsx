'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import SideFoodCard from './SideFoodCard';

export default function RecommendedSwiper() {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        freeMode
        modules={[FreeMode]}
        className="w-full"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <SwiperSlide key={i} className="w-auto">
            <SideFoodCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
