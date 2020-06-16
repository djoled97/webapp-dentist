import { Injectable } from '@angular/core';
import { UserLogin } from '../models/UserLogin';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' 
    
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  isLoggedIn:boolean=false;
  
    logout(){
      localStorage.clear();
      this.router.navigate(['login']);
      this.isLoggedIn=false;
    }

  login(user:UserLogin){
    return this.http.post<any>('http://localhost:3000/auth/user/login',user,httpOptions).pipe(
      tap( res=>{
        
      
        if(res.status!=='error'){
          console.log(res)
        localStorage.setItem('token',res.token);
        localStorage.setItem('reftoken',res.refreshToken)
        this.isLoggedIn=true;
        }
       if(localStorage.getItem('reftoken')){
        this.router.navigate(['../home']);
       }
      })
    );
    
    
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('reftoken');
    
    return !this.jwtHelper.isTokenExpired(token);
  }
  constructor(private  http:HttpClient,private router:Router,private jwtHelper:JwtHelperService) { }
}
