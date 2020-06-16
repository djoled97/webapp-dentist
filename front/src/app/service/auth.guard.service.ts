import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(public user: UserService, public router: Router) { }
    canActivate() {
        if (!this.user.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}