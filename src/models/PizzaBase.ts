import mongoose, { Model, Schema } from "mongoose";


export interface IPizzaBase extends Document{
    name: string;
    price: number;
}

const PizzaBaseSchema = new Schema<IPizzaBase>({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
})

export const PizzaBase: Model<IPizzaBase> = mongoose.models.PizzaBase || mongoose.model<IPizzaBase>("PizzaBase", PizzaBaseSchema);