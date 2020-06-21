import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from '../service/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';





@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  decodedToken: string;
  username: string
  expDate: any;
  now: any;




  expTime: any;
  iat: any;
  dateExp: any;
  constructor(private userService: LoginService, private router: Router, private dialog: MatDialog, private loginService: LoginService, private jwtHelper: JwtHelperService) {





    let token = jwtHelper.decodeToken(localStorage.getItem('token'));
    this.decodedToken = token;
    // console.log(this.decodedToken)
    this.username = token.username;
    this.expDate = token.expDate;
    this.iat = token.iat;



    // console.log(this.expDate * 1000)




  }
  @HostListener('document:mousemove')
  onMouseMove() {
    this.now = new Date().getTime();

    if (this.expDate * 1000 < this.now) {
      if (this.dialog.openDialogs.length == 0) {
        this.dialog.open(LogoutDialogComponent, { disableClose: true });
      }
    }
  }
  ngOnInit(): void {
    this.loginService.refreshUserToken().subscribe();

  }




  logout() {
    this.userService.logout();

  }
}
