import Image from 'next/image';
import React from 'react';
import { IVendorDetails } from '@/types/home/product.types';
import { IMAGE_URL } from '@/core/axios';
import Title from '../title/Title';

const HomeBanner = ({ vendorDetails }: { vendorDetails: IVendorDetails }) => {
  return (
    <>
      <div>
        <div className="relative flex h-28 w-full items-center justify-start px-4">
          <Image
            src={IMAGE_URL + vendorDetails?.banner}
            alt="Coffee shop"
            fill
            className="object-cover"
          />
          <div className="relative z-10 aspect-square h-full translate-y-1/5 overflow-hidden rounded-lg border-4 border-gray-400">
            <Image
              src={IMAGE_URL + vendorDetails?.logo}
              fill
              alt="restaurant logo"
            />
          </div>
        </div>
      </div>
      <Title title={vendorDetails?.name} subtitle={vendorDetails?.location} />
    </>
  );
};

export default HomeBanner;
