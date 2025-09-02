'use client';

import React, { useRef } from 'react';
import ModelViewer from '../../modelViewer';
import { ProductType } from '@/types/home/product.types';
import Link from 'next/link';
import FoodTypeImage from '../../FoodType';
import 'react-loading-skeleton/dist/skeleton.css';
import SpecialtyTag from '../../atoms/SpecialtyTag';
import { IMAGE_URL } from '@/core/axios';
import { useParams } from 'next/navigation';
import AddToCartButton from '../../atoms/AddToCartButton';

export default function FoodCard({
  items,
  type,
}: {
  items: ProductType;
  type?: 'category' | 'search' | 'recommended';
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const modelRef = useRef(null);

  const { lang, vendorId } = useParams();
  const bannerUrl = `https://ar-menu-dev.netlify.app/api/banner?title=${encodeURIComponent(items?.name)}_${100}_${20}_${30}_${12}`;
  return (
    <div
      ref={containerRef}
      className="grid h-max w-[100%] grid-cols-[auto_10rem] items-end gap-[1rem] border-b-[1px] border-b-[#c2c2d2] py-[1rem]"
    >
      <Link
        href={`/${lang}/${vendorId}/product/${items?._id}/`}
        className="flex flex-col gap-[0.5rem]"
        prefetch
      >
        <div className="flex items-center gap-[10px]">
          <div className="relative aspect-square h-[12px] w-[12px]">
            <FoodTypeImage foodType={items?.food_type} />
          </div>
          <p className="text-body font-[600_!important]">{items?.name}</p>
        </div>

        <div>
          <p className="text-description leading-tight text-gray-700">
            {items?.desc?.length > 50
              ? items?.desc?.slice(0, 50) + '...'
              : items?.desc}
          </p>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <p className="text-body flex items-center gap-1 font-[600_!important]">
            AED {items.offer_price}{' '}
            {items.offer_price < items.actual_price && (
              <span className="text-description text-[#c2c2c2] line-through">
                AED {items.actual_price}
              </span>
            )}
          </p>
          <AddToCartButton product={items} />
        </div>
      </Link>

      <div className="relative aspect-square w-[10rem] rounded-[16px]">
        {items?.speciality && (
          <div className="absolute top-[4px] left-[4px] z-100">
            <SpecialtyTag tag={items?.speciality} />
          </div>
        )}
        <ModelViewer
          ref={modelRef}
          label={items?.name}
          type={type}
          loading="lazy"
          showButton
          style={{
            width: '160px',
            background: 'linear-gradient(180deg, #ffe2e2 0%, #ffc3a0 100%)',
            borderRadius: '10px',
            height: '160px',
          }}
          auto-rotate
          key={items?._id}
          containerStyle={{
            minWidth: '160px',
            minHeight: '160px',
          }}
          camera-controls
          ar-modes="scene-viewer quick-look"
          touch-action="pan-y"
          ios-src={`${IMAGE_URL}${items?.three_usdz}#custom=${encodeURIComponent(bannerUrl)}&customHeight=large`}
          ar
          src={`${IMAGE_URL}${items?.three_glb}`}
          alt={items?.name}
        />
      </div>
    </div>
  );
}
