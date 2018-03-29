import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
//import {AuthHttp} from 'angular2-jwt';
import 'rxjs/Rx';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {




  constructor(public http:Http) {
    console.log('Hello AuthProvider Provider');
  }

  getUser(user_login, user_password):Observable<any> {
    let body = "email=" + user_login + "&password=" + user_password;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});

    return this.http.post('http://ici.cm/MobileApp/login', body, options)
     .map(this.extractData)
      .catch(this.handleError);
  }

  getSecuredData():any {
    let jwt = localStorage.getItem('id_token');
    let authHeader = new Headers();

    if (jwt) {
      authHeader.append('Authorization', jwt);
    }

    let options = new RequestOptions({headers: authHeader});

    return this.http.get('', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Extracting data.
   *
   * @param res
   * @returns {any|{}}
   */
  private extractData(res:Response) {
    let body = res.json();
    return body || {};
  }

  /**
   * Handling errors.
   *
   * @param error
   * @returns {ErrorObservable}
   */
  private handleError(error:any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }



}
