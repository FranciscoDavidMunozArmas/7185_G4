import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Salesman } from 'src/app/models/Salesman';
import { Warehouse } from 'src/app/models/Warehouser';
import { SalesmanService } from 'src/app/services/salesman.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { CI_RUC, HINT_SEARCH, NAME, ROLE, SELECT_ONE_NAME } from 'src/lib/strings';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild("userForm") userForm: ElementRef;

  users: any[] = [];
  selected: any = null;
  editable: any = null;

  ui = {
    name: NAME,
    role: ROLE,
    ci: CI_RUC,
    search: HINT_SEARCH,
    selectOne: SELECT_ONE_NAME
  }

  constructor(
    private modalService: NgbModal,
    private salesmanService: SalesmanService,
    private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.warehouseService.getWarehouses().subscribe(
      (data: any[]) => {
        this.users = this.users.concat(data.map(item => {
          item.role = "warehouse"
          return item;
        }));
      }
    );
    this.salesmanService.getSalesmen().subscribe(
      (data: any[]) => {
        this.users = this.users.concat(data.map(item => {
          item.role = "salesman"
          return item;
        }));
      });
  }

  submitData(data: any) {
    if (!!this.editable) {
      this.editData(data);
    } else {
      this.users.push(data);
    }
    this.modalClose();
  }

  editData(data: any) {
    this.users = this.users.map(item => {
      if (item._id === this.editable._id) {
        return data;
      }
      return item;
    });
  }

  onDelete(user: any) {
    if (user.role === "warehouse") {
      this.warehouseService.deleteWarehouseByID(user._id).subscribe(
        (data: any) => {
          this.users = this.users.filter(item => item._id !== user._id);
        }
      );
    } else {
      this.salesmanService.deleteSalesmanByID(user._id).subscribe(
        (data: any) => {
          this.users = this.users.filter(item => item._id !== user._id);
        }
      );
    }
    this.unseletedUser();
  }

  onEdit(user: any) {
    this.editable = user;
    this.showUserForm();
  }

  selectedUser(user: any) {
    this.selected = user;
  }

  unseletedUser() {
    this.selected = null;
  }

  showUserForm() {
    this.triggerModal(this.userForm);
  }

  triggerModal(content: any) {
    this.modalService.open(content).result
      .then(() => null, () => { this.editable = null });
  }

  modalClose() {
    this.modalService.dismissAll();
  }
}
