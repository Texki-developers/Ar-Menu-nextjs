import { IMAGE_URL } from '@/app/lib/axios';
import Image from 'next/image';
import React from 'react';

export default function SideFoodCard({ items }) {
  return (
    <div
      className="w-[100%] flex-none overflow-hidden rounded-[16px]"
      style={{ boxShadow: '0px 1px 4px 0px rgba(12,12,13,0.1)' }}
    >
      <div className="relative aspect-[1.5/1]">
        <Image src={IMAGE_URL+items?.image} fill alt="food" />
      </div>
      <div className="flex flex-col gap-[0.5rem] p-[0.5rem]">
        <h6 className="text-description font-[600!important] text-nowrap">
          {items?.name}
        </h6>
        <p className="text-small text-gray-500">AED {items?.actual_price}</p>
      </div>
    </div>
  );
}
