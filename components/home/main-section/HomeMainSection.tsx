'use client';

import React, { useEffect, useRef, useState } from 'react';
import SearchBox from '@/components/SearchBox';
import CategoriesSwiper from '@/components/CategoriesSwiper';
import {
    CategorizedType,
    ProductCategoryResponse,
    ProductType,
} from '@/types/home/product.types';
import CardWrapper from '@/components/home/card-wrapper/CardWrapper';
import CategorySection from '@/components/home/category-section/CategorySection';
import { ApiResponse } from '@/core/http';
import NoResult from '@/components/atoms/no-result/EmptyResult';
import Recommended from '../recommended/Recommended';
import useProductStore from '@/config/store/productStore';

interface IHomeProps {
    categoryData: ApiResponse<ProductCategoryResponse>;
}

function Home({ categoryData }: IHomeProps) {
    const [products, setProducts] = useState<ProductCategoryResponse>({
        recommendedProducts: [],
        categorizedProducts: [],
    });
    const [categories, setCategories] = useState<string[]>([]);
    const { selectedCategory, setSelectedCategory } = useProductStore();
    const [query, setQuery] = useState<string>('');
    const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<CategorizedType[]>(
        []
    );

    useEffect(() => {
        setProducts(categoryData.data);
        setCategories(
            categoryData.data?.categorizedProducts?.map(
                (cat: CategorizedType) => cat.category.name
            ) || []
        );
    }, []);

    useEffect(() => {
        if (query) {
            const allProducts = [
                ...(products?.categorizedProducts?.flatMap((cat) => cat.products) ||
                    []),
            ];
            const results = allProducts?.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchedProducts(results);
        } else {
            setSearchedProducts([]);
        }
    }, [query]);

    return (
        <>
            <div className="w-full px-4">
                <SearchBox
                    setProducts={setSearchedProducts}
                    query={query}
                    setQuery={setQuery}
                />
            </div>
            {categories?.length > 0 && (
                <div className="categories-wrapper flex flex-col">
                    <h2 className="text-primary px-4 pb-2">Categories</h2>
                    <CategoriesSwiper categories={categories} />
                </div>
            )}
            {searchedProducts?.length === 0 && query?.length > 0 && (
                <NoResult
                    title="Sorry"
                    description="We couldn’t find any matching dishes."
                />
            )}
            <div>
                {query && searchedProducts?.length > 0 && (
                    <div className="flex w-full flex-col px-4">
                        <h2 className="text-primary pb-2">Search Results</h2>
                        <CardWrapper products={searchedProducts} />
                    </div>
                )}
                {/* {selectedCategory && !query && filteredProducts?.length > 0 && (
                    <div className="flex w-full flex-col px-4">
                        {filteredProducts.map((category) => (
                            <CategorySection
                                key={category.category._id}
                                category={category}
                            />
                        ))}
                    </div>
                )} */}
                <>
                    <Recommended products={products} />
                    {products?.categorizedProducts?.length > 0 && (
                        <div className="flex w-full flex-col px-4">
                            {products?.categorizedProducts?.map((category) => (
                                <CategorySection
                                    key={category.category._id}
                                    category={category}
                                />
                            ))}
                        </div>
                    )}
                </>
            </div>
        </>
    );
}

export default React.memo(Home);
