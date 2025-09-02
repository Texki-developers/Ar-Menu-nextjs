import Image from 'next/image';
import React from 'react';
import { IVendorDetails } from '@/types/home/product.types';
import { IMAGE_URL } from '@/core/axios';
import Title from '../title/Title';

const HomeBanner = ({ vendorDetails }: { vendorDetails: IVendorDetails }) => {
  return (
    <>
      <div className="relative">
        <div className="relative flex h-50 w-full items-center justify-start overflow-hidden rounded-b-3xl px-4">
          <Image
            src={IMAGE_URL + vendorDetails?.banner}
            alt="Coffee shop"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute top-10 left-4 z-10 aspect-square h-30 translate-y-1/2 overflow-hidden rounded-lg border-4 border-gray-400 bg-black/10 backdrop-blur-sm">
          <Image
            src={IMAGE_URL + vendorDetails?.logo}
            fill
            alt="restaurant logo"
            className="object-cover"
          />
        </div>
      </div>
      <Title title={vendorDetails?.name} subtitle={vendorDetails?.location} />
    </>
  );
};

export default HomeBanner;
