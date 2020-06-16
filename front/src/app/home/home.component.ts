import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    decodedToken:string;
    username:string
  constructor() {
    const myRawToken = localStorage.getItem('token');
    const helper = new JwtHelperService();

     const token = helper.decodeToken(myRawToken);
    this.decodedToken=token;
    this.username=token.username;


  }

  ngOnInit() {
  }

}
