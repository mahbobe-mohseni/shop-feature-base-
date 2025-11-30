import { ResponseType, UserType } from "@/types";

export const getCurrentUser = async (): Promise<UserType | null> => {
  try {
    const res = await fetch("/api/users/current-user");
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCurrentUser = async (payload: any): Promise<UserType | null> => {
  const res = await fetch("/api/users/current-user/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const { data } = await res.json();
  return data;
};
export const getUsers = async (params: {
  page: number;
  perPage?: number;
  q?: string;
}): Promise<ResponseType<UserType[]> | null> => {
  const { page, perPage = 20, q = "" } = params;
  if (!page) return null;
  const res = await fetch(
    `/api/users?page=${page}&perPage=${perPage}&q=${q}`
  );
  const data = await res.json();
  return data;
};
