import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, Tabs} from 'ionic-angular';
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
import {ReviewFormPage} from "../pages/review-form/review-form";
import {LoginPage} from "../pages/login/login";

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import {IonTagsInputModule} from "ionic-tags-input";
import {MapsPage} from "../pages/maps/maps";

import {SearchPage} from "../pages/search/search";

import { HttpModule } from '@angular/http';

import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { CompaniesProvider } from '../providers/companies/companies';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Geolocation } from '@ionic-native/geolocation';
import { MapProvider } from '../providers/map/map';

import {IonicStorageModule} from "@ionic/storage";
import {AuthProvider} from "../providers/auth/auth";
import { VariableProvider } from '../providers/variable/variable';
import {MapsComponent} from "../components/maps/maps";
import {LoginForgetPage} from "../pages/login-forget/login-forget";
import {InscriptionPage} from "../pages/inscription/inscription";
import {CompanyPage} from "../pages/company/company";
import {CompanyDescriptionPage} from "../pages/company-description/company-description";
import {SendMailPage} from "../pages/send-mail/send-mail";
import {FavorisPage} from "../pages/favoris/favoris";
import {MessagesPage} from "../pages/messages/messages";
import {CommentairesPage} from "../pages/commentaires/commentaires";



@NgModule({
  declarations: [
    MyApp,
    AnnuairePage,
    HomePage,
    CompanyPage,
    CompanyDescriptionPage,
    MapsPage,
    TabsPage,
    ReviewFormPage,
    LoginPage,
    InscriptionPage,
    LoginForgetPage,
    SearchPage,
    SendMailPage,
    FavorisPage,
    MessagesPage,
    CommentairesPage,
    // components
    MapsComponent,
    FiltreComponent,


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: 'true'}),
    AutoCompleteModule,
    Ionic2RatingModule,
    IonicImageViewerModule,
    IonTagsInputModule,
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AnnuairePage,
    HomePage,
    CompanyPage,
    CompanyDescriptionPage,
    MapsPage,
    ReviewFormPage,
    LoginPage,
    TabsPage,
    InscriptionPage,
    LoginForgetPage,
    SearchPage,
    SendMailPage,
    FavorisPage,
    MessagesPage,
    CommentairesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    EmailComposer,
    CompaniesProvider,
    InAppBrowser,
    Geolocation,
    FilePath,
    File,
    Camera,
    FileTransfer,
    MapProvider,
    VariableProvider,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
