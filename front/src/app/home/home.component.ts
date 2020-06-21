import { Component, OnInit, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../service/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
    
  constructor() {
    
    


  }
  

  ngOnInit() {
   
     
    
    
  }

}
