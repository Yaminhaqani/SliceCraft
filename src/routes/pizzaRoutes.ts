import express from "express";
import { getAllBases, getAllSizes, getAllToppings } from "../controllers/pizzaOptionsController";


const router = express.Router();

router.get("/bases", getAllBases);
router.get("/sizes", getAllSizes);
router.get("/toppings", getAllToppings);

export default router;