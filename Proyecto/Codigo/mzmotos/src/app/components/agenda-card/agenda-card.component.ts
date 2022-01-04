import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Appointment } from 'src/app/models/Appointment';

@Component({
  selector: 'app-agenda-card',
  templateUrl: './agenda-card.component.html',
  styleUrls: ['./agenda-card.component.css']
})
export class AgendaCardComponent implements OnInit {

  @Input() appointment: Appointment;
  @Input() disableDelete: any;
  @Input() style: string;
  @Output() notificationEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();

  date: string;

  @ViewChild("agreeForm") agreeForm: ElementRef;
  @ViewChild("notifyForm") notifyForm: ElementRef;
  @ViewChild("appointmentForm") appointmentForm: ElementRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.setDate();
  }

  ngOnChange() {
    this.setDate();
  }

  setDate() {
    this.date = moment(this.appointment.date).format("YYYY/MM/DD HH:mm");
  }

  showAgreeForm() {
    this.triggerModal(this.agreeForm);
  }

  showNotifyForm() {
    this.triggerModal(this.notifyForm);
  }

  showAppointmentForm(){
    this.triggerModal(this.appointmentForm);
  }

  triggerModal(content: any) {
    this.modalService.open(content).result;
  }

  notify(application: string) {
    this.notificationEvent.emit();
    this.modalClose();
  }

  updateAppointment(appointment: Appointment) {
    this.appointment = appointment;
    this.updateEvent.emit(this.appointment);
    this.modalClose();
  }

  checkCard() {
    this.appointment.state = !this.appointment.state;
    this.updateEvent.emit(this.appointment)
  }

  deleteCard() {
    this.deleteEvent.emit(this.appointment);
    this.modalClose();
  }

  modalClose() {
    this.modalService.dismissAll();
  }

}
