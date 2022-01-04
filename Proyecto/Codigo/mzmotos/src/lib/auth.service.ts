import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private tokenName = "token";

    constructor(private cookieService: CookieService) { }

    signin(token: string, flag: boolean) {
        this.signout();
        if (flag) {
            localStorage.setItem(this.tokenName, token);
        } else {
            const date = new Date();
            date.setHours(date.getHours() + 2);
            this.cookieService.set(this.tokenName, token, date);
        }
    }

    signout() {
        localStorage.removeItem(this.tokenName);
        this.cookieService.delete(this.tokenName);
    }

    getToken() {
        const token = localStorage.getItem(this.tokenName);
        if (token) {
            return token;
        }
        return this.cookieService.get(this.tokenName);
    }

    isAuthenticated() {
        return this.getToken() !== null;
    }
}