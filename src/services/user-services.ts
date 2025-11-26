import { UserType } from "@/types";

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