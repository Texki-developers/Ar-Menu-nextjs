'use client';
import React, {
  useEffect,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { MaterialSymbolsSearchRounded } from './Icons';
import { searchProducts } from '@/app/services/productService';
import { ProductType } from '@/app/types/product.types';

interface SearchProps {
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function Search({ setProducts, query, setQuery }: SearchProps) {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    <T extends (...args: never[]) => void>(func: T, delay: number) => {
      return (...args: Parameters<T>) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => func(...args), delay);
      };
    },
    []
  );

  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm) {
      return;
    }
    try {
      const response = await searchProducts(encodeURIComponent(searchTerm));
      console.log(response.data, 'search results');
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Memoized debounced function (only created once)
  const handleSearch = useCallback(debounce(fetchResults, 300), []);

  // Call the debounced search function when query changes
  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <div className="flex gap-2 rounded-lg border border-gray-400 p-2">
        <MaterialSymbolsSearchRounded
          fontSize="1.5rem"
          color="rgb(177,177,177)"
        />
        <input
          type="text"
          placeholder="Search For Biriyani"
          className="text-description flex-1 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
