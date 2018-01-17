import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

/**
 * Generated class for the LoginForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-forget',
  templateUrl: 'login-forget.html',
})
export class LoginForgetPage {

  validations_form;
  validation_messages;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.validations_form = this.formBuilder.group({
      login: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });

    this.validation_messages = {

      'login': [
        { type: 'required', message: 'Adresse Email obligatoire.' },
        { type: 'pattern', message: 'Format adresse email invalid'}
      ]
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginForgetPage');
  }

}
