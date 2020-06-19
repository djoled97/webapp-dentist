import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../models/Patient';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' ,
    'Authorization':'Bearer '+ localStorage.getItem('token')
  })
};
const baseUrl="http://localhost:3000/api/karton"
@Injectable({
  providedIn: 'root'
})
export class PatientService {
constructor(private http: HttpClient) { }


addPatient(patient:Patient){
  return this.http.post<any>(baseUrl,patient,httpOptions);
}


}
