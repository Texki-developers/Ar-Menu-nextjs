'use client';

import Image from 'next/image';
import { MaterialSymbolsLightArrowLeftAltRounded } from './Icons';
import Link from 'next/link';
import { IMAGE_URL } from '@/app/lib/axios';

export default function ProductImageSwiper({ image }: { image: string }) {
  console.log(image, 'image');
  return (
    <div className="relative aspect-[375/240] w-[100%]">
      <Link
        href="/"
        className="absolute top-[5px] left-[5px] z-200 aspect-square rounded-full bg-[rgba(255,255,255,0.5)] backdrop-blur-md"
      >
        <MaterialSymbolsLightArrowLeftAltRounded fontSize="3rem" />
      </Link>
      <Image src={`${IMAGE_URL}${image}`} fill alt="cafe coffee" />
    </div>
  );
}
