import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"


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
    items:[],
    total: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<CartItem>)=>{
            const existing = state.items.find(item => item.id === action.payload.id);
            if(existing){
                existing.quantity +=1;
            } else{
                state.items.push({...action.payload, quantity:1})   //Take all the properties from action.payload (e.g., name, price, size, etc.)
            }
            state.total +=action.payload.price
        },

        removeFromCart: (state,action: PayloadAction<string>)=>{
            const itemToRemove = state.items.find(item => item.id===action.payload);    //action.payload is a string (the id), not an object.
            if(itemToRemove){
                state.total -= itemToRemove.price * itemToRemove.quantity;
            }
            state.items = state.items.filter(item => item.id !== action.payload)
        },

        clearCart: (state)=>{      // no action because it does'nt need any input
            state.items = [];
            state.total = 0;
        }

    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;