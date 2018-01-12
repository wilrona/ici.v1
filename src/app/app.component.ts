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
<<<<<<< HEAD
<<<<<<< HEAD
  citiesfilter:[any];
  categoriesfilter:[any];
  listing:[any];
  listingMap:[any];
  
  
  
=======
=======
>>>>>>> de0a7af0a5d75ddf4b25982de5a343be10e590cf
  citiesfilter:Array<[any]>;
  categoriesfilter:Array<[any]>;
  listing:Array<[any]>;


<<<<<<< HEAD
>>>>>>> de0a7af0a5d75ddf4b25982de5a343be10e590cf
=======
>>>>>>> de0a7af0a5d75ddf4b25982de5a343be10e590cf

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
<<<<<<< HEAD
<<<<<<< HEAD
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
 
    

    /*this.events.publish('citiesfilter:categoriesfilter', this.citiesfilter,  this.categoriesfilter);*/
=======
            data => {
              this.events.publish('listing', data)
            }
    );
>>>>>>> de0a7af0a5d75ddf4b25982de5a343be10e590cf
=======
            data => {
              this.events.publish('listing', data)
            }
    );
>>>>>>> de0a7af0a5d75ddf4b25982de5a343be10e590cf

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
