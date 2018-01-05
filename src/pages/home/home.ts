import {Component, } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {CompanyPage} from "../company/company";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
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

}
