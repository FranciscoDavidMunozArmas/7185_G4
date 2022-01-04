import { Document } from "mongoose"

export interface Product extends Document{
    _id?: string,
    productid?: string,
    name: string,
    image: string,
    price: number,
    stock: number,
}

export const productConverter = {
    convertJSON: (json: any) => {
        return {
            _id: json._id,
            productid: json.productid,
            name: json.name,
            image: json.image,
            price: json.price,
            stock: json.stock,
        }
    }
}