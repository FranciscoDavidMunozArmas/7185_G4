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

  warehouses: Warehouse[] = [];
  salesman: Salesman[] = [];


  constructor(private salesmanService: SalesmanService,
    private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.warehouseService.getWarehouses().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = data;
      }
    );
    this.salesmanService.getSalesmen().subscribe(
      (data: Salesman[]) => {
        this.salesman = data;
      }
    );
  }

}
