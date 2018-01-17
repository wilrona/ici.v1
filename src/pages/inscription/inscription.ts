import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators} from "@angular/forms";

/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage{
  areEqual(arg0: any): any {
    throw new Error("Method not implemented.");
  }

  validations_form;
  validation_messages;

  matching_passwords_group;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder) {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return this.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group
    });

    this.validation_messages = {

      'login': [
        { type: 'required', message: 'Email obligatoire' },
        { type: 'pattern', message: 'Email invalid'}
      ],
      'password': [
        { type: 'required', message: 'Mot de passe obligatoire' },
        { type: 'minLength', message: 'Le mot de passe doit etre superieur ou egale à 6 caracteres' }
      ]
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];
        if (val === undefined) {
          val = control.value
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    }
  }

}
