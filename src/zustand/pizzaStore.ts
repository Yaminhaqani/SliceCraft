import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../apiConfig";

export type PizzaOption = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

type MenuPizza = {
  _id: string;
  image: string;
  name: string;
  base: PizzaOption;
  toppings: PizzaOption[];
  basePrice: number;
};

interface PizzaState {
  bases: PizzaOption[];
  toppings: PizzaOption[];
  sizes: PizzaOption[];
  menu: MenuPizza[];

  fetchBases: () => Promise<void>;
  fetchSizes: () => Promise<void>;
  fetchToppings: () => Promise<void>;
  fetchMenu: () => Promise<void>;
}

export const usePizzaStore = create<PizzaState>((set) => ({
  bases: [],
  toppings: [],
  sizes: [],
  menu: [],

  fetchBases: async () => {
    const res = await axios.get(`${API_URL}/pizza/bases`);
    set({ bases: res.data.bases });
  },

  fetchSizes: async () => {
    const res = await axios.get(`${API_URL}/pizza/sizes`);
    set({ sizes: res.data.sizes });
  },

  fetchToppings: async () => {
    const res = await axios.get(`${API_URL}/pizza/toppings`);
    set({ toppings: res.data.toppings });
  },

  fetchMenu: async () => {
    const res = await axios.get(`${API_URL}/menu`);
    set({ menu: res.data.menu });
  },
}));
