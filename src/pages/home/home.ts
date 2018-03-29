import {Component, } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {CompanyPage} from "../company/company";
import { CompaniesProvider } from '../../providers/companies/companies';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  keyword;
  listing;

  constructor(public navCtrl: NavController, public menu: MenuController,public companyprovider: CompaniesProvider) {
    menu.enable(true);
  }

  openMenu(evt) {
    if(evt === "right"){
      this.menu.enable(true, 'menu');
      this.menu.enable(false, 'filtre');
    }else{
      this.menu.enable(true, 'filtre');
      this.menu.enable(false, 'menu');
    }
    this.menu.toggle();
  }

  OpenDetail(){
      this.navCtrl.push(CompanyPage);
  }
  search(){

  this.navCtrl.push('ListingPage');

  var query=this.keyword;
  this.companyprovider.getResults(query).subscribe(
            data => this.listing= data
        );

  console.log("test  "+this.keyword);
}

}
