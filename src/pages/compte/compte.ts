import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ComptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compte',
  templateUrl: 'compte.html',
})
export class ComptePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComptePage');
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
}
