import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { Http} from '@angular/http';
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
  message;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http:Http, public toastCtrl: ToastController) {

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

   onSubmit(value){
    //console.log(value.email);
    let link = 'http://ici.cm/MobileApp/resetpasswordConfirm';
    let myData = JSON.stringify({email: value.email});

    this.http.post(link,myData)
    .subscribe(data => {


      if(data["_body"]=="0"){
        this.message="Adresse email nexiste pas.";
      } else {
        this.message="Mot réinitialisé et envoyé par mail.";
      }

    }, error => {
    console.log("Oooops!");
    });
    this.presentToast(this.message);

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
