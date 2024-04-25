import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  //////////////////////// CRUD/////////////////////////////

  //inserer les informations dans la bd
  post(base: any, data: any) {
    // console.log(base, data)
    return new Promise((resolve, reject) => {
      this.http.post(base, data, {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          }
        )
      }).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          reject(err);
        }
      )
    })
  }

}
