import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/lib/auth.service';
import { UserService } from 'src/app/services/user.service';
import { decode } from 'src/lib/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  input = {
    username: "",
    password: "",
    keepLog: false,
  }

  private cookieName: string = "logged-user";
  private cookieRole: string = "role";

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onChange(value: any) {
    if(value.type === 'checkbox') {
      this.input = { ... this.input, [value.name]: value.checked };
    } else {
      this.input = { ... this.input, [value.name]: value.value };
    }
  }

  submitUser(loginForm: NgForm) {
    this.userService.signin(loginForm.value.username, loginForm.value.password)
      .subscribe((res: any) => {
        this.authService.signin(res, this.input.keepLog);
        const token = decode(res);
        this.router.navigate([`/${token.role}`]);
      })
  }

}
