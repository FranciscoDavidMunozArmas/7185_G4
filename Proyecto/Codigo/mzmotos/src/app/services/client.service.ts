import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';
import { Client, clientConverter } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<any[]>(`${CONSTANTS.API_URL}/clients`);
  }

  postClient(client: Client) {
    return this.http.post(`${CONSTANTS.API_URL}/clients`, clientConverter.toJSON(client));
  }

  deleteClients(id: string) {
    return this.http.delete(`${CONSTANTS.API_URL}/clients/${id}`);
  }

  getClientByID(id: string) {
    return this.http.get(`${CONSTANTS.API_URL}/clients/client/${id}`);
  }

  putClientByID(id: string, client: Client) {
    return this.http.put(`${CONSTANTS.API_URL}/clients/client/${id}`, clientConverter.toJSON(client));
  }

  deleteClientByID(id: string) {
    return this.http.delete(`${CONSTANTS.API_URL}/clients/client/${id}`);
  }

  getClientsMany(many: string[]){
    return this.http.post(`${CONSTANTS.API_URL}/clients/many`, many);
  }

  sendsms(phone: string, message: string){
    return this.http.post(`${CONSTANTS.API_URL}/notify/sms`, {phone,message});
  }

  sendEmail(email: string, subject: string, message: string){
    return this.http.post(`${CONSTANTS.API_URL}/notify/email`, {email, subject,message});
  }
}
