import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
user;
messages;
private start:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public listingService: CompaniesProvider) {
      var currentUser = JSON.parse(localStorage.getItem('userId'));
      this.user = currentUser;
      this.loadData();

  }


  ionViewDidLoad() {
  }

  
  loadData(){
    //this.loading = true;

    this.listingService.myMessages(this.user.id.$id).subscribe(
        data => {
          this.messages=data;
        }
    );
  }  

  doInfinite(infiniteScroll) {
    this.start = this.start+1;

    setTimeout(() => {

      this.listingService.myMessages(this.user.id.$id).subscribe(
       
           res => {
             let comment = res;
           //  this.totalPage = 1745;//this.companies.total_pages;
             for(let i=0; i<comment.length; i++) {
               this.messages.push(comment[i]);
             }
           }//,
         //  error =>  this.errorMessage = <any>error
         );

      //console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }  


}
