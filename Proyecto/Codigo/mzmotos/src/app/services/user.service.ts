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

  signin(username: string, password: string) {
    return this.http.post(`${CONSTANTS.API_URL}/users/signin`, {username: username, password: password});
  }

  updatePassword(username:string, password: string) {
    return this.http.put(`${CONSTANTS.API_URL}/users/password/${username}`, {username, password});
  }

  getUserByUsername(username: string) {
    return this.http.get(`${CONSTANTS.API_URL}/users/username/${username}`);
  }
}
