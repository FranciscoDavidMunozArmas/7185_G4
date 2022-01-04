import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/models/Appointment';
import { Salesman, salesmanConverter } from 'src/app/models/Salesman';
import { decode } from 'src/lib/token';

import { Router } from '@angular/router';
import { SalesmanService } from 'src/app/services/salesman.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/lib/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  salesman: Salesman;
  appointments: Appointment[];
  resultAppointments: Appointment[];
  todayappointments: Appointment[];
  appointmentDays: Date[];
  date: Date;
  showMore: Boolean = false;
  selectedDay: string;

  private token: any;

  @ViewChild("setAppointment") setAppointment: ElementRef;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("allAppointmentsModal") allAppointmentsModal: ElementRef;
  @ViewChild("resultAppointment") resultAppointmentModal: ElementRef;

  constructor(private modalService: NgbModal,
    private auth: AuthService,
    private router: Router,
    private salesmanService: SalesmanService,
    private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.token = decode(this.auth.getToken());
    this.getSalesman(this.token.user);
  }

  getSalesman(id: string) {
    this.salesmanService.getSalesmanByID(id)
    .subscribe(res => {
      this.salesman = salesmanConverter.fromJSON(res);
      this.appointments = this.salesman.appointments;
      this.setAppointmentDays();
      this.setTodayAppointment(new Date());
    });
  }

  addAppointment(appointment: Appointment) {
    this.appointmentService.postAppointment(this.token.user, appointment)
    .subscribe(res => {
      this.salesman = res;
      this.appointments = this.salesman.appointments;
      this.setAppointmentDays();
      this.setTodayAppointment(this.date);
      this.modalClose();
    });
  }

  removeAppointment(appointment: Appointment) {
    this.appointmentService.deleteAppointment(this.token.user, appointment._id)
    .subscribe(res => {
      this.appointments = this.salesman.appointments.filter((element: Appointment) => element._id !== appointment._id);
      this.setAppointmentDays();
      this.setTodayAppointment(this.date);
      this.modalClose();
    });
  }

  updateAppointement(appointment: Appointment) {
    this.appointmentService.putAppointment(this.token.user, appointment._id, appointment)
    .subscribe(
      res => {
        this.appointments = res;
        this.setAppointmentDays();
        this.setTodayAppointment(this.date);
      }
    );
  }

  setTodayAppointment(date: Date){
    this.todayappointments = [];
    this.selectedDay = this.dateToString(date);
    this.date = date;
    this.appointments.forEach((element: Appointment) => {
      const elementDate = new Date(element.date);
      if(elementDate.getFullYear() === date.getFullYear() &&
      elementDate.getMonth() === date.getMonth() &&
      elementDate.getDate() === date.getDate()){
        this.todayappointments.push(element)
      }
    })
  }

  dateToString(date: Date): string {
    return moment(date).format('YYYY/MM/DD');
  }

  setAppointmentDays() {
    this.appointmentDays = this.appointments.map((element: Appointment) => new Date(element.date));
  }

  setShowMore() {
    this.showMore = !this.showMore;
  }

  search(text: string) {
    this.resultAppointments = [];
    const regexRUC = /^[0-9]{13}$/;
    const regexCI = /^[0-9]{10}$/;
    const regexDate = /^(?:[0-9]{2})?[0-9]{2}[-/][0-3]?[0-9][-/][0-3]?[0-9][\s*-\s*](?:[0-9]{2})?[0-9]{2}[-/][0-3]?[0-9][-/][0-3]?[0-9]$/;
    console.log(regexRUC)
    if(regexRUC.test(text) || regexCI.test(text)) {
      this.appointments.forEach((element: Appointment) => {
        if(element.client.RUC === text){
          this.resultAppointments.push(element);
        }
      });
    } else if (text.match(regexDate)) {
      let [lower, upper] = text.split('-').sort();
      const lowerDate = new Date(lower);
      const upperDate = new Date(upper);
      this.appointments.forEach((element: Appointment) => {
        const elementDate = new Date(element.date);
        if(
          (lowerDate.getFullYear() <= elementDate.getFullYear() && elementDate.getFullYear() <= upperDate.getFullYear()) &&
          (lowerDate.getMonth() <= elementDate.getMonth() && elementDate.getMonth() <= upperDate.getMonth()) &&
          (lowerDate.getDate() <= elementDate.getDate() && elementDate.getDate() <= upperDate.getDate())
        ){
          this.resultAppointments.push(element);
        }
      });
    } else {
      this.resultAppointments = this.appointments.filter((element: Appointment) => element.client.name === text)
    }
    this.modalClose();
    this.showResultAppointment();
  }

  showResultAppointment(){
    this.triggerModal(this.resultAppointmentModal);
  }

  showSetAppointmentModal() {
    this.triggerModal(this.setAppointment);
  }

  showAllAppointmentsModal() {
    this.triggerModal(this.allAppointmentsModal);
  }

  showSearchBox() {
    this.triggerModal(this.searchBox);
  }

  triggerModal(content: any) {
    this.modalService.open(content).result;
  }

  modalClose() {
    this.modalService.dismissAll();
  }

}
