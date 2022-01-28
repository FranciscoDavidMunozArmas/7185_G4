import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Appointment, appointmentConverter } from 'src/app/models/Appointment';
import { Client, clientConverter } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/lib/auth.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  @Input() appointment: Appointment;
  @Input() date: Date;

  @Output() saveEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();

  input = {
    clientId: "",
    date: ""
  }

  clients: Client[] = []
  selectedClient: Client = {
    _id: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    RUC: "",
    address: "",
    city: "",
  };
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
    this.input.date = moment(new Date).format("YYYY-MM-DDTHH:MM");
    if (this.appointment) {
      this.selectedClient = this.appointment.client;
      this.input.date = moment(this.appointment.date).format("YYYY-MM-DDTHH:MM");
    }
    if (this.date) {
      this.input.date = moment(this.date).format("YYYY-MM-DDTHH:MM");
    }
  }

  onChange(value: any) {
  }

  getClients() {
    this.clientService.getClients()
      .subscribe(
        (res) => {
          this.clients = res.map(clientConverter.fromJSON);
          this.input.clientId = this.clients[0]._id;
        }, (err) => console.log(err)
      )
  }

  submitForm(appointmentForm: NgForm) {
    let appointment = {};
    if (this.selectedClient.name !== "") {
      if (this.appointment) {
        appointment = {
          client: clientConverter.toJSON(this.selectedClient),
          date: appointmentForm.value.date
        };
      } else {
        appointment = {
          client: clientConverter.toJSON(this.selectedClient),
          date: appointmentForm.value.date,
          state: false
        };
      }
      this.saveEvent.emit(appointmentConverter.fromJSON(appointment));
    }
  }

  selectClient(client: Client) {
    this.selectedClient = client;
  }

  cancelForm() {
    this.cancelEvent.emit();
  }

}
