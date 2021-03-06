import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  getCompaniesUser(userid) {


   return this.http.get('http://ici.cm/MobileApp/myListing?userid='+userid)
    .map((res) => res.json());

  }

  getPackage() {

   return this.http.get('http://ici.cm/MobileApp/getPackage')
    .map((res) => res.json());

  }




}
