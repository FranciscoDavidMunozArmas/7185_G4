import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Salesman } from 'src/app/models/Salesman';
import { Warehouse } from 'src/app/models/Warehouser';
import { SalesmanService } from 'src/app/services/salesman.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild("userForm") userForm: ElementRef;

  users: any[] = [];
  selected: any = null;

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

  updateDate(data: any) {
    this.users.push(data);
    this.modalClose();
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
    this.modalService.open(content).result;
  }

  modalClose() {
    this.modalService.dismissAll();
  }
}
