import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {Events, MenuController, NavController, Tab} from "ionic-angular";
import {AnnuairePage} from "../annuaire/annuaire";
import {MapsPage} from "../maps/maps";
import {ComptePage} from "../compte/compte";
import {VariableProvider} from "../../providers/variable/variable";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AnnuairePage;
  tab3Root = MapsPage;
  tab4Root = ComptePage;

  cities: Array<any>;
  categories: Array<any>;
  listing: Array<any>;

  constructor(public navCtrl: NavController, public menu: MenuController, public events: Events, public variable: VariableProvider) {

  }

  ionViewDidLoad() {
    this.events.subscribe('citiesfilter', (cities) => {
      this.cities = cities;
    });
    this.events.subscribe('categoriesfilter', (categories) => {
      this.categories = categories;
    });
  }

  menuToggle(e : Tab){
    this.menu.enable(true, 'menu');

    if(e.index === 2){
      this.events.publish('reloadMaps', this.cities, this.categories);
    }
    if (e.index === 1) {
      this.events.publish('reloadAnnuaire', this.cities, this.categories);
    }
  }


}
