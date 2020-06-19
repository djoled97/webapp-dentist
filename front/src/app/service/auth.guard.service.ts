import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(public login: LoginService, public router: Router) { }
    canActivate() {
        if (!this.login.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}