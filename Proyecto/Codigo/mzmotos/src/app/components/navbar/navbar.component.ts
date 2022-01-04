import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NavPath } from 'src/app/interface/navpath';
import { AuthService } from 'src/lib/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() paths: NavPath[] = [];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  logout() {
    this.authService.signout();
    this.router.navigate(["/login"]);
  }

}
