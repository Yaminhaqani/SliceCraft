import { Request, Response } from "express";
import { PizzaBase } from "../models/PizzaBase";
import { PizzaSize } from "../models/PizzaSize";
import { PizzaTopping } from "../models/PizzaTopping";

export const getAllBases = async (req: Request, res: Response) => {
  try {
    const bases = await PizzaBase.find();
    res.status(200).json({ bases });
  } catch (error) {
    console.error("Error fetching bases:",error);
    res.status(500).json({error: "Failed to fetch pizza bases." });
  }
};

export const getAllSizes = async (req: Request, res: Response) => {
  try {
    const sizes = await PizzaSize.find();
    res.status(200).json({ sizes });
  } catch (error) {
    console.error("Error fetching sizes:",error);
    res.status(500).json({ error: "Failed to fetch pizza sizes." });
  }
};

export const getAllToppings = async(req:Request, res:Response)=>{
    try {
        const toppings = await PizzaTopping.find();
        res.status(200).json({toppings});
    } catch (error) {
         console.error("Error fetching toppings:",error);
        res.status(500).json({ error: "Failed to fetch pizza toppings."}); 
    }
    };

