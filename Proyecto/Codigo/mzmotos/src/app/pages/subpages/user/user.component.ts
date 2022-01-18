import { Component, OnInit } from '@angular/core';
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

  users: any[] = [];
  selected: any = null;


  constructor(private salesmanService: SalesmanService,
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
      console.log(this.users);
  }

  selectedUser(user: any) {
    this.selected = user;
    console.log(user);
  }

  unseletedUser() {
    this.selected = null;
  }
}
