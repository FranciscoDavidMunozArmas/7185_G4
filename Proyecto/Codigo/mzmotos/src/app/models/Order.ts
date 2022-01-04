import * as moment from "moment";
import { CONSTANTS } from "src/lib/constants";
import { Client, clientConverter } from "./Client";
import { Product, productConverter } from "./Product";

class ProductOrder{
    product: Product;
    quantity: number;
    constructor(product: any, quantity: number){
        this.product = productConverter.fromJSON(product);
        this.quantity = quantity;
    }
}

const productOrderConverter = {
    fromJSON: (json: any): ProductOrder => {
        return new ProductOrder(json.product, json.quantity);
    },
    toJSON: (productOrder: ProductOrder): any => {
        return {
            product: productConverter.toJSON(productOrder.product),
            quantity: productOrder.quantity
        };
    }
}

export class Order {
    _id?: string;
    orderId: string;
    salesman: string;
    date: Date;
    client: Client;
    list: ProductOrder[];
    total: number;
    state: boolean;
    constructor(orderId: string, salesman: string, date: any, client: any, list: any[], total: number, state: boolean, id?: string) {
        this.orderId = (orderId) ? orderId : "";
        this.salesman = salesman;
        this.date = new Date(date);
        this.client = clientConverter.fromJSON(client);
        if (list) {
            this.list = list.map(productOrderConverter.fromJSON);
        } else {
            this.list = [];
        }
        this.list = list;
        this.total = total;
        this.state = state;
        this._id = id;
    }
}

export const orderConverter = {
    fromJSON: (json: any): Order => {
        return new Order(json.orderId, json.salesman, json.date, json.client, json.list, json.total, json.state, json._id);
    },
    toJSON: (order: Order): any => {
        return {
            orderId: order.orderId,
            salesman: order.salesman,
            date: moment(order.date).format(CONSTANTS.DATE_FORMAT),
            client: clientConverter.toJSON(order.client),
            list: order.list.map(productOrderConverter.toJSON),
            total: order.total,
            state: order.state,
            _id: order._id
        };
    }
}