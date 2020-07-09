import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};
const baseUrl:string="http://localhost:3000/api/cena/"
@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) { }


getCenaById(id:number){
 return  this.http.get<any>(baseUrl + id ,httpOptions);
}


}


