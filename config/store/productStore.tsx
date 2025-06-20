import { create } from 'zustand';

interface ProductStore {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  selectedCategory: '',
  setSelectedCategory: (category: string) =>
    set({ selectedCategory: category }),
}));

export default useProductStore;
