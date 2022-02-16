import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavPath } from 'src/app/interface/navpath';
import { AuthService } from 'src/lib/auth.service';
import { decode } from 'src/lib/token';

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.css']
})
export class SalesmanComponent implements OnInit {

  paths: NavPath[] = []

  constructor(private auth: AuthService, private router: Router) {

    this.paths.push({
      route: "agenda",
      icon: "far fa-calendar",
      text: "Agenda"
    });
    this.paths.push({
      route: "catalogo",
      icon: "fas fa-shopping-bag",
      text: "Catalogo"
    });
  }

  ngOnInit(): void {
    const token = decode(this.auth.getToken());
    if (!token) {
      this.router.navigate(["/login"]);
    } else {
      if (token.role != "salesman") {
        this.router.navigate(["/login"]);
      }
    }
  }

}
