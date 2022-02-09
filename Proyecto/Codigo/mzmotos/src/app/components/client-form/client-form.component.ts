import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/Client';
import { NgForm } from '@angular/forms';
import { phoneChecker } from 'src/lib/utils';
import { ERROR_MESSAGE_WRONG_PHONE, ERROR_TITLE } from 'src/lib/strings';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  @Input() client;
  @Output() onSubmitEvent = new EventEmitter<any>();

  input = {
    name: "",
    lastname: "",
    email: "",
    RUC: "",
    phone: "",
    address: "",
    city: "",
    surname: "",
    id: ""
  }

  constructor(
    private clientService: ClientService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.client) {
      this.input.RUC = this.client.RUC;
      this.input.name = this.client.name;
      this.input.surname = this.client.surname;
      this.input.email = this.client.email;
      this.input.phone = this.client.phone;
      this.input.address = this.client.address;
      this.input.city = this.client.city;
      this.input.id = this.client.id;
    }
  }

  onChange(value: any) {
    console.log(value);
  }

  onSubmit(clientForm: NgForm) {
    if (!this.checkCreateForm(clientForm.value) && !this.client) {
      this.toast.error("Complete todos los campos", 'Error', {
        timeOut: 1500,
      });
      return;
    } else if (!this.checkEditForm(clientForm.value)) {
      this.toast.error("Complete todos los campos", 'Error', {
        timeOut: 1500,
      });
      return;
    }
    if(!phoneChecker(clientForm.value.phone)){
      this.toast.error(ERROR_MESSAGE_WRONG_PHONE, ERROR_TITLE, {
        timeOut: 1500,
      });
      return;
    }

    if (!!this.client) {
      this.onEditData(clientForm.value);
    } else {
      this.onCreateData(clientForm.value);
    }
  }

  checkCreateForm(data: any) {
    return !!data.name && !!data.email && !!data.phone && !!data.address && !!data.city && !!data.RUC && !!data.surname
  }

  checkEditForm(data: any) {
    return !!data.name && !!data.surname && !!data.email && !!data.phone && !!data.address && !!data.city
  }

  onEditData(data: any) {
    const newData: any = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
    }

    this.clientService.putClientByID(this.client._id, newData).subscribe(
      (data: any) => {
        this.onSubmitEvent.emit(data);
      }
    );
  }

  onCreateData(data: any) {
    const client: Client = {
      RUC: data.RUC,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      _id: data.id
    };
    this.clientService.postClient(client).subscribe(
      (data: any) => {
        this.onSubmitEvent.emit(data);
      }
    );

  }


}
