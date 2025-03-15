'use client';
import Image from 'next/image';
import SearchBox from '@/components/SearchBox';
import FoodCard from '@/components/FoodCard';
import CategoriesSwiper from '@/components/CategoriesSwiper';
import { getProductsNcategories } from './services/productService';
import { useEffect, useState } from 'react';
import { getCategoryNames, getItemsbyCategory } from './utils';
import { ProductCategoryResponse, ProductType } from './types/product.types';

export default function Home() {
  const [products, setProducts] = useState<ProductType[] | []>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsNcategories();
      const categoryNames = getCategoryNames(data) || [];

      if (categoryNames.length > 0) {
        setCategories(categoryNames);
        setCategory((prev) => prev || categoryNames[0]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      const fetchCategoryItems = async () => {
        const data: ProductCategoryResponse = await getProductsNcategories();
        setProducts(getItemsbyCategory(data, category));
      };
      fetchCategoryItems();
    }
  }, [category]);

  return (
    <div className="flex flex-col gap-8">
      {/* Banner Section */}
      <div className="relative flex h-28 w-full items-center justify-start px-4">
        <Image
          src="/assets/coffee-banner.webp"
          alt="Coffee shop"
          fill
          className="object-cover"
        />
        <div className="relative z-10 aspect-square h-full translate-y-1/5 overflow-hidden rounded-lg border-4 border-gray-400">
          <Image
            src="/assets/coffee-shop-logo.jpg"
            fill
            alt="restaurant logo"
          />
        </div>
      </div>

      {/* Name and Location */}
      <div className="flex flex-col px-4">
        <h3 className="text-heading">Coz Coffee</h3>
        <p className="text-description">Karama, Dubai</p>
      </div>

      {/* Search Box */}
      <div className="w-full px-4">
        <SearchBox />
      </div>

      {/* Categories Section */}
      <div className="categories-wrapper flex flex-col">
        <h2 className="text-primary px-4 pb-2">Categories</h2>
        {categories.length > 0 && (
          <CategoriesSwiper categories={categories} setCategory={setCategory} />
        )}
      </div>

      {/* Product List */}
      <div className="flex w-full flex-col px-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length > 0 ? (
          products.map((item) => (
            // <Link href={`/product/${item?._id}`}>
            <FoodCard key={item?._id} items={item} />
            //  </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
