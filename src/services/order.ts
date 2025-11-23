import { ResponseType } from "@/types";

type OrderProduct = {
  productId: string;
  quantitiy: number;
};
export interface OrderFormat {
  userId: string;
  products: OrderProduct[];
  totalprice: number;
  createdAt: Date;
}

export const setOrder = async (payload: any): Promise<OrderFormat | null> => {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const { data } = await res.json();
  return data;
};
export const getOrders = async (params: {
  page: number;
  q: string;
}): Promise<ResponseType<any[]> | null> => {
  const { page} = params;
  if (!page) return null;
  const res = await fetch(`/api/orders?page=${page}`);
  const data = await res.json();
  return data;
};