import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {MenuController, NavController} from "ionic-angular";
import {AnnuairePage} from "../annuaire/annuaire";
import {MapsPage} from "../maps/maps";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AnnuairePage;
  tab3Root = MapsPage;
  tab4Root = ContactPage;

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  menuToggle(){
    this.menu.enable(true, 'menu');
  }


}
