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
    username: "",
    password: "",
    role: this.roles[0],
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
  }

  constructor(
    private salesmanService: SalesmanService,
    private warehouseService: WarehouseService,
    private managerService: ManagerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.onGenerate();
  }

  onGenerate() {
    this.input.password = passwordGenerator(8);
  }

  onChange(value: any) {
    console.log(value);
  }

  onSubmit(userForm: NgForm) {
    if(!this.checkForm(userForm.value)) {
      this.toast.error("Complete todos los campos", 'Error', {
        timeOut: 1500,
      });
      return;
    }
    const user: User = {
      username: userForm.value.username,
      password: userForm.value.password,
      role: userForm.value.role,
    };
    switch (userForm.value.role) {
      case "salesman":
        const salesman: Salesman = {
          userid: "",
          name: userForm.value.name,
          surname: userForm.value.surname,
          email: userForm.value.email,
          phone: userForm.value.phone,
          address: userForm.value.address,
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
        const warehouse: Warehouse = {
          userid: "",
          name: userForm.value.name,
          surname: userForm.value.surname,
          email: userForm.value.email,
          phone: userForm.value.phone,
          address: userForm.value.address
        }
        this.warehouseService.postWarehouse(user, warehouse).subscribe(
          (data: any) => {
            data.role = "warehouse";
            this.onSubmitEvent.emit(data);
          }
        );
        break;
      case "admin":
        const admin: Manager = {
          userid: "",
          name: userForm.value.name,
          surname: userForm.value.surname,
          email: userForm.value.email,
          phone: userForm.value.phone,
          address: userForm.value.address
        }
        this.managerService.postManager(user, admin).subscribe(
          (data: any) => {
            data.role = "admin";
            this.onSubmitEvent.emit(data);
          }
        );
        break;
    }
  }

  checkForm(data: any) {
    return !!data.name && !!data.surname && !!data.email && !!data.phone && !!data.address && !!data.username && !!data.password
  }
}
