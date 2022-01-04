import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  private cookieName: string = "logged-user";
  private cookieRole: string = "role";

  constructor(private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

}
