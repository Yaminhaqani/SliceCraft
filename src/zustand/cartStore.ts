import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string; // composite id because we sometimes order multiple same pizza of different sizes
  pizzaId: string; // real pizza id
  name: string;
  size: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  // Take the CartItem interface, but remove the quantity property.
  // Quantity omitted because initially only 1 is set, rest is handled by other reducer.

  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Helper function to calculate total amount
const calculateTotal = (items: CartItem[]): number =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const useCartStore = create<CartState>()(
  persist(  //persist automatically saves your Zustand store to localStorage and rehydrates (restores) it when the app reloads.
    (set) => ({
      items: [],
      total: 0,

      addToCart: (item) =>
        set((state) => {
          // Check if same pizza (same id + same size) already exists in cart
          const existing = state.items.find((i) => i.id === item.id);
          // This works correctly because id is unique per size.

          let updatedItems;

          if (existing) {
            // If pizza already exists, increase quantity
            updatedItems = state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          } else {
            // Otherwise add new pizza with quantity = 1
            updatedItems = [...state.items, { ...item, quantity: 1 }];
          }

          // Always recalculate total to stay in sync
          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        }),

      removeFromCart: (id) =>
        set((state) => {
          // Remove pizza from cart
          const updatedItems = state.items.filter((i) => i.id !== id);
          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        }),

      updateQuantity: (
        id,
        quantity // Change the quantity of an existing pizza (from + / - buttons)
      ) =>
        set((state) => {
          if (quantity < 1) return state;
          

          const updatedItems = state.items.map(
            (i) => (i.id === id ? { ...i, quantity } : i) // quantity coming from parameter
          );

          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        }),

      clearCart: () => {
        set({
          items: [],
          total: 0,
        }); // Clear everything from cart
      },
      // },
    }),
    {
      name: "pizza-cart", // Key used in localStorage to persist cart
      partialize: (state) => ({ //by default persist stores everything in the store, thats bad because functions cant be stored, so partialize lets us save only the mentioned parts. 
        items: state.items,
        total: state.total,
      }),
    }
  )
);
