export class Client {
    _id?: string;
    RUC: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    address: string;
    city: string;

    constructor(RUC: string, name: string, surname: string, email: string, phone: string, address: string, city: string, id?: string) {
        this.RUC = RUC;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this._id = id;
    }
}

export const clientConverter = {
    fromJSON: (json: any): Client => {
        return new Client(json.RUC, json.name, json.surname, json.email, json.phone, json.address, json.city, json._id);
    },
    toJSON: (client: Client): any => {
        return {
            RUC: client.RUC,
            name: client.name,
            surname: client.surname,
            email: client.email,
            phone: client.phone,
            address: client.address,
            city: client.city,
            _id: client._id
        };
    }
}