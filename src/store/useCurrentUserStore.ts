import { UserType } from "@/types";
import { create } from "zustand";

interface CurrentUserType {
  currentUser: UserType | null;
  handelSetCurrentUser: (item: UserType | null) => void;
}

export const useCurrentUserStore = create<CurrentUserType>((set) => ({
  // state
  currentUser: null,

  // actions
  handelSetCurrentUser: (item: UserType | null) => {
    set({ currentUser: item });
  },
}));
