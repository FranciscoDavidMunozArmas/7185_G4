import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';
import { User, userConverter } from '../models/User';
import { Warehouse, warehouseConverter } from '../models/Warehouser';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  getWarehouses() {
    return this.http.get(`${CONSTANTS.API_URL}/warehouses`);
  }

  postWarehouse(user: User, warehouse: Warehouse) {
    return this.http.post(`${CONSTANTS.API_URL}/warehouses`, {...warehouseConverter.toJSON(warehouse), ...userConverter.toJSON(user)});
  }

  deleteWarehouses() {
    return this.http.delete(`${CONSTANTS.API_URL}/warehouses`);
  }

  getWarehouseByID(id: string) {
    return this.http.get(`${CONSTANTS.API_URL}/warehouses/one/${id}`);
  }

  putWarehouseByID(id: string, warehouse: Warehouse) {
    return this.http.put(`${CONSTANTS.API_URL}/warehouses/one/${id}`, warehouseConverter.toJSON(warehouse));
  }

  deleteWarehouseByID(id: string) {
    return this.http.delete(`${CONSTANTS.API_URL}/warehouses/one/${id}`);
  }

  getWarehouseByUsename(usename: string) {
    return this.http.get(`${CONSTANTS.API_URL}/warehouses/username/${usename}`);
  }
}
