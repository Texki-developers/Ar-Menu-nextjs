'use client';

import Image from 'next/image';
import { MaterialSymbolsLightArrowLeftAltRounded } from './Icons';

export default function ProductImageSwiper() {
  return (
    <div className="relative aspect-[375/240] w-[100%]">
      <div className="absolute top-[5px] left-[5px] z-200 aspect-square rounded-full bg-[rgba(255,255,255,0.5)] backdrop-blur-md">
        <MaterialSymbolsLightArrowLeftAltRounded fontSize="3rem" />
      </div>
      <Image src="/assets/food.jpeg" fill alt="cafe coffee" />
    </div>
  );
}
