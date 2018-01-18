import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsPage } from './maps';
import {CompanyPage} from "../company/company";



@NgModule({
  declarations: [
    MapsPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsPage),
  ],
  entryComponents: [
    CompanyPage
  ]
})
export class MapsPageModule {}
