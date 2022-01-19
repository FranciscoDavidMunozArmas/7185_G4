import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/lib/auth.service';
import { UserService } from 'src/app/services/user.service';
import { decode } from 'src/lib/token';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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

  forgetPasswordInput = {
    username: "",
    newPassword: "",
    confirmPassword: "",
  }

  stepCounter: number = 1;

  @ViewChild("forgetPassword") forgetPassword: ElementRef;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    private toast: ToastrService) { }

  ngOnInit(): void {
  }

  onChange(value: any) {
    if (value.type === 'checkbox') {
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

  increaseStep() {
    this.stepCounter++;
  }

  decreaseStep() {
    this.stepCounter--;
    if (this.stepCounter < 1) {
      this.stepCounter = 1;
    }
  }

  onSubmitForgetPassword(forgetPasswordForm: NgForm) {
    console.log(this.forgetPasswordInput);
    if (this.stepCounter === 1) {
      this.forgetPasswordInput.username = forgetPasswordForm.value.username;
      this.checkUserExist(this.forgetPasswordInput.username);
    } else if (this.stepCounter === 2) {
      this.forgetPasswordInput.newPassword = forgetPasswordForm.value.password;
      this.forgetPasswordInput.confirmPassword = forgetPasswordForm.value.confirm;
      if (!this.checkPassword(this.forgetPasswordInput.newPassword, this.forgetPasswordInput.confirmPassword)) {
        return;
      }
      this.userService.updatePassword(this.forgetPasswordInput.username, this.forgetPasswordInput.newPassword)
        .subscribe((res: any) => {
          this.toast.success("Password updated", "Success",
            {
              timeOut: 3000,
            });
          this.modalClose();
        });
    }
  }

  checkUserExist(username: string) {
    this.userService.getUserByUsername(username)
      .subscribe((res: any) => {
        if (!res._id) {
          this.toast.error("User not found", "Error", {
            timeOut: 3000,
          });
          this.stepCounter = 1;
        } else {
          this.increaseStep();
        }
      });
  }

  checkPassword(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      this.toast.error("Password don't match", "Error", {
        timeOut: 3000,
      });
      return false;
    }
    if (password.length < 6) {
      this.toast.error("Too short password", "Error", {
        timeOut: 3000,
      });
      return false;
    }
    return true;
  }

  showForgetPassword() {
    this.triggerModal(this.forgetPassword);
  }

  triggerModal(content: any) {
    this.modalService.open(content).result;
  }

  modalClose() {
    this.modalService.dismissAll();
  }

}
