import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menuRoutes"
import pizzaRoutes from "./routes/pizzaRoutes";


const app= express();

app.use(cors());
app.use(express.json());


//Routes
app.use("/api/menu", menuRoutes);
app.use("/api/pizza", pizzaRoutes);


export default app;
