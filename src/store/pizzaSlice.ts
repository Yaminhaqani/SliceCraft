import { createSlice } from "@reduxjs/toolkit";

type PizzaOption = {
  name: string;
  price: number;
  image?: string; //optional
};

interface PizzaState {
  bases: PizzaOption[];
  toppings: PizzaOption[];
  sizes: PizzaOption[];
  menu: {
    id: number;
    name: string;
    price: number;
    image: string;
  }[];
}

const initialState: PizzaState = {
  bases: [
    { name: "Thin Crust", price: 100 },
    { name: "Thick Crust", price: 120 },
    { name: "Cheese Burst", price: 150 },
    { name: "Stuffed Crust", price: 180 },
    { name: "Whole Wheat", price: 130 },
  ],

  toppings: [
    { name: "Pepperoni", price: 50 },
    { name: "Mushrooms", price: 40 },
    { name: "Onions", price: 30 },
    { name: "Extra Cheese", price: 45 },
    { name: "Green Peppers", price: 30 },
    { name: "Jalapeños", price: 25 },
    { name: "Black Olives", price: 35 },
  ],

  sizes: [
    {name: "Small", price: 199, image:'/assets/6-sliced.png' },
    {name: "Medium", price: 349, image:'/assets/8-sliced.png' },
    {name: "Large", price: 549, image:'/assets/10-sliced.png' },
    {name: "Extra Large", price: 749, image:'/assets/12-sliced.png' },
  ],

  menu:[],
};

const pizzaSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers:{},
});

export default pizzaSlice.reducer;

