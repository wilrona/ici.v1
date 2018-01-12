import { Component } from '@angular/core';
import {MenuController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Events } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';

import { CompaniesProvider } from '../providers/companies/companies';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  citiesfilter:Array<any>;
  categoriesfilter:Array<any>;
  listing:Array<any>;
  listingMap:Array<any>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController, public events: Events,  public listingService: CompaniesProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.events.subscribe('citiesfilter', (cities) => {
      this.citiesfilter=cities;
    });
    this.events.subscribe('categoriesfilter', (categories) => {
      this.categoriesfilter=categories;
    });

  }

  closedFiltre(){
    this.menu.enable(true, 'menu');
  }

  filtre(){
 //   console.log("nn0 ");

    this.listingService.getListing(this.categoriesfilter, this.citiesfilter).subscribe(
            data => {this.listing= data
            console.log("nn2 "+data)
            this.events.publish('listing', data)}
    );

   this.listingService.getMarkers(this.categoriesfilter, this.citiesfilter).subscribe(
            data => {this.listingMap= data
            console.log("nn1 "+data)
            this.events.publish('listingMap', data)}

    );

    this.events.publish('citiesfilter', this.citiesfilter);
    this.events.publish('categoriesfilter', this.categoriesfilter);



    this.menu.toggle();
    this.closedFiltre();
    this.events.publish('clearFilter', false)
  }


  clearfilter(){
    this.citiesfilter = [];
    this.categoriesfilter = [];
    this.filtre();
    this.events.publish('clearFilter', true)
  }




}
