import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';
import { Appointment, appointmentConverter } from '../models/Appointment';
import { Salesman } from '../models/Salesman';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {}

  getAppointments(salesmanid: string) {
    return this.http.get(`${CONSTANTS.API_URL}/salesmen/appointments/${salesmanid}`);
  }

  postAppointment(salesmanid: string, appointment: Appointment) {
    return this.http.post<Salesman>(`${CONSTANTS.API_URL}/salesmen/appointments/${salesmanid}`, appointmentConverter.toJSON(appointment));
  }
  
  deleteAppointments(salesmanid: string) { 
    return this.http.delete(`${CONSTANTS.API_URL}/salesmen/appointments/${salesmanid}`);
  }

  getAppointment(salesmanid: string, appointmentid: string) {
    return this.http.get(`${CONSTANTS.API_URL}/salesmen/appointments/${salesmanid}/${appointmentid}`);
  }

  putAppointment(salesmanid: string, appointmentid: string, appointment: Appointment) {
    return this.http.put<Appointment[]>(`${CONSTANTS.API_URL}/salesmen/appointments/${salesmanid}/${appointmentid}`, appointmentConverter.toJSON(appointment));
  }

  deleteAppointment(salesmanid: string, appointmentid: string) {
    return this.http.delete(`${CONSTANTS.API_URL}/salesmen/appointments/${salesmanid}/${appointmentid}`);
  }

}
