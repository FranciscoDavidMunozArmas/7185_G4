import { Document } from "mongoose";

export interface Report extends Document {
    _id?: string,
    reportid: string,
    employee: string,
    date: Date,
    view: boolean,
}

export const reportConverter = {
    convertJSON: (json: any) => {
        return {
            _id: json._id,
            reportid: json.reportid,
            employee: json.employee,
            date: json.date,
            view: json.view,
        }
    }
}