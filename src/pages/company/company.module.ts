import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyPage } from './company';

import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    CompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyPage),
    Ionic2RatingModule
  ],
})
export class CompanyPageModule {}
