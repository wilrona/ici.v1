import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyImagesPage } from './company-images';

@NgModule({
  declarations: [
    CompanyImagesPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyImagesPage),
  ],
})
export class CompanyImagesPageModule {}
