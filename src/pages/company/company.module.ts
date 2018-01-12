import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyPage } from './company';
import {Ionic2RatingModule} from "ionic2-rating";
import {MapsComponent} from "../../components/maps/maps";
import {IonicImageViewerModule} from "ionic-img-viewer";
<<<<<<< HEAD


=======
>>>>>>> de0a7af0a5d75ddf4b25982de5a343be10e590cf

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
  exports: [CompanyPage] ,
  bootstrap: [CompanyPage]
})
export class CompanyPageModule {}
