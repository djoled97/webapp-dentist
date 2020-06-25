import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' ,
    
  })
};
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient, private router: Router) { }

  registerUser(user:User){
     return this.http.put<any>("http://localhost:3000/auth/register",user,httpOptions).pipe(
       tap(res =>{
          this.router.navigate(['../login']);
       })
     )
     
  }

}
