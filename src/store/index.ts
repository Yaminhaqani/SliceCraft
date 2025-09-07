import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./pizzaSlice";
import cartReducer from "./cartSlice";
import currentPizzaReducer from "./currentPizzaSlice";





export const store = configureStore({
    reducer:{
        pizza: pizzaReducer,
        cart: cartReducer,
        currentPizza: currentPizzaReducer,
        
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;