import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

const baseUrl = "http://localhost:3000/api/kategorija/";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategoryName() {
    return this.http.get<any>(baseUrl + "name", httpOptions);
  }

  addCategory(category: any) {
    return this.http.post<any>(baseUrl, category, httpOptions);
  }
}
