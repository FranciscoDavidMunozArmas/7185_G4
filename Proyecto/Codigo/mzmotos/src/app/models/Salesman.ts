import { Appointment, appointmentConverter } from "./Appointment";

export class Salesman {
    _id?: string;
    userid: string;
    ci: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    email: string;
    appointments: Appointment[];

    constructor(userid: string, ci: string, name: string, surname: string, address: string, phone: string, email: string, appointments: any[], id?: string) {
        this.userid = userid;
        this.ci = ci;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.phone = phone;
        this.email = email;
        if (appointments) {
            this.appointments = appointments.map(appointmentConverter.fromJSON);
        } else {
            this.appointments = [];
        }
        this.appointments = appointments;
        this._id = id;
    }
}

export const salesmanConverter = {
    fromJSON: (json: any): Salesman => {
        return new Salesman(json.userid, json.ci, json.name, json.surname, json.address, json.phone, json.email, json.appointments, json._id);
    },
    toJSON: (salesman: Salesman): any => {
        return {
            userid: salesman.userid,
            ci: salesman.ci,
            name: salesman.name,
            surname: salesman.surname,
            address: salesman.address,
            phone: salesman.phone,
            email: salesman.email,
            appointments: salesman.appointments.map(appointmentConverter.toJSON),
            _id: salesman._id
        };
    }
};