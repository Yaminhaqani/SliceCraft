import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../apiConfig";


type PizzaOption = {
  _id: string;
  name: string;
  price: number;
  image?: string; //optional
};

type MenuPizza = {
  _id: string;
  image: string;
  name: string;
  base: PizzaOption;
  size: PizzaOption;
  toppings: PizzaOption[];
  price: number;
}

interface PizzaState {
  bases: PizzaOption[];
  toppings: PizzaOption[];
  sizes: PizzaOption[];
  menu: MenuPizza[];
}

const initialState: PizzaState = {
  bases: [],
  toppings: [],
  sizes: [],
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

export const fetchMenu = createAsyncThunk("pizza/fetchMenu", async()=>{
  const res = await axios.get(`${API_URL}/menu`);
  return res.data.menu;
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
      })
      .addCase(fetchMenu.fulfilled, (state, action)=>{
        state.menu = action.payload;
      });
    },
});

export default pizzaSlice.reducer;

