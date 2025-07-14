import { create } from "zustand";

interface CartStore {
  cartItems: any[];
  handleAddToCart: (item: any) => void;
  handleRemoveOfCart: (id: number | string) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  // state
  cartItems: [],

  // actions
  handleAddToCart: (item) => {
    const { cartItems } = get();
    let updatedItem = { ...item, quantity: 1 };
    
    const alreadyExistItem = cartItems.find(({ id }) => id === item.id);
    if (alreadyExistItem) {
      // exisit add
      const updatedCartItems = cartItems.map((cartItem) => {
        const quantity =
          alreadyExistItem.id === cartItem.id
            ? cartItem.quantity + 1
            : cartItem.quantity;

        return { ...cartItem, quantity };
      });
      set({ cartItems: updatedCartItems });
    } else {
      // new add
      set({ cartItems: [...cartItems, updatedItem] });
    }
  },
  handleRemoveOfCart: (deletedId: any) => {
    const { cartItems } = get();

    const updatedCartItems = cartItems.filter(({ id }) => id !== deletedId);

    set({ cartItems: updatedCartItems });
  },
}));
