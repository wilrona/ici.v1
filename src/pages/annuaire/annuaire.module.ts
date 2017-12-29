import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnuairePage } from './annuaire';

@NgModule({
  declarations: [
    AnnuairePage,
  ],
  imports: [
    IonicPageModule.forChild(AnnuairePage),
  ],
})
export class AnnuairePageModule {}
