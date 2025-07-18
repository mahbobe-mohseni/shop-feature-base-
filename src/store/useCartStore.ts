import { create } from "zustand";

interface CartStore {
  cartItems: unknown[];
  handleAddToCart: (item: unknown) => void;
  handleRemoveOfCart: (id: number | string) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  // state
  cartItems: [],

  // actions
  handleAddToCart: (item: unknown) => {
    const { cartItems } = get();

    const itemIndex = cartItems.findIndex(
      (cartItem: unknown) => (cartItem as { id: unknown }).id === (item as { id: unknown }).id
    );

    if (itemIndex !== -1) {
      const clonedCartItems = [...cartItems];

      clonedCartItems[itemIndex] = {
        ...(clonedCartItems[itemIndex] as { quantity: number }),
        quantity: (clonedCartItems[itemIndex] as { quantity: number }).quantity + 1,
      };
      set({ cartItems: clonedCartItems });
    } else {
      set({ cartItems: [...cartItems, { ...(item as { quantity: number }), quantity: 1 }] });
    }
  },
  handleRemoveOfCart: (deletedId: number | string) => {
    const { cartItems } = get();

    const clonedCartItems = cartItems.filter(
      (cartItem: unknown) => (cartItem as { id: number | string }).id !== deletedId
    );

    set({ cartItems: clonedCartItems });
  },
}));
