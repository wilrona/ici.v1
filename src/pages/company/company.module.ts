import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyPage } from './company';
import {Ionic2RatingModule} from "ionic2-rating";
import {MapsComponent} from "../../components/maps/maps";
import {IonicImageViewerModule} from "ionic-img-viewer";

@NgModule({
  declarations: [
    CompanyPage,
    MapsComponent
  ],
  imports: [
    IonicPageModule.forChild(CompanyPage),
    Ionic2RatingModule,
    IonicImageViewerModule
  ],
})
export class CompanyPageModule {}
