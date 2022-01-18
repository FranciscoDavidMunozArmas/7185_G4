import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { decode } from 'querystring';
import { NavPath } from 'src/app/interface/navpath';
import { AuthService } from 'src/lib/auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  paths: NavPath[] = [];

  constructor(private auth: AuthService, private router: Router) {
    this.paths.push({
      route: "user",
      icon: "fas fa-user",
    });
    this.paths.push({
      route: "client",
      icon: "fas fa-users"
    });
    this.paths.push({
      route: "inventory",
      icon: "fas fa-chart-pie"
    });
    this.paths.push({
      route: "order",
      icon: "fas fa-shopping-cart"
    });
  }

  ngOnInit(): void {
    //   const token = decode(this.auth.getToken());
    //   if (!token) {
    //     this.router.navigate(["/login"]);
    //   } else {
    //     if (token.role != "admin") {
    //       this.router.navigate(["/login"]);
    //     }
    //   }
  }
}
