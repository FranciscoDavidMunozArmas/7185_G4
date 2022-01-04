import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${CONSTANTS.API_URL}/users`);
  }

  deleteUsers() {
    return this.http.delete(`${CONSTANTS.API_URL}/users`);
  }

  sigin(username: string, password: string) {
    return this.http.post(`${CONSTANTS.API_URL}/users/signin`, {username, password});
  }

  updatePassword(username:string, password: string) {
    return this.http.put(`${CONSTANTS.API_URL}/users/password/${username}`, {username, password});
  }

  getUserByID(id: string) {
    return this.http.get(`${CONSTANTS.API_URL}/user/users/${id}`);
  }

  deleteUserByID(id: string) {
    return this.http.delete(`${CONSTANTS.API_URL}/user/users/${id}`);
  }
}
