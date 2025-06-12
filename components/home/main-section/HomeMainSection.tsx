'use client';

import { useEffect, useState } from 'react';
import SearchBox from '@/components/SearchBox';
import CategoriesSwiper from '@/components/CategoriesSwiper';
import {
    CategorizedType,
    ProductCategoryResponse,
    ProductType,
} from '@/types/home/product.types';
import { getProductsCategories } from '@/core/services/productService';
import CardWrapper from '@/components/home/card-wrapper/CardWrapper';
import CategorySection from '@/components/home/category-section/CategorySection';

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
    const [filteredProducts, setFilteredProducts] = useState<CategorizedType[]>(
        []
    );

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProductsCategories();
                setProducts(data);
                setCategories(
                    data?.categorizedProducts?.map(
                        (cat: CategorizedType) => cat.category.name
                    ) || []
                );
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (categoriesSelection) {
            setFilteredProducts(
                products.categorizedProducts?.filter(
                    (cat) => cat.category?.name === categoriesSelection
                ) || []
            );
        } else {
            setFilteredProducts([]);
        }
    }, [categoriesSelection, products]);

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

    return (
        <>
            <div className="w-full px-4">
                <SearchBox
                    setProducts={setSearchedProducts}
                    query={query}
                    setQuery={setQuery}
                />
            </div>
            {categories.length > 0 && (
                <div className="categories-wrapper flex flex-col">
                    <h2 className="text-primary px-4 pb-2">Categories</h2>
                    <CategoriesSwiper
                        categories={categories}
                        setCategoriesSelection={setCategoriesSelection}
                    />
                </div>
            )}
            {query && searchedProducts.length > 0 && (
                <div className="flex w-full flex-col px-4">
                    <h2 className="text-primary pb-2">Search Results</h2>
                    <CardWrapper products={searchedProducts} />
                </div>
            )}
            {categoriesSelection && !query && filteredProducts.length > 0 && (
                <div className="flex w-full flex-col px-4">
                    {filteredProducts.map((category) => (
                        <CategorySection key={category.category._id} category={category} />
                    ))}
                </div>
            )}

            <>
                {products.recommendedProducts.length > 0 && (
                    <div className="flex w-full flex-col px-4">
                        <h2 className="text-primary pb-2">Recommended</h2>
                        <CardWrapper products={products.recommendedProducts} />
                    </div>
                )}

                {products?.categorizedProducts?.length > 0 && (
                    <div className="flex w-full flex-col px-4">
                        {products.categorizedProducts.map((category) => (
                            <CategorySection
                                key={category.category._id}
                                category={category}
                            />
                        ))}
                    </div>
                )}
            </>
        </>
    );
}
