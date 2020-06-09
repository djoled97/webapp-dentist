import { Injectable } from '@angular/core';
import { UserLogin } from '../models/UserLogin';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
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
 
  
    logout(){
      localStorage.clear();
      this.router.navigate(['login']);
    }

  login(user:UserLogin){
    return this.http.post<any>('http://localhost:3000/auth/user/login',user,httpOptions).pipe(
      tap( res=>{
        
      
        if(res.status!=='error'){
          console.log(res)
        localStorage.setItem('token',res.token);
        localStorage.setItem('reftoken',res.refreshToken)
        }
       if(localStorage.getItem('reftoken')){
        this.router.navigate(['../home']);
       }
      })
    );
    
    
  }

  constructor(private  http:HttpClient,private router:Router) { }
}
