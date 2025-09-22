import { ProductType } from "@/types";
import { create } from "zustand";

interface ProductUserType {
  products: ProductType[];
  searchQuery: string;
  paging: { currentPage: number; totalPages: number; totalProducts: number };
  loading: boolean;
  handleSetProducts: (items: ProductType[]) => void;
  handleSetLoading: (value: boolean) => void;
  handleSetSearchQuery: (value: string) => void;
  handleSetPaging: (items: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  }) => void;
}

export const useProductStore = create<ProductUserType>((set) => ({
  // state
  products: [],
  loading: false,
  searchQuery: "",
  paging: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  },

  // actions
  handleSetProducts: (items: ProductType[]) => {
    set({ products: items });
  },

  handleSetSearchQuery: (value: string) => {
    set({ searchQuery: value });
  },

  handleSetLoading: (value: boolean) => {
    set({ loading: value });
  },

  handleSetPaging: (items: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  }) => {
    set({ paging: items });
  },
}));
