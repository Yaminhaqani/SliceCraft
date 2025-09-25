import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

type PizzaOption = {
    name: string;
    price: number;
    image?: string;
}

interface CurrentPizzaState {
    base: PizzaOption | null;
    size: PizzaOption | null;
    toppings: PizzaOption[];
}

const initialState: CurrentPizzaState = {
  base: null,
  size: null,
  toppings: [],
};

const CurrentPizzaSlice = createSlice({
    name: "currentPizza",
    initialState,
    reducers:{
        setBase: (state, action: PayloadAction<PizzaOption>)=>{
            state.base = action.payload;
        },

        setSize: (state, action: PayloadAction<PizzaOption>)=>{
            state.size = action.payload;
        },

        toggleToppings: (state, action: PayloadAction<PizzaOption>)=>{
            const exists = state.toppings.find(t=> t.name === action.payload.name);  //includes() checks for existence, find() searches for and returns the element.
            if(exists){
                state.toppings = state.toppings.filter(t=> t.name !== action.payload.name);
            } else{
                state.toppings.push(action.payload);
            }
        },

        resetPizza: ()=> initialState
    },
});

//selector to calculate total. Selectors are functions that read state and optionally derive values.
export const selectPizzaTotal = (state: RootState)=>{
    let total = 0;
    if(state.currentPizza.base) total += state.currentPizza.base.price;
    if(state.currentPizza.size) total += state.currentPizza.size.price;
    if(state.currentPizza.toppings.length>0) {
        total += state.currentPizza.toppings.reduce((sum,t)=> sum + t.price, 0);
    }
    return total;
}

export const { setBase, setSize, toggleToppings, resetPizza } = CurrentPizzaSlice.actions;
export default CurrentPizzaSlice.reducer;