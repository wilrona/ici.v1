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
  citiesfilter:[any];
  categoriesfilter:[any];
  listing:[any];
  
  

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
    this.listingService.getListing(this.categoriesfilter, this.citiesfilter).subscribe(
            data => {this.listing= data,
            this.events.publish('listing', data)}
        
    );
    
    this.menu.toggle();
    this.closedFiltre();
  }

  


}
