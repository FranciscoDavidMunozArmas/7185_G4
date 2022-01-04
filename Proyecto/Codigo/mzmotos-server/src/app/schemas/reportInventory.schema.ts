import { Schema, model } from "mongoose";
import constants from "../../lib/constants";
import { getSequenceValue } from "../../lib/sequence/sequenceMongo";
import { ReportInventory } from "../interface/reportInventory.interface";

const schema = new Schema({
    reportid: String,
    employee: String,
    date: {
        type: Date,
        default: Date.now
    },
    view: {
        type: Boolean,
        default: false
    },
    items: [{
        product: {
            productid: String,
            name: String,
            image: String,
            price: Number,
        },
        added: {
            type: Number,
            default: 0
        },
        removed: {
            type: Number,
            default: 0
        },
    }]
},
    {
        timestamps: false,
        versionKey: false
    });

schema.pre<ReportInventory>('save', async function (next) {
    const data: any = this;
    const sequence = await getSequenceValue("reportinventory_sequence");
    data.reportid = formatUID(sequence);
    next();
});

const formatUID = (value: number) => {
    let uid = "";
    for (let i = value.toString().length; i <= constants.UID_LENGTH; i++) {
        uid += '0';
    }
    return `${uid}${value}`;
}

export default model<ReportInventory>('reportinventory', schema)