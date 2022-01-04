import { Schema, model } from "mongoose";
import constants from "../../lib/constants";
import { getSequenceValue } from "../../lib/sequence/sequenceMongo";
import { Order } from "../interface/order.interface";

const schema = new Schema({
    orderId: String,
    salesman: String,
    date: {
        type: Date,
        default: Date.now
    },
    client: {
        type: {
            RUC: String,
            name: String,
            address: String,
            city: String
        },
        required: true
    },
    list: {
        type: [{
            product: {
                productid: String,
                name: String,
                image: String,
                price: Number,

            },
            quantity: Number
        }],
        required: true
    },
    total: Number,
    state: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: false,
        versionKey: false
    });

schema.pre<Order>('save', async function(next) {
    const data: any = this;
    const sequence = await getSequenceValue("order_sequence");
    data.orderId = formatUID(sequence);
    next();
});

const formatUID = (value: number) => {
    let uid = "";
    for (let i = value.toString().length; i <= constants.UID_LENGTH; i++) {
        uid += '0';
    }
    return `${uid}${value}`;
}

export default model<Order>('order', schema)