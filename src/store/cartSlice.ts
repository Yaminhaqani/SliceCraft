import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {  //Take the CartItem interface, but remove the quantity property. Quantity omitted bcz initially only 1 is set, rest is handles by other reducer.
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); //Take all the properties from action.payload (e.g., name, price, size, etc.)
      }
      state.total += action.payload.price;
      
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      ); //action.payload is a string (the id), not an object.
      if (itemToRemove) {
        state.total -= itemToRemove.price * itemToRemove.quantity;
      }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Update quantity (for +/- buttons)
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (quantity < 1) return;

      const item = state.items.find((item) => item.id === id);
      if (item) {
        state.total += item.price * (quantity - item.quantity);
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      // no action because it does'nt need any input
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
