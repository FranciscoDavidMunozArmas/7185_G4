import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { type } from 'os';
import { decode } from 'querystring';
import { NavPath } from 'src/app/interface/navpath';
import { Product,productConverter } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/lib/auth.service';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  paths: NavPath[] = [];

  constructor(
    private auth: AuthService,
    private router: Router) {
    this.paths.push({
      route: "product",
      icon: "fas fa-shopping-bag",
    });
    this.paths.push({
      route: "reportInventory",
      icon: "fas fa-clipboard-list",
    });
  }

  ngOnInit(): void { }
}
