'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import SpecialityTag from './atoms/SpecialityTag';
import { HugeiconsChefHat, MageBox3dDownload } from './Icons';

export default function FoodCard({
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quo dolores dolorum voluptatum quam non rem excepturi sit, vitae iste.',
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maxChars = 80;

  const [isExpanded, setExpanded] = useState<boolean>(false);

  const shouldTruncate = description.length > maxChars;
  const displayText =
    isExpanded || !shouldTruncate
      ? description
      : description.slice(0, maxChars) + '...';

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
          <p className="text-body font-[600_!important]">Chicken Dynamite</p>
        </div>

        <div>
          <p className={`text-description leading-tight text-gray-700`}>
            {displayText}
            {!isExpanded && (
              <button
                onClick={() => setExpanded(true)}
                className="inline bg-white pl-1 text-blue-500"
              >
                Show More
              </button>
            )}
          </p>
        </div>

        <p className="text-body mt-auto flex items-center gap-1 font-[600_!important]">
          AED 100{' '}
          <span className="text-description text-[#c2c2c2] line-through">
            AED 150
          </span>
        </p>
      </div>

      <div className="relative aspect-square w-[10rem] rounded-[16px]">
        <div className="absolute top-[4px] left-[4px] z-100">
          <SpecialityTag
            tag="Chef Special"
            icon={<HugeiconsChefHat color="#80ed99" />}
          />
        </div>
        <button className="btn-primary text-description absolute right-0 bottom-0 z-100 flex transform-[translate(5px,5px)] gap-[0.5rem] rounded-full font-[600] text-white">
          <MageBox3dDownload className="text-[1rem]" />
          <span>View in Table</span>
        </button>
        <Image
          src="/assets/food.jpeg"
          className="rounded-[16px]"
          fill
          alt="food-cafe"
        />
      </div>
    </div>
  );
}
