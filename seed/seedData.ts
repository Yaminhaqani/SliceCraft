import mongoose from "mongoose";
import dotenv from "dotenv";
import { PizzaBase } from "../src/models/PizzaBase";
import { PizzaSize } from "../src/models/PizzaSize";
import { PizzaTopping } from "../src/models/PizzaTopping";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string); // as string because In TypeScript, process.env.MONGO_URI has type string | undefined But mongoose.connect() expects its first argument to be string NOT string | undefined. This tells TypeScript “Trust me, I know this will be a string at runtime.”

    //Clear old data to avoid Duplicate Key Errors
    await PizzaBase.deleteMany({});
    await PizzaSize.deleteMany({});
    await PizzaTopping.deleteMany({});

    //Insert Bases
    await PizzaBase.insertMany([
      { name: "Thin Crust", price: 100 },
      { name: "Thick Crust", price: 120 },
      { name: "Cheese Burst", price: 150 },
      { name: "Stuffed Crust", price: 180 },
      { name: "Whole Wheat", price: 130 },
    ]);

    //Insert Sizes
       await PizzaSize.insertMany([
      { name: "Small", price: 199 },
      { name: "Medium", price: 349 },
      { name: "Large", price: 549 },
      { name: "Extra Large", price: 749 },
    ]);

     //Insert Toppings
    await PizzaTopping.insertMany([
      { name: "Pepperoni", price: 50 },
      { name: "Mushrooms", price: 40 },
      { name: "Onions", price: 30 },
      { name: "Extra Cheese", price: 45 },
      { name: "Green Peppers", price: 30 },
      { name: "Jalapeños", price: 25 },
      { name: "Black Olives", price: 35 },
    ]);

    console.log("Data seeded successfully!");
    process.exit(0);
    

  } catch (error) {
    console.error(error);
    process.exit(1);
    
  } finally{
    await mongoose.disconnect();
  }
};

seedData();
