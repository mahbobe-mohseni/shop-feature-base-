type OrderProduct = {
  productId: string;
  quantitiy: number;
};
export interface OrderFormat {
  userId: string;
  products: OrderProduct[];
  totalprice: number;
  createdAt: Date
}

export const setOrder=async (payload:any): Promise<OrderFormat | null>=>{
  try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const { data } = await res.json();
      console.log("🚀 ~ onSubmit ~ data:", data);
      return data;
    } catch (error) {
      throw error;
    }
}
