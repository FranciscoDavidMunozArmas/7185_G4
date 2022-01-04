import { Document } from "mongoose"
import { Appointment } from "./appointment.interface"

export interface Salesman extends Document {
    _id?: string,
    userid:string,
    name: string,
    surname: string,
    address: string,
    phone: string,
    email: string,
    appointments: Appointment[]
}

export const salesmanConverter = {
    convertJSON: (json: any) => {
        return {
            _id: json._id,
            userid: json.userid,
            name: json.name,
            surname: json.surname,
            address: json.address,
            phone: json.phone,
            email: json.email,
            appointments: json.appointments
        }
    }
}