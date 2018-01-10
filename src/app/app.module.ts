import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AutoCompleteModule} from "ionic2-auto-complete";
import {Ionic2RatingModule} from "ionic2-rating";
import {AnnuairePage} from "../pages/annuaire/annuaire";
import {FiltreComponent} from "../components/filtre/filtre";
import {CompanyPage} from "../pages/company/company";
import {IonicImageViewerModule} from "ionic-img-viewer";
import {CompanyDescriptionPage} from "../pages/company-description/company-description";
import {CompanyImagesPage} from "../pages/company-images/company-images";
import {CompanyInfoPage} from "../pages/company-info/company-info";
import {CompanyCategoryPage} from "../pages/company-category/company-category";
import {IonTagsInputModule} from "ionic-tags-input";
import {MapsPage} from "../pages/maps/maps";
import {MapsComponent} from "../components/maps/maps";
import { HttpModule } from '@angular/http';

import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { CompaniesProvider } from '../providers/companies/companies';

@NgModule({
  declarations: [
    MyApp,
    AnnuairePage,
    ContactPage,
    HomePage,
   // CompanyPage,
    CompanyDescriptionPage,
    CompanyImagesPage,
    CompanyInfoPage,
    CompanyCategoryPage,
    MapsPage,
    TabsPage,

    // components
    FiltreComponent,
    //MapsComponent

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: 'true'}),
    AutoCompleteModule,
    Ionic2RatingModule,
    IonicImageViewerModule,
    IonTagsInputModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AnnuairePage,
    ContactPage,
    HomePage,
    //CompanyPage,
    CompanyDescriptionPage,
    CompanyImagesPage,
    CompanyInfoPage,
    CompanyCategoryPage,
    MapsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    EmailComposer,
    CompaniesProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
