'use client';

import { getProductsById } from '@/app/services/productService';
import { ProductType } from '@/app/types/product.types';
import FoodTypeImage from '@/components/FoodType';
import { MageBox3dDownload } from '@/components/Icons';
import ProductImageSwiper from '@/components/ProductImageSwiper';
import RecommendedSwiper from '@/components/RecommendedSwiper';
import SpecialityTag from '@/components/atoms/SpecialityTag';
import Tag from '@/components/atoms/Tag';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState<ProductType | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await getProductsById(id as string);
      console.log(response, 'resss');
      setData(response?.data || null);
    };
    getProducts();
  }, [id]);
  console.log(data, 'THE DATA');
  return (
    <div className="flex flex-col gap-[2rem]">
      <ProductImageSwiper image={data?.image as string} />

      <div className="z-100 mt-[-4rem] flex flex-col gap-[1.5rem] rounded-t-[32px] bg-white p-[1rem]">
        <div className="flex flex-col gap-[1rem] px-[1rem]">
          <div className="flex gap-[1rem]">
            {data?.speciality && (
              <SpecialityTag variant="dark" tag={data?.speciality} />
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative aspect-square h-[12px] w-[12px]">
              <FoodTypeImage foodType={data?.food_type} />
            </div>
            <h2 className="text-large">{data?.name || 'Product Name'}</h2>
          </div>
        </div>

        <p className="text-description">
          {data?.desc || 'No description available.'}
        </p>

        <div className="flex flex-wrap gap-[0.5rem]">
          {data?.recipes?.length ? (
            data.recipes.map((recipe) => <Tag key={recipe} text={recipe} />)
          ) : (
            <p className="text-gray-500">No recipes available.</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-[1rem] overflow-x-auto">
          <h2 className="text-primary">Recommended Sides</h2>
          {data?.recommended_sides?.length ? (
            <RecommendedSwiper items={data?.recommended_sides || []} />
          ) : (
            <p className="text-gray-500">No recommended sides available.</p>
          )}
        </div>

        <div className="fixed bottom-0 left-0 z-100 flex h-[4rem] w-[100%] items-center justify-between border-y-[1px] border-y-[rgba(117,107,107,0.3)] bg-white px-[1rem]">
          <p className="text-body flex h-max items-center gap-1 font-[600_!important]">
            AED {data?.offer_price ?? 'N/A'}{' '}
            {data?.actual_price && (
              <span className="text-description text-[#c2c2c2] line-through">
                AED {data.actual_price}
              </span>
            )}
          </p>
          <button
            slot="ar-button"
            className="btn-primary text-description flex items-center gap-[0.5rem] rounded-full font-[600] text-white"
          >
            <MageBox3dDownload className="text-[1rem]" />
            <span>View in Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}
