import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Intervention } from '../models/Interevention';
import { Observable } from 'rxjs';

import { FullPatient } from '../models/FullPatient';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' ,
    'Authorization':'Bearer '+ localStorage.getItem('token')
  })
};
const baseUrl="http://localhost:3000/api/pregled/";
@Injectable({
  providedIn: 'root'
})

export class InterventionService {
  
  constructor(private http:HttpClient) { }

  getInterventions():Observable<Intervention[]>{
    return this.http.get<Intervention[]>(baseUrl,httpOptions);
  }

  searchByDate(dateStart:string,dateEnd:string):Observable<Intervention[]>{

    return this.http.post<Intervention[]>(baseUrl + "search",{dateStart,dateEnd},httpOptions);
  }


}
