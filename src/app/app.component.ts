import {Component, Output, Input, EventEmitter, ViewChild} from '@angular/core';
import {MenuController, ModalController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Events } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';

import { CompaniesProvider } from '../providers/companies/companies';
import {VariableProvider} from "../providers/variable/variable";
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {AnnuairePage} from "../pages/annuaire/annuaire";
import {MapsPage} from "../pages/maps/maps";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  citiesfilter:Array<any>;
  categoriesfilter:Array<any>;
  listing:Array<any>;
  listingMap:Array<any>;
  @Input() userconnect:boolean=false;
  @Output() disconnect: EventEmitter<boolean>;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen, public menu: MenuController,
              public events: Events,  public listingService: CompaniesProvider,
              public variable: VariableProvider, public modalCtrl: ModalController
  ) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Annuaires', component: AnnuairePage },
      { title: 'Maps', component: MapsPage }
    ];

    this.events.subscribe('citiesfilter', (cities) => {
      this.citiesfilter=cities;
    });
    this.events.subscribe('categoriesfilter', (categories) => {
      this.categoriesfilter=categories;
    });

    if(localStorage.getItem("userId")) {
      this.userconnect = true;
    }

    this.disconnect = new EventEmitter<boolean>();

    events.subscribe('userconnect', (user) => {
    this.userconnect =true;
    this.disconnect.emit(this.userconnect);
    });

  }

  closedFiltre(){
    this.menu.enable(true, 'menu');
  }

  filtre(){
 //   console.log("nn0 ");

    this.listingService.getListing(this.categoriesfilter, this.citiesfilter).subscribe(
            data => {
              // this.listing= data;
              this.events.publish('listing', data)
            }
    );

   this.listingService.getMarkers(this.categoriesfilter, this.citiesfilter).subscribe(
            data => {
              // this.listingMap= data
              this.events.publish('listingMap', data)
            }

    );

    this.events.publish('citiesfilter', this.citiesfilter);
    this.events.publish('categoriesfilter', this.categoriesfilter);

    if(this.citiesfilter || this.categoriesfilter){
      this.variable.setInitTabMaps(false);
    }else{
      this.variable.setInitTabMaps(true);
    }

    if(this.citiesfilter || this.categoriesfilter){
      this.variable.setInitTabAnnuaire(false);
    }else{
      this.variable.setInitTabAnnuaire(true);
    }


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


  logout(){
   localStorage.clear();
   this.userconnect=false;
   this.disconnect.emit(this.userconnect);
   this.events.publish('userconnect', false);
  }

  login(){
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
    this.menu.toggle();
  }


  openTab(page){
    this.nav.setRoot(page.component);
  }




}
