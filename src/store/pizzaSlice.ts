import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../apiConfig";


type PizzaOption = {
  _id: string;
  name: string;
  price: number;
  image?: string; //optional
};

interface PizzaState {
  bases: PizzaOption[];
  toppings: PizzaOption[];
  sizes: PizzaOption[];
  menu: PizzaOption[];
}

const initialState: PizzaState = {
  bases: [
    // { name: "Thin Crust", price: 100 },
    // { name: "Thick Crust", price: 120 },
    // { name: "Cheese Burst", price: 150 },
    // { name: "Stuffed Crust", price: 180 },
    // { name: "Whole Wheat", price: 130 },
  ],

  toppings: [
    // { name: "Pepperoni", price: 50 },
    // { name: "Mushrooms", price: 40 },
    // { name: "Onions", price: 30 },
    // { name: "Extra Cheese", price: 45 },
    // { name: "Green Peppers", price: 30 },
    // { name: "Jalapeños", price: 25 },
    // { name: "Black Olives", price: 35 },
  ],

  sizes: [
    // {name: "Small", price: 199, image:'/assets/6-sliced.png' },
    // {name: "Medium", price: 349, image:'/assets/8-sliced.png' },
    // {name: "Large", price: 549, image:'/assets/10-sliced.png' },
    // {name: "Extra Large", price: 749, image:'/assets/12-sliced.png' },
  ],

  menu:[],
};

//thunks

export const fetchBases = createAsyncThunk("pizza/fetchBases", async()=>{
  const res = await axios.get(`${API_URL}/pizza/bases`);  
  return res.data.bases;
})

export const fetchSizes = createAsyncThunk("pizza/fetchSizes", async()=>{
  const res = await axios.get(`${API_URL}/pizza/sizes`);
  return res.data.sizes;
})

export const fetchToppings = createAsyncThunk("pizza/fetchToppings", async()=>{
  const res = await axios.get(`${API_URL}/pizza/toppings`);
  return res.data.toppings;
})



const pizzaSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(fetchBases.fulfilled, (state, action)=>{
        state.bases = action.payload;
      })
      .addCase(fetchSizes.fulfilled, (state, action)=>{
        state.sizes = action.payload;
      })
      .addCase(fetchToppings.fulfilled, (state, action)=>{
        state.toppings = action.payload;
      });
    },
});

export default pizzaSlice.reducer;

