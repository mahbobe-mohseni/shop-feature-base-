import { ProductType, ResponseType } from "@/types";

export const getProducts = async (params: {
  page: number;
  q: string;
}): Promise<ResponseType<ProductType[]> | null> => {
  const { page, q } = params;
  if (!page) return null;
  const res = await fetch(`/api/products?page=${page}&q=${q}`);
  const data = await res.json();
  return data;
};
