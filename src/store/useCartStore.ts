import { create } from "zustand";

interface CartStore {
  cartItems: any[];
  handleAddToCart: (item: any) => void;
  handleRemoveOfCart: (id: number | string) => void;
}

export const useCartStore = create<CartStore>((set: any, get: any) => ({
  // state
  cartItems: [],

  // actions
  handleAddToCart: (item: any) => {
    const { cartItems } = get();

    const itemIndex = cartItems.findIndex(
      (cartItem: any) => cartItem.id === item.id
    );

    if (itemIndex !== -1) {
      const clonedCartItems = [...cartItems];

      clonedCartItems[itemIndex] = {
        ...clonedCartItems[itemIndex],
        quantity: clonedCartItems[itemIndex].quantity + 1,
      };
      set({ cartItems: clonedCartItems });
    } else {
      set({ cartItems: [...cartItems, { ...item, quantity: 1 }] });
    }
  },
  handleRemoveOfCart: (deletedId: number | string) => {
    const { cartItems } = get();

    const clonedCartItems = cartItems.filter(
      ({ id }: { id: number | string }) => id !== deletedId
    );

    set({ cartItems: clonedCartItems });
  },
}));
