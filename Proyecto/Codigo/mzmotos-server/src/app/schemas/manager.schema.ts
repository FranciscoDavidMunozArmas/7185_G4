import { Schema, model } from "mongoose";
import { Manager } from "../interface/manager.interface";

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

export default model<Manager>('manager', schema)