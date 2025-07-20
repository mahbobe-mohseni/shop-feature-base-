export const getProducts: any = async (): Promise<any | null> => {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
