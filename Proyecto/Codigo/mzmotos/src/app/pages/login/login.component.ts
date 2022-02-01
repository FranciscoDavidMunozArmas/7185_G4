import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/lib/auth.service';
import { UserService } from 'src/app/services/user.service';
import { decode } from 'src/lib/token';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BACK_BUTTON_NAME, HINT_CONFIRM_PASSWORD, HINT_PASSWORD, HINT_USERNAME, KEEP_LOG_NAME, LOGIN_BUTTON_NAME, LOGIN_NAME, NEXT_BUTTON_NAME, RESET_PASSWORD_NAME, SAVE_BUTTON_NAME, WRITE_PASSWORD_NAME, WRITE_USERNAME_NAME } from 'src/lib/strings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hint = {
    username: HINT_USERNAME,
    password: HINT_PASSWORD,
    confirm: HINT_CONFIRM_PASSWORD,
  }

  ui = {
    login: LOGIN_NAME,
    forgetPassword: RESET_PASSWORD_NAME,
    keepLogged: KEEP_LOG_NAME,
    loginButton: LOGIN_BUTTON_NAME,
    writeUsername: WRITE_USERNAME_NAME,
    writePassword: WRITE_PASSWORD_NAME,
    backButton: BACK_BUTTON_NAME,
    nextButton: NEXT_BUTTON_NAME,
    saveButton: SAVE_BUTTON_NAME
  }

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

  loading: boolean = false;

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
    this.loading = true;
    this.userService.signin(loginForm.value.username, loginForm.value.password)
      .subscribe((res: any) => {
        if (res) {
          this.authService.signin(res, this.input.keepLog);
          const token = decode(res);
          this.loading = false;
          this.router.navigate([`/${token.role}`]);
        } else {
          this.toast.error("Usuario o contraseña incorrecta", "Invalido", {
            timeOut: 3000,
          });
        }
      }, (error: any) => {
        this.toast.error("Login failed", "Error", {
          timeOut: 3000,
        });
        this.loading = false;
      });
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
    this.loading = true;
    if (this.stepCounter === 1) {
      this.forgetPasswordInput.username = forgetPasswordForm.value.username;
      this.checkUserExist(this.forgetPasswordInput.username);
      this.loading = false;
    } else if (this.stepCounter === 2) {
      this.forgetPasswordInput.newPassword = forgetPasswordForm.value.password;
      this.forgetPasswordInput.confirmPassword = forgetPasswordForm.value.confirm;
      if (!this.checkPassword(this.forgetPasswordInput.newPassword, this.forgetPasswordInput.confirmPassword)) {
        this.loading = false;
        return;
      }
      this.userService.updatePassword(this.forgetPasswordInput.username, this.forgetPasswordInput.newPassword)
        .subscribe((res: any) => {
          this.toast.success("Password updated", "Success",
            {
              timeOut: 3000,
            });
          this.loading = false;
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
