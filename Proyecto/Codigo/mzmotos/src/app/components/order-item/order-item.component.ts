import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input () order: Order;
  showProducts: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowProducts() {
    this.showProducts = !this.showProducts;
  }

}
