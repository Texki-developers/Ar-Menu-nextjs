'use client';

import React, {
  useEffect,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { MaterialSymbolsSearchRounded } from './Icons';
import { ProductType } from '@/types/home/product.types';
import { searchProducts } from '@/core/services/productService';
import useTranslation from '@/hooks/translation-hook/useTranslation.hook';

interface SearchProps {
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function Search({ setProducts, query, setQuery }: SearchProps) {
  const { t } = useTranslation();
  // const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // const debounce = useCallback(
  //   <T extends (...args: never[]) => void>(func: T, delay: number) => {
  //     return (...args: Parameters<T>) => {
  //       if (debounceTimer.current) clearTimeout(debounceTimer.current);
  //       debounceTimer.current = setTimeout(() => func(...args), delay);
  //     };
  //   },
  //   []
  // );

  // const fetchResults = async (searchTerm: string) => {
  //   if (!searchTerm) {
  //     return;
  //   }
  //   try {
  //     const response = await searchProducts(encodeURIComponent(searchTerm));
  //     setProducts(response.data || []);
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   }
  // };

  // Memoized debounced function (only created once)
  // const handleSearch = useCallback(debounce(fetchResults, 300), []);

  // Call the debounced search function when query changes
  // useEffect(() => {
  //   handleSearch(query);
  // }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <div className="flex gap-2 rounded-lg border border-gray-400 p-2">
        <MaterialSymbolsSearchRounded
          fontSize="1.5rem"
          color="rgb(177,177,177)"
        />
        <input
          type="text"
          placeholder={t?.home?.searchPlaceholder}
          className="text-description flex-1 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
