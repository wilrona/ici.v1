import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';

/**
 * Generated class for the CommentairesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-commentaires',
  templateUrl: 'commentaires.html',
})
export class CommentairesPage {
user;
commentaires;
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

    this.listingService.myReviews(this.user.id.$id).subscribe(
        data => {
          this.commentaires=data;
        }
    );

  }

  doInfinite(infiniteScroll) {
    this.start = this.start+1;

    setTimeout(() => {

      this.listingService.myReviews(this.user.id.$id).subscribe(
       
           res => {
             let comment = res;
           //  this.totalPage = 1745;//this.companies.total_pages;
             for(let i=0; i<comment.length; i++) {
               this.commentaires.push(comment[i]);
             }
           }//,
         //  error =>  this.errorMessage = <any>error
         );

      //console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }  


}
