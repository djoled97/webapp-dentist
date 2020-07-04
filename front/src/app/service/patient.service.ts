import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../models/Patient';
import { Observable } from 'rxjs';
import { FullPatient } from '../models/FullPatient';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' ,
    'Authorization':'Bearer '+ localStorage.getItem('token')
  })
};
const baseUrl="http://localhost:3000/api/karton/"
@Injectable({
  providedIn: 'root'
})
export class PatientService {
constructor(private http: HttpClient) { }


addPatient(patient:Patient){
  return this.http.post<any>(baseUrl,patient,httpOptions);
}

  getPatients(){
    return this.http.get<any>(baseUrl,httpOptions);
  }

  editPatient(id:number,patient:Patient){
    return this.http.put<any>(baseUrl + id,patient,httpOptions);
  }
searchPatients(keyword:string):Observable<any>{

  return this.http.post<any>(baseUrl + "search",keyword,httpOptions);
}

}
