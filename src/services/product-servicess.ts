import { ProductType, ResponseType } from "@/types";

export const getProducts = async (params: {
  page: number;
  q: string;
}): Promise<ResponseType<ProductType[]> | null> => {
  const res = await fetch("/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  return data;
};
