export class Report {
    _id?: string;
    reportid: string;
    employee: string;
    date: Date;
    view: boolean;

    constructor(reportid: string, employee: string, date: any, view: boolean, id?: string) {
        this.reportid = reportid;
        this.employee = employee;
        this.date = new Date(date);
        this.view = view;
        this._id = id;
    }
}