import { create } from "zustand";

interface CartItem {
  id: string;  //composite id because we sometimes order multiple same pizza of different sizes
  pizzaId: string;  // real pizza id
  name: string;
  size: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;

  addToCart: (item: Omit<CartItem, "quantity">) => void; //Take the CartItem interface, but remove the quantity property. Quantity omitted bcz initially only 1 is set, rest is handled by other reducer.
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const calculateTotal = (items: CartItem[]): number =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,

  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id); //This now works correctly because id is unique per size.
      let updatedItems;
      if (existing) {
        updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedItems = [...state.items, { ...item, quantity: 1 }];
      }

      //Always recalculate total to stay in sync
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedItems = state.items.filter((i) => i.id !== id);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }),

  updateQuantity: (
    id,
    quantity //Change the quantity of an existing pizza (from + / - buttons).
  ) =>
    set((state) => {
      if (quantity < 1) return state;
      const updatedItems = state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i  //quantity coming from parameter
      );
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }),

  clearCart: () => ({ items: [], total: 0 }),
}));
