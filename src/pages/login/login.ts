import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, App, Events  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
/*import { ModalPage } from '../../pages/modal-page/modal-page';
import { AddGpsPage } from '../../pages/add-gps/add-gps';*/

import {AuthProvider} from '../../providers/auth/auth';
import { Http, Headers, RequestOptions } from '@angular/http';
//import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";
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

  constructor(public events: Events, public app: App, private storage: Storage, public navCtrl: NavController, public http: Http, public toastCtrl: ToastController, public navParams: NavParams, public formBuilder: FormBuilder, public modalCtrl: ModalController, public users:AuthProvider) {

      this.validations_form = this.formBuilder.group({
        login: ['',Validators.required],
        password: ['',Validators.required]
        
     });

     this.validation_messages = {
        
        'login': [
          { type: 'required', message: 'Login is required.' }
        ],
        'password': [
          { type: 'required', message: 'password is required.' }
        ]
     }
    
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
      console.log(data["id"]);
      if(data["id"]==0){
        this.presentToast("Votre login nexiste pas, veuillez pour inscrire.");
        }
      else{
        //console.log(data["_body"]); 
        localStorage.setItem('userId', JSON.stringify({ id: data["id"], lastName: data["last_name"], firstName: data["first_name"],  email: data["email"] }));
        //this.navCtrl.push('CpanelPage');
      //  let nav = this.app.getRootNav();
       // nav.setRoot('CpanelPage');
       this.events.publish('userexist', true);
       this.navCtrl.popToRoot ();
        //this.navCtrl.setRoot ('CpanelPage');

      }
    
    }, error => {
    console.log("Oooops!");
    });
  }

  authSuccess(token) {
    this.error = null;
    this.storage.set('token', token);
 //   this.user = this.jwtHelper.decodeToken(token).username;
    this.storage.set('profile', this.user);
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