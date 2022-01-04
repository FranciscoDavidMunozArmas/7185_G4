import { Client, clientConverter } from "./client.interface";
import { Order, orderConverter } from "./order.interface";
import { Report, reportConverter } from "./report.interface";

export interface ReportOrder extends Report {
    salesman: string,
    orderId: string
}

export const reportOrderConverter = {
    convertJSON: (json: any) => {
        return {
            ...reportConverter.convertJSON(json),
            salesman: json.salesman,
            orderId: json.orderId
        }
    },
    joinReportOrder: (report: ReportOrder, order: Order) => {
        return {
            ...reportOrderConverter.convertJSON(report),
            ...orderConverter.convertJSON(order)
        }
    }
}