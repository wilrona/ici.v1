import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginForgetPage } from './login-forget';

@NgModule({
  declarations: [
    LoginForgetPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginForgetPage),
  ],
})
export class LoginForgetPageModule {}
