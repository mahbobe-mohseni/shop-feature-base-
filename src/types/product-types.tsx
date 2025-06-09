export interface ProductState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  onSale: boolean;
  colors: string[];
  searchTerm: string;
}
