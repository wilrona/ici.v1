import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ModalController, ToastController, App, Events,
  ViewController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
/*import { ModalPage } from '../../pages/modal-page/modal-page';
import { AddGpsPage } from '../../pages/add-gps/add-gps';*/

//import {AuthProvider} from '../../providers/auth/auth';
import { Http, Headers, RequestOptions } from '@angular/http';
import {AuthProvider} from "../../providers/auth/auth";
import {VariableProvider} from "../../providers/variable/variable";
//import {JwtHelper} from "angular2-jwt";
//import {Storage} from "@ionic/storage";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  validations_form;
  validation_messages;
  username;
  password;



  // When the page loads, we want the Login segment to be selected
  authType: string = "login";

  // We need to set the content type for the server
  contentHeader = new Headers({"Content-Type": "application/json"});
  error: string;
  //jwtHelper = new JwtHelper();
  user: string;

  constructor(public events: Events, public app: App,
              public navCtrl: NavController,
              public http: Http, public toastCtrl: ToastController,
              public navParams: NavParams, public formBuilder: FormBuilder,
              public viewCtrl: ViewController, public users:AuthProvider,
              public variable: VariableProvider
  ) {

    this.validations_form = this.formBuilder.group({
      login: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))

    });

    this.validation_messages = {

      'login': [
        { type: 'required', message: 'Adresse Email obligatoire.' },
        { type: 'pattern', message: 'Format adresse email invalid'}
      ],
      'password': [
        { type: 'required', message: 'Mot de passe obligatoire.' },
        { type: 'minLength', message: 'Le mot de passe doit etre superieur ou egale à 6 caracteres' },
      ]
    }

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

   openModal() {
  /*  let myModal = this.modalCtrl.create(ModalPage); //ModalPage
    myModal.present();*/
  }


  connexion(val){
    var myData = JSON.stringify({email: val.login, password: val.password});
    this.http.post("http://yoomeeonl.webfactional.com/MobileApp/login",myData)
    .map(
        result =>
        {
          return result.json()
        })
      .subscribe(data => {
     // console.log(data["id"]);
      if(data["id"]==0){
        this.presentToast("Votre login nexiste pas, veuillez pour inscrire.");
        }
      else{
        //console.log(data["_body"]);
        localStorage.setItem('userId', JSON.stringify({ id: data["id"], lastName: data["last_name"], firstName: data["first_name"],  email: data["email"] }));
        //this.navCtrl.push('CpanelPage');
        //  let nav = this.app.getRootNav();
       // nav.setRoot('CpanelPage');
       this.events.publish('userconnect', true);
       this.navCtrl.popToRoot();
        //this.navCtrl.setRoot ('CpanelPage');

      }

    }, error => {
       console.log("Oooops!");
    });
  }



  private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 5000,
    position: 'top'
  });
  toast.present();
 }




}
