import { Component, Input, OnInit } from '@angular/core';
import { Order, orderConverter } from 'src/app/models/Order';
import { Product, productConverter } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.css']
})
export class OrderContainerComponent implements OnInit {

  @Input() salesmanId: string;

  orders: Order[];

  constructor(
    private service: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();
    this.orders = [];
  }

  getOrders() {
    this.service.getOrdersBySalesman(this.salesmanId)
    .subscribe(res => {
      this.orders = res.map(orderConverter.fromJSON);
      console.log(this.orders);
    });
  }

}
