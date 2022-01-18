import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';
import { Manager, managerConverter } from '../models/Manager';
import { User, userConverter } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  getManagers() {
    return this.http.get<any[]>(`${CONSTANTS.API_URL}/managers`);
  }

  postManager(user: User, manager: Manager) {
    console.log(user);
    console.log(manager);
    return this.http.post(`${CONSTANTS.API_URL}/managers`, { ...managerConverter.toJSON(manager), ...userConverter.toJSON(user) });
  }

  deleteManagers() {
    return this.http.delete(`${CONSTANTS.API_URL}/managers`);
  }

  getManagerByID(id: string) {
    return this.http.get<any>(`${CONSTANTS.API_URL}/managers/one/${id}`);
  }

  putManagerByID(id: String, manager: Manager) {
    return this.http.put(`${CONSTANTS.API_URL}/managers/one/${id}`, managerConverter.toJSON(manager));
  }

  deleteManagerByID(id: String) {
    return this.http.delete(`${CONSTANTS.API_URL}/managers/one/${id}`);
  }

  getManagerByUsername(username: string) {
    return this.http.get<any>(`${CONSTANTS.API_URL}/managers/username/${username}`);
  }
}
