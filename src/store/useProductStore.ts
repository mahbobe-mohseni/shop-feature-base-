import { ProductType } from "@/types";
import { create } from "zustand";

interface ProductUserType {
  products: ProductType[];
  loading: boolean;
  handleSetProducts: (items: ProductType[]) => void;
  handleSetLoading: (value: boolean) => void;
}

export const useProductStore = create<ProductUserType>((set) => ({
  // state
  products: [],
  loading: false,

  // actions
  handleSetProducts: (items: ProductType[]) => {
    set({ products: items });
  },

  handleSetLoading: (value: boolean) => {
    set({ loading: value });
  },
}));
