import { model, Schema } from "mongoose";
import { Product } from "../interface/product.interface";

const schema = new Schema({
    productid: {
        type: String
    },
    name: String,
    image: String,
    price: Number,
    stock: {
        type: Number,
        default: 0
    },
},
{
    timestamps: false,
    versionKey: false
});

export default model<Product>('product', schema)