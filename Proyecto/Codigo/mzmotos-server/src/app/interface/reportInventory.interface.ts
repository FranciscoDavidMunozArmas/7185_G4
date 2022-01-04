import { Order } from "./order.interface";
import { Product, productConverter } from "./product.interface";
import { Report, reportConverter } from "./report.interface";

interface ProductItem {
    product: Product,
    added: number,
    removed: number,
}

const productItemConverter = {
    convertJSON: (json: any) => {
        return {
            product: productConverter.convertJSON(json.product),
            added: json.added,
            removed: json.removed,
        }
    }
}

export interface ReportInventory extends Report {
    items: ProductItem[]
}

export const reportInventoryConverter = {
    convertJSON: (json: any) => {
        return {
            ...reportConverter.convertJSON(json),
            items: json.items.map(productItemConverter.convertJSON)
        }
    },
}