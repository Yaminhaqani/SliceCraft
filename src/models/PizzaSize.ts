import mongoose, { Document, Model, Schema } from "mongoose";


export interface IPizzaSize extends Document {
    name: string;
    price: number;
}

const PizzaSizeSchema = new Schema<IPizzaSize>({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
});

export const PizzaSize: Model<IPizzaSize> = mongoose.models.PizzaSize || mongoose.model<IPizzaSize>("PizzaSize", PizzaSizeSchema);