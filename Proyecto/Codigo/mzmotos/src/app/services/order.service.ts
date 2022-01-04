import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';
import { Order, orderConverter } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<any[]>(`${CONSTANTS.API_URL}/orders`);
  }

  postOrder(order: Order) {
    return this.http.post(`${CONSTANTS.API_URL}/orders`, orderConverter.toJSON(order));
  }

  deleteOrders() {
    return this.http.delete(`${CONSTANTS.API_URL}/orders`);
  }

  getOrderByID(id: string) {
    return this.http.get<any>(`${CONSTANTS.API_URL}/orders/order/${id}`);
  }

  putOrderByID(id:String, order: Order) {
    return this.http.put(`${CONSTANTS.API_URL}/orders/order/${id}`, orderConverter.toJSON(order));  
  }

  deleteOrderByID(id: String) {
    return this.http.delete(`${CONSTANTS.API_URL}/orders/order/${id}`);
  }

  getOrdersBySalesman(salesman: string) {
    return this.http.get<any[]>(`${CONSTANTS.API_URL}/orders/salesman/${salesman}`);
  }

  deleteOrdersBySalesman(salesman: string) {
    return this.http.delete(`${CONSTANTS.API_URL}/orders/salesman/${salesman}`);
  }
}
