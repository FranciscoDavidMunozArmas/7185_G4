import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  @Input() data:Appointment;

  @Output() notifyEvent= new EventEmitter<string>();
  @Output() cancelEvent= new EventEmitter<any>();

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    
  }

  notify() {
    this.notifyEvent.emit();
  }

  cancel() {
    this.cancelEvent.emit();
  }

  notifyWhatsApp(){
    window.open(`https://api.whatsapp.com/send?phone=593${this.data.client.phone.slice(1)}&text=Recordar%20que%20su%20visita%20esta%20agendada%20para%20la%20fecha%20${this.data.date}`,"_blank");
  }

  notifySMS(){
    this.clientService.sendsms(`593${this.data.client.phone.slice(1)}`,`Recordar que su visita esta agendada para la fecha ${this.data.date}`);
  }

  notifyEmail(){
    this.clientService.sendEmail(this.data.client.email, "Recordatorio visita", `Recordar que su visita esta agendada para la fecha ${this.data.date}`);
  }

}
