'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import SearchBox from '@/components/SearchBox';
import FoodCard from '@/components/FoodCard';
import CategoriesSwiper from '@/components/CategoriesSwiper';
import { getProductsNcategories } from './services/productService';
import {
  CategorisedType,
  ProductCategoryResponse,
  ProductType,
} from './types/product.types';

// Utility function to render product cards
const renderProductCards = (products: ProductType[]) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products available.</p>;
  }
  return products.map((item) => <FoodCard key={item._id} items={item} />);
};

// Utility function to render category sections
const renderCategorySection = (category: CategorisedType) => {
  if (!category || !category.products || category.products.length === 0) {
    return null;
  }
  return (
    <div key={category.category._id} className="mb-4">
      <h2 className="text-primary pb-2">{category.category.name}</h2>
      {category.products.map((item) => (
        <FoodCard key={item._id} items={item} />
      ))}
    </div>
  );
};

export default function Home() {
  const [products, setProducts] = useState<ProductCategoryResponse>({
    recommendedProducts: [],
    categorizedProducts: [],
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesSelection, setCategoriesSelection] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<CategorisedType[]>(
    []
  );
  // Refs for scrolling
  const recommendedRef = useRef<HTMLDivElement>(null);
  const filteredSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsNcategories();
        setProducts(data);
        setCategories(
          data?.categorizedProducts?.map(
            (cat: CategorisedType) => cat.category.name
          ) || []
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);


   // Handle category selection and scroll to filtered section
  useEffect(() => {
  if (categoriesSelection) {
    // Filter the selected category products
    const filtered = products.categorizedProducts?.filter(
      (cat) => cat.category?.name === categoriesSelection
    ) || [];
    setFilteredProducts(filtered);

    // Scroll to the filtered categories section with an offset
    if (filtered.length > 0 && filteredSectionRef.current) {
      setTimeout(() => {
        const stickyBar = document.querySelector('.sticky') as HTMLElement | null;
        const stickyBarHeight = stickyBar ? stickyBar.offsetHeight : 80
        const sectionRef = filteredSectionRef.current
        if(sectionRef){
          const sectionPosition = sectionRef.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: sectionPosition - stickyBarHeight - 10, // Extra spacing
            behavior: 'smooth',
          });
        } 
      }, 100);
    }
  } else {
    setFilteredProducts([]);
  }
}, [categoriesSelection, products]);

 

  // Handle search results
  useEffect(() => {
    if (query) {
      const allProducts = [
        ...(products.recommendedProducts || []),
        ...(products.categorizedProducts?.flatMap((cat) => cat.products) || []),
      ];
      const results = allProducts.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchedProducts(results);
    } else {
      setSearchedProducts([]);
    }
  }, [query, products]);
  console.log(filteredProducts, 'filtere peroduct');





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


        {/* Sticky Search & Categories Section */}
      <div className="sticky top-0 py-3 z-200 bg-white transition-all duration-300">

      {/* Search Box */}
      <div className="w-full px-4">
        <SearchBox
          setProducts={setSearchedProducts}
          query={query}
          setQuery={setQuery}
        />
      </div>

      {/* Categories Section */}
      {categories.length > 0 && (
        <div className="categories-wrapper flex flex-col">
          <h2 className="text-primary px-4 pb-2">Categories</h2>
          <CategoriesSwiper
            categories={categories}
            setCategoriesSelection={setCategoriesSelection}
          />
        </div>
      )}
      </div>

      {/* Display Search Results */}
      {query && searchedProducts.length > 0 && (
        <div className="flex w-full flex-col px-4">
          <h2 className="text-primary pb-2">Search Results</h2>
          {renderProductCards(searchedProducts)}
        </div>
      )}

        <>
       {/* Recommended Section */}
          {products.recommendedProducts.length > 0 && (
            <div ref={recommendedRef}  className="flex w-full flex-col px-4">
              <h2 className="text-primary pb-2">Recommended</h2>
              {loading ? (
                <p className="text-center text-gray-500">Loading products...</p>
              ) : (
                renderProductCards(products.recommendedProducts)
              )}
            </div>
          )}

       {/* Filtered Category Section */}
      {categoriesSelection && !query && filteredProducts.length > 0 && (
        <div ref={filteredSectionRef} className="flex w-full flex-col px-4" >
          {filteredProducts.map((category) => renderCategorySection(category))}
        </div>
      )}

        {/* All Categorized Products */}
        {products?.categorizedProducts?.length > 0 && (
          <div  className="flex w-full flex-col px-4" >
            {products.categorizedProducts.map((category) =>
              renderCategorySection(category)
            )}
          </div>
        )}
      </>

      {/* Filtered Products by Category */}
    </div>
  );
}
