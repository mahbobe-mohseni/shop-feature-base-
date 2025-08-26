export const getProducts: any = async (q: string): Promise<any | null> => {
  try {
    const res = await fetch(`/api/products?q=${q}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
