export class Client {
    _id?: string;
    RUC: string;
    name: string;
    address: string;
    city: string;

    constructor(RUC:string, name: string, address:string, city: string, id?: string) {
        this.RUC = RUC;
        this.name = name;
        this.address = address;
        this.city = city;
        this._id = id;
    }
}

export const clientConverter = {
    fromJSON: (json: any): Client => {
        return new Client(json.RUC, json.name, json.address, json.city, json._id);
    },
    toJSON: (client: Client): any => {
        return {
            RUC: client.RUC,
            name: client.name,
            address: client.address,
            city: client.city,
            _id: client._id
        };
    }
}