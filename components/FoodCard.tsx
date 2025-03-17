'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import SpecialityTag from './atoms/SpecialityTag';
import { HugeiconsChefHat } from './Icons';
import ModelViewer from './modelViewer';
import { ProductType } from '@/app/types/product.types';
// import { IMAGE_URL } from '@/app/lib/axios';

export default function FoodCard({ items }: { items: ProductType }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maxChars = 80;

  const [isExpanded, setExpanded] = useState<boolean>(false);

  const shouldTruncate = items?.desc.length > maxChars;
  const displayText =
    isExpanded || !shouldTruncate
      ? items?.desc
      : items?.desc.slice(0, maxChars) + '...';

  return (
    <div
      ref={containerRef}
      className="grid h-max w-[100%] grid-cols-[auto_10rem] gap-[1rem] border-b-[1px] border-b-[#c2c2d2] py-[1rem]"
    >
      <div className="flex flex-col gap-[0.5rem]">
        <div className="flex items-center gap-[10px]">
          <div className="relative aspect-square h-[12px] w-[12px]">
            <Image src="/assets/veg.png" alt="veg food" fill />
          </div>
          <p className="text-body font-[600_!important]">{items?.name}</p>
        </div>

        <div>
          <p className={`text-description leading-tight text-gray-700`}>
            {displayText}
            {!isExpanded && (
              <button
                onClick={() => setExpanded(true)}
                className="inline bg-white pl-1 text-blue-500"
              >
                {shouldTruncate && 'Show More'}
              </button>
            )}
          </p>
        </div>

        <p className="text-body mt-auto flex items-center gap-1 font-[600_!important]">
          AED {items.offer_price}{' '}
          <span className="text-description text-[#c2c2c2] line-through">
            AED {items.actual_price}
          </span>
        </p>
      </div>

      <div className="relative aspect-square w-[10rem] rounded-[16px]">
        {items?.speciality && (
          <div className="absolute top-[4px] left-[4px] z-100">
            <SpecialityTag
              tag="Chef Special"
              icon={<HugeiconsChefHat color="#80ed99" />}
            />
          </div>
        )}
        <ModelViewer
          label={items?.name}
          ar-scale={'fixed'}
          poster={`https://menu.hackphiles.in/files/${items?.image}`}
          loading={'lazy'}
          auto-rotate
          // skybox-image="/assets/aft_lounge_1k.exr"
          camera-controls
          touch-action="pan-y="
          ios-src={`https://menu.hackphiles.in/files/${items?.three_usdz}`}
          ar
          src={`https://menu.hackphiles.in/files/${items?.three_glb}`}
          alt={items?.name}
        />
      </div>
    </div>
  );
}
