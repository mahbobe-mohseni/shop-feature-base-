export interface ProductType {
  name: string;
  description: string | null;
  category: string;
  price: number;
  discount: number;
  partNumber: number | string;
  imageUrl: string | null;
  isNew: boolean;
  inStock: boolean;
  createdAt: string | null;
}

export type GetProductsRequestType = {
  page: number;
  q: string;
};
