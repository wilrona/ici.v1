import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyDescriptionPage } from './company-description';

@NgModule({
  declarations: [
    CompanyDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyDescriptionPage),
  ],
})
export class CompanyDescriptionPageModule {}
