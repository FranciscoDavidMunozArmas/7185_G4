import * as moment from "moment";
import { CONSTANTS } from "src/lib/constants";
import { Report } from "./Report";

export class ReportOrder extends Report{
    salesman: string;
    orderId: string;

    constructor(reportid: string, employee: string, date: any, view: boolean, orderId: string, salesman: string, id?: string) {
        super(reportid, employee, date, view, id);
        this.salesman = salesman;
        this.orderId = orderId;
    }
}

export const reportOrderConverter = {
    fromJSON: (json: any): ReportOrder => {
        return new ReportOrder(json.reportid, json.employee, json.date, json.view, json.orderId, json.salesman, json._id);
    },
    toJSON: (reportOrder: ReportOrder): any => {
        return {
            reportid: reportOrder.reportid,
            employee: reportOrder.employee,
            date: moment(reportOrder.date).format(CONSTANTS.DATE_FORMAT),
            view: reportOrder.view,
            orderId: reportOrder.orderId,
            salesman: reportOrder.salesman,
            _id: reportOrder._id
        };
    }
};