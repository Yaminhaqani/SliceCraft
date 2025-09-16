import mongoose, { Document, Model, Schema } from "mongoose";


export interface IPizzaToppings extends Document {
    name: string;
    price: number;
}

const PizzaToppingSchema = new Schema<IPizzaToppings>({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
});

export const PizzaTopping: Model<IPizzaToppings> = mongoose.models.PizzaTopping || mongoose.model("PizzaTopping",PizzaToppingSchema);