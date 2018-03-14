import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';

/**
 * Generated class for the FavorisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {
  user;
  favorites;

  constructor(public navCtrl: NavController, public navParams: NavParams, public listingService: CompaniesProvider,) {
      var currentUser = JSON.parse(localStorage.getItem('userId'));
      this.user = currentUser;
      this.loadData();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }

  
  loadData(){
    //this.loading = true;

    this.listingService.getFavorite(this.user.id.$id).subscribe(
        data => {
          this.favorites=data;
          //this.loading = false;
        }
    );
  }  


}
