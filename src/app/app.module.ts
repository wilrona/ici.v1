import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AutoCompleteModule} from "ionic2-auto-complete";
import {Ionic2RatingModule} from "ionic2-rating";
import {AnnuairePage} from "../pages/annuaire/annuaire";
import {FiltreComponent} from "../components/filtre/filtre";

import {IonicImageViewerModule} from "ionic-img-viewer";
import {CompanyDescriptionPage} from "../pages/company-description/company-description";
import {CompanyImagesPage} from "../pages/company-images/company-images";
import {CompanyInfoPage} from "../pages/company-info/company-info";
import {CompanyCategoryPage} from "../pages/company-category/company-category";
import {ReviewFormPage} from "../pages/review-form/review-form";
import {LoginPage} from "../pages/login/login";


import {IonTagsInputModule} from "ionic-tags-input";
import {MapsPage} from "../pages/maps/maps";

import { HttpModule } from '@angular/http';

import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { CompaniesProvider } from '../providers/companies/companies';
import {ComptePage} from "../pages/compte/compte";

import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    AnnuairePage,
    ComptePage,
    HomePage,
    CompanyDescriptionPage,
    CompanyImagesPage,
    CompanyInfoPage,
    CompanyCategoryPage,
    MapsPage,
    TabsPage,
    ReviewFormPage,
    LoginPage,
    // components
    FiltreComponent,

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
    ComptePage,
    HomePage,
    CompanyDescriptionPage,
    CompanyImagesPage,
    CompanyInfoPage,
    CompanyCategoryPage,
    MapsPage,
    ReviewFormPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    EmailComposer,
    CompaniesProvider,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
