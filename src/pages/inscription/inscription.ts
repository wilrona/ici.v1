import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators} from "@angular/forms";
import { Http} from '@angular/http'
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

  validations_form;
  validation_messages;

  matching_passwords_group;

  dismissed: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, public toastCtrl: ToastController,
  public viewCtrl: ViewController, public http: Http) {

    this.dismissed = this.navParams.get('showDismiss');

    this.validations_form = this.formBuilder.group({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
      ])),
      confirm_password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          this.equalto('password')
        ]
      ))
    });

    this.validation_messages = {

      'nom': [
        { type: 'required', message: 'Information obligatoire' }
      ],
      'prenom': [
        { type: 'required', message: 'Information obligatoire' }
      ],
      'email': [
        { type: 'required', message: 'Information obligatoire' },
        { type: 'pattern', message: 'Email Invalide' }
      ],
      'password': [
        { type: 'required', message: 'Mot de passe obligatoire' },
        { type: 'minLength', message: 'Le mot de passe doit etre superieur ou egale à 6 caracteres' }
      ],
      'confirm_password': [
        { type: 'required', message: 'Inserer votre confirmation de mot passe' },
        { type: 'minLength', message: 'Le mot de passe doit etre superieur ou egale à 6 caracteres' },
        { type: 'equalTo', message: 'La confirmation n\'est pas correcte.' },
      ]
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

      let input = control.value;
      console.log(control);
      let isValid=control.root.value[field_name]==input
      if(!isValid)
        return { 'equalTo': {isValid} }
      else
        return null;
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  connexion(value){
  var myData = JSON.stringify({last_name: value.nom, first_name: value.prenom,  email: value.email,password: value.password});
    this.http.post("http://ici.cm/MobileApp/registration",myData)
    .subscribe(data => {
    this.presentToast(data["_body"]);
    }, error => {
    console.log("Oooops!");
    });

  }

  private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
 }


}
