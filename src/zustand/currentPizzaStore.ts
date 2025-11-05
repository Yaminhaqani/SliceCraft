import { create } from "zustand";




type PizzaOption = {
  name: string;
  price: number;
  image?: string;
};

interface CurrentPizzaState {
  base: PizzaOption | null;
  size: PizzaOption | null;
  toppings: PizzaOption[];

  //actions
  setBase: (base: PizzaOption) => void;
  setSize: (size: PizzaOption) => void;
  toggleToppings: (topping: PizzaOption) => void;
  resetPizza: () => void;

  getTotal: () => number;
}

export const useCurrentPizzaStore = create<CurrentPizzaState>((set, get) => ({
    base: null,
    size: null,
    toppings: [],

    setBase: (base) => set({ base }),
    setSize: (size) => set({ size }),

    toggleToppings: (topping) =>
    set((state) => {
      const exists = state.toppings.some((t) => t.name === topping.name);
      return exists
        ? { toppings: state.toppings.filter((t) => t.name !== topping.name) }
        : { toppings: [...state.toppings, topping] };
    }),

     resetPizza: () => set({ base: null, size: null, toppings: [] }),

       getTotal: () => {
    const { base, size, toppings } = get();  //get() returns that whole object — the full state of the store. Here it extract only its base, size, and toppings.
    return (
      (base?.price ?? 0) + // ?? is Nullish Coalescing Operator. base.price is null or undefined, the expression defaults to 0.
      (size?.price ?? 0) +
      toppings.reduce((sum, t) => sum + t.price, 0)
    );
  },
}))

