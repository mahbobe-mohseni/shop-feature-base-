import { ProductType, ResponseType } from "@/types";

export const getProducts = async (params: {
  page: number;
  perPage?: number;
  q?: string;
}): Promise<ResponseType<ProductType[]> | null> => {
  const { page, perPage = 20, q = "" } = params;
  if (!page) return null;
  const res = await fetch(
    `/api/products?page=${page}&perPage=${perPage}&q=${q}`
  );
  const data = await res.json();
  return data;
};
