import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';
import { ReportInventory, reportInventoryConverter } from '../models/ReportInventory';
import { ReportOrder, reportOrderConverter } from '../models/ReportOrder';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReportsOrder() {
    return this.http.get<any[]>(`${CONSTANTS.API_URL}/reports/orders`);
  }

  postReportOrder(report: ReportOrder) {
    return this.http.post(`${CONSTANTS.API_URL}/reports/orders`, reportOrderConverter.toJSON(report));
  }

  getReportOrderByID(id: string) {
    return this.http.get(`${CONSTANTS.API_URL}/reports/orders/order/${id}`);
  }

  putReportOrderByID(id:string, report: ReportOrder) {
    return this.http.put(`${CONSTANTS.API_URL}/reports/orders/order/${id}`, reportOrderConverter.toJSON(report));
  }

  getReportsInventory() {
    return this.http.get<any[]>(`${CONSTANTS.API_URL}/reports/inventories`);
  }

  postReportInventory(report: ReportInventory) {
    return this.http.post(`${CONSTANTS.API_URL}/reports/inventories`, reportInventoryConverter.toJSON(report));
  }

  getReportInventoryByID(id: string) {
    return this.http.get(`${CONSTANTS.API_URL}/reports/inventories/inventory/${id}`);
  }

  putReportInventoryByID(id:string, report: ReportInventory) {
    return this.http.put(`${CONSTANTS.API_URL}/reports/inventories/inventory/${id}`, reportInventoryConverter.toJSON(report));
  }

}
