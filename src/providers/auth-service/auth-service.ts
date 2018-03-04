import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// url of api
let apiUrl = 'http://logicebrary.co.zw/api/';

@Injectable()
export class AuthServiceProvider {

  apiUrl: String;	

  constructor(public http: Http) {
    this.apiUrl = apiUrl;
  }

  // post data on register and login
  postData(credentials:any, type:any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }


}
