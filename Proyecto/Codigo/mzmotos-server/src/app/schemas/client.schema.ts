import { model, Schema } from "mongoose";
import { Client } from "../interface/client.interface";

const schema = new Schema({
    RUC: {
        type: String,
        unique: true
    },
    name: String,
    surname: String,
    address: String,
    city: String,
},
    {
        timestamps: false,
        versionKey: false
    });

export default model<Client>('client', schema)