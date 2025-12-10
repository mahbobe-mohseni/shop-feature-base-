import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  cartItems: unknown[];
  handleAddToCart: (item: unknown) => void;
  handleRemoveOfCart: (id: number | string) => void;
  handleResetCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // state
      cartItems: [],

      // actions
      handleAddToCart: (item: unknown) => {
        const { cartItems } = get();

        const itemIndex = cartItems.findIndex(
          (cartItem: unknown) =>
            (cartItem as { _id: unknown })._id ===
            (item as { _id: unknown })._id
        );

        if (itemIndex !== -1) {
          const clonedCartItems = [...cartItems];

          clonedCartItems[itemIndex] = {
            ...(clonedCartItems[itemIndex] as { quantity: number }),
            quantity:
              (clonedCartItems[itemIndex] as { quantity: number }).quantity + 1,
          };
          set({ cartItems: clonedCartItems });
        } else {
          set({
            cartItems: [
              ...cartItems,
              { ...(item as { quantity: number }), quantity: 1 },
            ],
          });
        }
      },
      handleRemoveOfCart: (deletedId: number | string) => {
        const { cartItems } = get();

        const clonedCartItems = cartItems.filter(
          (cartItem: unknown) =>
            (cartItem as { _id: number | string })._id !== deletedId
        );

        set({ cartItems: clonedCartItems });
      },
      handleResetCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cartStore",
    }
  )
);
