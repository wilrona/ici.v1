import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyCategoryPage } from './company-category';

@NgModule({
  declarations: [
    CompanyCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyCategoryPage),
  ],
})
export class CompanyCategoryPageModule {}
