import mongoose, { Document, Model, Schema } from "mongoose";


export interface IMenu extends Document {
    name: string;
    description: string;
    base: mongoose.Types.ObjectId;
    // size: mongoose.Types.ObjectId;
    toppings: mongoose.Types.ObjectId[];
    basePrice: number;
    image: string;
}

const MenuSchema = new Schema<IMenu>({
    name: {type: String, required: [true, "Name is required"], unique: true},
    description: {type: String},
    base: {type: Schema.Types.ObjectId, ref: "PizzaBase", required: true},
    // size: {type: Schema.Types.ObjectId, ref: "PizzaSize", required: true},
    toppings: [{type: Schema.Types.ObjectId, ref: "PizzaTopping", required: true}],
    basePrice: {type: Number, required: true},
    image: {type: String},
},
{timestamps:true}
);

export const Menu: Model<IMenu> = mongoose.models.Menu || mongoose.model<IMenu>("Menu", MenuSchema);