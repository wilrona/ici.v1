import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {Events, MenuController, NavController} from "ionic-angular";
import {AnnuairePage} from "../annuaire/annuaire";
import {MapsPage} from "../maps/maps";
import {ComptePage} from "../compte/compte";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AnnuairePage;
  tab3Root = MapsPage;
  tab4Root = ComptePage;

  MapsParams = {};

  constructor(public navCtrl: NavController, public menu: MenuController, public events: Events) {

    events.subscribe('listingMap', (listing) => {
      this.MapsParams['data'] = listing;
      this.MapsParams['tab'] = true;
    });
  }

  menuToggle(){
    this.menu.enable(true, 'menu');
  }


}
