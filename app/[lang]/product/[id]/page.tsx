'use client';

import { getProductsById } from '@/core/services/productService';
import { ProductType } from '@/types/home/product.types';
import FoodTypeImage from '@/components/FoodType';
import { MageBox3dDownload } from '@/components/Icons';
import ProductImageSwiper from '@/components/ProductImageSwiper';
import RecommendedSwiper from '@/components/RecommendedSwiper';
import SpecialityTag from '@/components/atoms/SpecialtyTag';
import Tag from '@/components/atoms/Tag';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await getProductsById(id as string);
      setData(response?.data || null);
      setLoading(false);
    };
    getProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-[2rem]">
        <Skeleton height={300} />

        <div className="z-100 mt-[-4rem] flex flex-col gap-[1.5rem] rounded-t-[32px] bg-white p-[1rem]">
          <div className="px-[1rem]">
            <Skeleton width={120} height={20} />
            <Skeleton width={200} height={24} />
          </div>

          <Skeleton count={3} />

          <div className="flex flex-wrap gap-[0.5rem]">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={80} height={20} />
            ))}
          </div>

          <Skeleton width={150} height={20} />
          <Skeleton height={150} />

          <div className="fixed bottom-0 left-0 flex h-[4rem] w-[100%] items-center justify-between bg-white px-[1rem]">
            <Skeleton width={100} height={20} />
            <Skeleton width={120} height={40} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[2rem]">
      <ProductImageSwiper image={data?.image as string} />

      <div className="z-100 mt-[-4rem] flex flex-col gap-[1.5rem] rounded-t-[32px] bg-white p-[1rem]">
        <div className="flex flex-col gap-[1rem]">
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
            data.recipes.map(recipe => <Tag key={recipe} text={recipe} />)
          ) : (
            <p className="text-gray-500">No recipes available.</p>
          )}
        </div>

        {(data?.recommended_sides?.length ?? 0) > 0 && (
          <div className="flex w-full flex-col gap-[1rem] overflow-x-auto">
            {' '}
            <h2 className="text-primary">Recommended Sides</h2>{' '}
            <RecommendedSwiper items={data?.recommended_sides || []} />
          </div>
        )}

        <div className="fixed bottom-0 left-0 flex h-[4rem] w-[100%] items-center justify-between bg-white px-[1rem]">
          <p className="text-body flex h-max items-center gap-1 font-[600_!important]">
            AED {data?.offer_price ?? 'N/A'}{' '}
            {data?.actual_price && (
              <span className="text-description text-[#c2c2c2] line-through">
                AED {data.actual_price}
              </span>
            )}
          </p>
          <button className="btn-primary text-description flex items-center gap-[0.5rem] rounded-full p-3 font-[600] text-white">
            <MageBox3dDownload className="text-[1rem]" />
            <span>View in Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}
