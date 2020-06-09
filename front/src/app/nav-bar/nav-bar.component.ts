import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  constructor(private userService:UserService) { 
    
  }

  ngOnInit(): void {
  }

openNav(){
  document.getElementById("mySidenav").style.width = "190px";
  
}
closeNav(){
  document.getElementById("mySidenav").style.width = "0";
}

  logout(){
    this.userService.logout();
  }
}
