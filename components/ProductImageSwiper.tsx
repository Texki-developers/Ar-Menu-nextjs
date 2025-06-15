'use client';

import Image from 'next/image';
import { MaterialSymbolsLightArrowLeftAltRounded } from './Icons';
import Link from 'next/link';
import { IMAGE_URL } from '@/core/axios';

export default function ProductImageSwiper({ image }: { image: string }) {
  return (
    <div className="relative aspect-[375/240] w-[100%]">
      <Link
        href="/"
        className="absolute top-[15px] left-[15px] z-200 grid aspect-square h-[40px] w-[40px] place-items-center rounded-full bg-[rgba(255,255,255,0.31)] shadow-2xl backdrop-blur-sm"
      >
        <MaterialSymbolsLightArrowLeftAltRounded fontSize="3rem" />
      </Link>
      <Image objectFit='cover' src={`${IMAGE_URL}${image}`} fill alt="cafe coffee" />
    </div>
  );
}
