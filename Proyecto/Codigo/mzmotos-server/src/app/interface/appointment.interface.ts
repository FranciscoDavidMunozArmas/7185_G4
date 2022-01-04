import { Document } from "mongoose"
import { Client, clientConverter } from "./client.interface";

export interface Appointment extends Document {
    _id?: string,
    date: Date,
    state: boolean,
    client: Client,
}

export const appointmentConverter = {
    convertJSON: (json: any) => {
        return {
            _id: json._id,
            date: json.date,
            state: json.state,
            client: clientConverter.convertJSON(json.client),
        }
    },
}