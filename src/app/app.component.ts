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
import {InscriptionPage} from "../pages/inscription/inscription";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;


  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen, public menu: MenuController,
              public events: Events,  public listingService: CompaniesProvider,
              public variable: VariableProvider, public modalCtrl: ModalController
  ) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });



  }






}
