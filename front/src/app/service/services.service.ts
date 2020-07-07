import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Service } from '../models/Service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' ,
    'Authorization':'Bearer '+ localStorage.getItem('token')
  })
};

const baseUrl = "http://localhost:3000/api/usluga/";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  addService(service: any) {
    return this.http.post<any>(baseUrl, service, httpOptions);
  }

  getServices() {
    return this.http.get<any>(baseUrl, httpOptions);
  }

  editService(id: number, service: any) {
    return this.http.put<any>(baseUrl + id, service, httpOptions);
  }

  searchServices(keyword: string): Observable<any> {
    return this.http.post<any>(baseUrl + "search", keyword, httpOptions);
  }
}
