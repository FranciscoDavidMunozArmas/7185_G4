import { Schema, model } from "mongoose";
import constants from "../../lib/constants";
import { getSequenceValue } from "../../lib/sequence/sequenceMongo";
import { ReportOrder } from "../interface/reportOrder.interface";

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
    salesman: String,
    orderId: String,
},
{
    timestamps: false,
    versionKey: false
});

schema.pre<ReportOrder>('save', async function(next) {
    const data: any = this;
    const sequence = await getSequenceValue("reportorder_sequence");
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

export default model<ReportOrder>('reportorder', schema)