import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';


/**
 * Generated class for the ReviewFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-form',
  templateUrl: 'review-form.html',
})
export class ReviewFormPage {

  validations_form;
  validation_messages;
  note;
  companyId;
  user;
  userexist=false;

  constructor(public events: Events, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, public http:Http, public toastCtrl: ToastController) {
    this.validations_form = this.formBuilder.group({
        titre: ['',Validators.required],
        message: ['',Validators.required]
        
     });

     this.validation_messages = {
        
        'login': [
          { type: 'required', message: 'Login is required.' }
        ],
        'password': [
          { type: 'required', message: 'password is required.' }
        ]
     }

     this.note=this.navParams.get("vote");
     this.companyId=this.navParams.get("companyId");

     var currentUser = JSON.parse(localStorage.getItem('userId'));
     this.user = currentUser;

     if(localStorage.getItem("userId")) {
      this.userexist = true;
     }

  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewFormPage');
   }*/

  addreview(value) {
    var myData = JSON.stringify({titre: value.titre, message: value.message, note: this.note,companyId: this.companyId, userId: this.user.id.$id});
    console.log(" id "+this.companyId);
   // alert(value.titre+"  "+this.note+"  "+value.message+" "+this.companyId);
    this.http.post("http://yoomeeonl.webfactional.com/MobileApp/saveReview",myData)    
    .subscribe(data => {
     //  console.log(data["_body"]);
       this.events.publish('companyInfoupdate', data["_body"]);
       this.viewCtrl.dismiss();
    this.toastCtrl.create({message:"Votre commentaire a été enregistré", position: "top"});
    }, error => {
    //console.log("Oooops!");
    });
  }
 

}
