import { Injectable, Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

import {AutoCompleteService} from 'ionic2-auto-complete';


/*
  Generated class for the CompaniesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompaniesProvider implements AutoCompleteService{

  labelAttribute = "name";

  data: any;
  count:any;
  category:any;
  city:any;
  categories:[any];
  perpage:number = 20;

  constructor(public http: Http) {
    this.data = null;
    this.count=0;
    this.category=null;
  }

   getMarkers(category=[], city=[], keyword="") {

   return this.http.get('http://ici.cm/mobileApp/allCompaniesForMap?query='+keyword+'&category='+category+'&city='+city)
    .map(
      res =>
      {
        return res.json()
      });
    //.map((res) => res.json());


  }

  getListing(category=[], city=[], keyword="" , start:number=0){

    if(start==0){
      this.perpage=20;
    }else{
      this.perpage=5;
    }


    // return this.http.get('http://ici.cm/MobileApp/searchmobile?limit='+this.perpage+'&start='+start)
    return this.http.get('http://ici.cm/MobileApp/searchmobile?query='+keyword+'&category='+category+'&city='+city+'&limit='+this.perpage+'&start='+start)
    //return this.http.get('http://ici.cm/MobileApp/searchmobile?query='+query+'&city='+city+'&limit='+this.perpage+'&start='+start)


      .map(
        result =>
        {
        //  console.log(result.json())
          return result.json()
          //  .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });


   /* if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      //this.http.get('http://localhost:8080/compagnie?filter[limit]='+this.perpage+'&filter[skip]='+start)
      this.http.get('http://ici.cm/MobileApp/searchmobile?filter[limit]='+this.perpage+'&filter[skip]='+start)
      //this.http.get('http://ici.cm/data.json?filter[limit]='+this.perpage+'&filter[skip]='+start)

        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });*/

  }


  /*getCities(){


    if (this.city) {
      return Promise.resolve(this.city);
    }

    return new Promise(resolve => {

      this.http.get('http://ici.cm/MobileApp/searchCity')
        .map(res => res.json())
        .subscribe(city => {
          this.city = city;
          resolve(this.city);
        });
    });

  }*/

   getRecentPlaces() {

   return this.http.get('http://ici.cm/MobileApp/getRecentPlaces')
    .map((res) => res.json());

  }

  getCities() {

   return this.http.get('http://ici.cm/MobileApp/searchCity')
    .map((res) => res.json());

  }



  getCompanyById(id){

      return this.http.get('http://ici.cm/MobileApp/getCompanyById?id='+id)
        .map(res => res.json());


  }

   getCategories(){

      return this.http.get('http://ici.cm/MobileApp/getAllCategories')
        .map(res => res.json());


  }
  getSubcats(){

      return this.http.get('http://ici.cm/MobileApp/getCategoriesClass')
        .map(res => res.json());


  }

  getAllCategories(){

      return this.http.get('http://ici.cm/MobileApp/getAllCategories')
        .map(res => res.json());


  }

 getFavorite(userId){

      return this.http.get('http://ici.cm/MobileApp/listoffavorite?userId='+userId)
        .map(res => res.json());
 }

 myMessages(userId, start:number=0){

      return this.http.get('http://ici.cm/MobileApp/mymessages?userId='+userId+'&start='+start+'&limit='+this.perpage)
        .map(res => res.json());
 }

 myReviews(userId, start:number=0){

      return this.http.get('http://ici.cm/MobileApp/myreviews?userId='+userId+'&start='+start+'&limit='+this.perpage)
        .map(res => res.json());
 }

/*
 getAverageReview(){

      return this.http.get('http://ici.cm/MobileApp/getAverageReview')
        .map(res => res.json());
 }*/

getListingCount(){


    if (this.count) {
      return Promise.resolve(this.count);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:8080/compagnie/count')
        .map(res => res.json())
        .subscribe(count => {
          this.count = count;
          resolve(this.count);
        });
    });

  }

  getResults(keyword:string) {

    return this.http.get("http://ici.cm/MobileApp/searchBusiness?query="+keyword+"&limit=10")

      .map(
        result =>
        {
          return result.json()
        });
  }

  saveStats(companyId, userId, type) {

    this.http.get("http://ici.cm/MobileApp/saveStats?companyId="+companyId+"&userId="+userId+"&type="+type)
    .subscribe(data => {
      // this.events.publish('companyInfoupdate', data["_body"]);
    }, error => {
    //console.log("Oooops!");
    });
  }

  sendmail(myData) {

    this.http.post("http://ici.cm/MobileApp/sendmail", myData)
    .subscribe(data => {
    }, error => {
    });
  }


   checkfavorite(companyId, userId)  {

   return this.http.get("http://ici.cm/MobileApp/checkfavorite?companyId="+companyId+"&userId="+userId)
    .map((res) => res.json());

  }



  favorite(companyId, userId, type) {

     let value=false;

    this.http.get("http://ici.cm/MobileApp/favorite?companyId="+companyId+"&userId="+userId+"&type="+type)
    .subscribe(data => {
     }, error => {
      console.log("Oooops!");
   });
      console.log("val!");

  }



 /* getCategorybyId(id){


    if (this.category) {
      return Promise.resolve(this.category);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:8080/compagnie/category/'+id)
        .map(res => res.json())
        .subscribe(category => {
          this.category = category;
          console.log("yes");
          console.log(category);
          resolve(this.category);
        });
    });

  }*/


  /*createReview(review){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/api/reviews', JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });

  }

  deleteReview(id){

    this.http.delete('http://localhost:8080/api/reviews/' + id).subscribe((res) => {
      console.log(res.json());
    });

  }*/


}
