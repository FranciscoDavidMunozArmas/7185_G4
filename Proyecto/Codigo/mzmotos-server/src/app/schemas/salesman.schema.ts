import { model, Schema } from "mongoose";
import { Salesman } from "../interface/salesman.interface";

const schema = new Schema({
    userid: String,
    ci: String,
    name: String,
    surname: String,
    address: String,
    phone: String,
    email: String,
    appointments: [
        {
            date: Date,
            state: {
                type: Boolean,
                default: false
            },
            client: {
                RUC: String,
                name: String,
                address: String,
                city: String,
                phone: String,
                email: String
            }
        }
    ]
},
{
    timestamps: false,
    versionKey: false
});

export default model<Salesman>('salesman', schema)