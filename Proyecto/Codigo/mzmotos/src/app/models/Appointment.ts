import * as moment from "moment";
import { CONSTANTS } from "src/lib/constants";
import { Client, clientConverter } from "./Client";

export class Appointment {
    _id?: string;
    client: Client;
    date: Date;
    state: boolean;

    constructor(client: Client, date: any, state: boolean, id?: string) {
        this.client = client;
        this.date = new Date(date);
        this.state = state;
        this._id = id;
    }
}

export const appointmentConverter = {
    fromJSON: (json: any): Appointment => {
        return new Appointment(json.client, json.date, json.state, json._id);
    },
    toJSON: (appointment: Appointment): any => {
        return {
            client: clientConverter.toJSON(appointment.client),
            date: moment(appointment.date).format(CONSTANTS.DATE_FORMAT),
            state: appointment.state,
            _id: appointment._id
        };
    }
}