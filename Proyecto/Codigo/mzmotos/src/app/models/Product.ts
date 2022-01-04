export class Product {
    _id?: string;
    productid?: string;
    name: string;
    image: string;
    price: number;
    stock: number;

    constructor(productid: string, name: string, image: string, price: number, stock: number, id?: string) {
        this.productid = (productid) ? productid : "";
        this.name = name;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this._id = id;
    }
}

export const productConverter = {
    fromJSON: (json: any): Product => {
        return new Product(json.productid, json.name, json.image, json.price, json.stock, json._id);
    },
    toJSON: (product: Product): any => {
        return {
            productid: product.productid,
            name: product.name,
            image: product.image,
            price: product.price,
            stock: product.stock,
            _id: product._id
        };
    }
}