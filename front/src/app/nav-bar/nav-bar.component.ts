import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  decodedToken:string;
    username:string
  constructor(private userService: UserService) {
    const myRawToken = localStorage.getItem('token');
    const helper = new JwtHelperService();

     const token = helper.decodeToken(myRawToken);
    this.decodedToken=token;
    this.username=token.username;

  }

  ngOnInit(): void {
  }

  

  logout() {
    this.userService.logout();
  }
}
