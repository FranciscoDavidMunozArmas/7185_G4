import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Manager } from 'src/app/models/Manager';
import { Salesman } from 'src/app/models/Salesman';
import { User } from 'src/app/models/User';
import { Warehouse } from 'src/app/models/Warehouser';
import { ManagerService } from 'src/app/services/manager.service';
import { SalesmanService } from 'src/app/services/salesman.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { CONSTANTS } from 'src/lib/constants';
import { IdVerificator } from 'src/lib/idVerificator';
import { GENERATE_PASSWORD_BUTTON_NAME, HINT_ADDRESS, HINT_CI_RUC, HINT_EMAIL, HINT_NAME, HINT_PASSWORD, HINT_PHONE, HINT_SURNAME, HINT_USERNAME, SAVE_BUTTON_NAME } from 'src/lib/strings';
import { passwordGenerator } from '../../../lib/constants';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user;
  @Output() onSubmitEvent = new EventEmitter<any>();

  roles: String[] = CONSTANTS.ROLES;

  input = {
    ci: "",
    username: "",
    password: "",
    role: this.roles[0],
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
  }

  hint = {
    username: HINT_USERNAME,
    password: HINT_PASSWORD,
    name: HINT_NAME,
    surname: HINT_SURNAME,
    ci: HINT_CI_RUC,
    email: HINT_EMAIL,
    phone: HINT_PHONE,
    address: HINT_ADDRESS,
  }

  ui = {
    saveButton: SAVE_BUTTON_NAME,
    generateButton: GENERATE_PASSWORD_BUTTON_NAME,
  }

  constructor(
    private salesmanService: SalesmanService,
    private warehouseService: WarehouseService,
    private managerService: ManagerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.onGenerate();
    if (this.user) {
      this.input.role = this.user.role;
      this.input.ci = this.user.ci;
      this.input.name = this.user.name;
      this.input.surname = this.user.surname;
      this.input.email = this.user.email;
      this.input.phone = this.user.phone;
      this.input.address = this.user.address;
    }
  }

  onGenerate() {
    this.input.password = passwordGenerator(8);
  }

  onChange(value: any) {
    console.log(value);
  }

  onSubmit(userForm: NgForm) {
    if (!this.checkCreateForm(userForm.value) && !this.user) {
      this.toast.error("Complete todos los campos", 'Error', {
        timeOut: 1500,
      });
      return;
    } else if (!this.checkEditForm(userForm.value)) {
      this.toast.error("Complete todos los campos", 'Error', {
        timeOut: 1500,
      });
      return;
    }
    if(!IdVerificator.verify(userForm.value.ci)) {
      this.toast.error("Cedula incorrecta", 'Error', {
        timeOut: 1500,
      });
      return;
    };

    if (!!this.user) {
      this.onEditData(userForm.value);
    } else {
      this.onCreateData(userForm.value);
    }
  }

  checkCreateForm(data: any) {
    return !!data.name && !!data.surname && !!data.email && !!data.phone && !!data.address && !!data.username && !!data.password
  }

  checkEditForm(data: any) {
    return !!data.name && !!data.surname && !!data.email && !!data.phone && !!data.address
  }

  onEditData(data: any) {
    const newData: any = {
      ci: data.ci,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      address: data.address,
    }
    switch (this.input.role) {
      case "salesman":
        this.salesmanService.putSalesman(this.user._id, newData).subscribe(
          (data: any) => {
            data.role = "salesman";
            this.onSubmitEvent.emit(data);
          }
        );
        break;
      case "warehouse":
        this.warehouseService.putWarehouseByID(this.user._id, newData).subscribe(
          (data: any) => {
            data.role = "warehouse";
            this.onSubmitEvent.emit(data);
          }
        );
        break;
      case "admin":
        this.managerService.putManagerByID(this.user._id, newData).subscribe(
          (data: any) => {
            data.role = "admin";
            this.onSubmitEvent.emit(data);
          }
        );
        break;
    }
  }

  onCreateData(data: any) {
    const user: User = {
      username: data.username,
      password: data.password,
      role: data.role,
    };
    const userData = {
      userid: "",
      ci: data.ci,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      address: data.address,
    }
    switch (data.role) {
      case "salesman":
        const salesman: Salesman = {
          ...userData,
          appointments: [],
        }
        this.salesmanService.postSalesman(user, salesman).subscribe(
          (data: any) => {
            data.role = "salesman";
            this.onSubmitEvent.emit(data);
          }
        );
        break;
      case "warehouse":
        const warehouse: Warehouse = userData;
        this.warehouseService.postWarehouse(user, warehouse).subscribe(
          (data: any) => {
            data.role = "warehouse";
            this.onSubmitEvent.emit(data);
          }
        );
        break;
      case "admin":
        const admin: Manager = userData;
        this.managerService.postManager(user, admin).subscribe(
          (data: any) => {
            data.role = "admin";
            this.onSubmitEvent.emit(data);
          }
        );
        break;
    }
  }
}
