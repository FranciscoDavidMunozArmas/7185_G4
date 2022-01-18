import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';
import { Salesman, salesmanConverter } from '../models/Salesman';
import { User, userConverter } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SalesmanService {

  constructor(private http: HttpClient) {
  }

  getSalesmen() {
    return this.http.get<any[]>(`${CONSTANTS.API_URL}/salesmen`);
  }

  postSalesman(user: User, salesman: Salesman) {
    return this.http.post(`${CONSTANTS.API_URL}/salesmen`, {...salesmanConverter.toJSON(salesman), ...userConverter.toJSON(user)});
  }

  deleteSalesmen() { 
    return this.http.delete(`${CONSTANTS.API_URL}/salesmen`);
  }

  getSalesmanByID(id: string) {
    return this.http.get(`${CONSTANTS.API_URL}/salesmen/salesman/${id}`);
  }

  putSalesman(id: string, salesman: Salesman) {
    return this.http.put(`${CONSTANTS.API_URL}/salesmen/salesman/${id}`, salesman);
  }

  deleteSalesmanByID(id: string) {
    return this.http.delete(`${CONSTANTS.API_URL}/salesmen/salesman/${id}`);
  }

  getSalesmanbyUsername(username: string) {
    return this.http.get(`${CONSTANTS.API_URL}/salesmen/username/${username}`);
  }
}
