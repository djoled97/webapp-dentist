import { Injectable } from '@angular/core';
import { UserLogin } from '../models/UserLogin';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' ,
    
  })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  
    logout(){
      localStorage.clear();
      this.router.navigate(['login']);
      
    }

  login(user:UserLogin):Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/user/login',user,httpOptions).pipe(
      tap( res=>{
        
      
        if(res.status!=='error'){
          console.log(res)
        localStorage.setItem('token',res.token);
        localStorage.setItem('reftoken',res.refreshToken);
        
        }
       if(localStorage.getItem('reftoken')){
        this.router.navigate(['../home']);
       }
      })
    );
    
    
  }
  refreshUserToken() :Observable<any>{
    return this.http.post<any>("http://localhost:3000/auth/user/refresh",{token:localStorage.getItem('reftoken')},httpOptions).pipe(
      tap(res=>{
          localStorage.setItem('token',res.token);
          localStorage.setItem('reftoken',res.refreshToken);
      })
    )
  };

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('reftoken');
    
    return !this.jwtHelper.isTokenExpired(token);
  }
  constructor(private  http:HttpClient,private router:Router,private jwtHelper:JwtHelperService) { }
}
