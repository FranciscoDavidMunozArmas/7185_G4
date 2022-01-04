import { Schema, model } from "mongoose";
import { Warehouse } from "../interface/warehouse.interface";

const schema = new Schema({
    userid: String,
    name: String,
    surname: String,
    address: String,
    phone: String,
    email: String
},
{
    timestamps: false,
    versionKey: false
});

export default model<Warehouse>('warehouse', schema)