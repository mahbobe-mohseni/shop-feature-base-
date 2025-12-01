import { ResponseType } from "@/types";

export const getDashboardWidgets = async (): Promise<ResponseType<
  any[]
> | null> => {
  const res = await fetch("/api/panel/dashboard");
  const data = await res.json();
  return data;
};  
