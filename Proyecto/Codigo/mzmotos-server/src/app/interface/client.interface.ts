import { Document } from "mongoose"

export interface Client extends Document{
    _id?: string,
    RUC:string,
    name: string,
    surname: string,
    address:string,
    city: string
}

export const clientConverter = {
    convertJSON: (json: any) => {
        return {
            _id: json._id,
            RUC: json.RUC,
            name: json.name,
            surname: json.surname,
            address: json.address,
            city: json.city
        }
    }
}
