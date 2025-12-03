export const updateProduct = async (payload: any): Promise<any | null> => {
  const res = await fetch("/api/panel/products", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const { data } = await res.json();
  return data;
};
export const deleteProduct = async (payload: any): Promise<any | null> => {
  const res = await fetch("/api/panel/products", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const { data } = await res.json();
  return data;
};
