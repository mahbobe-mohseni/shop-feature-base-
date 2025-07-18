import { UserType } from "@/types";

export const getCurrentUser = async (): Promise<UserType | null> => {
  try {
    const res = await fetch("/api/users/current-user", {
      credentials: "include",
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
