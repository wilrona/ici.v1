import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators} from "@angular/forms";
import {CompaniesProvider} from "../../providers/companies/companies";
/**
 * Generated class for the SendMailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-mail',
  templateUrl: 'send-mail.html',
})
export class SendMailPage {
  validation_messages;
  validations_form;
  userconnect=false;
  user=null;
  idcompagnie;
  emailcpy;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
   public listingService: CompaniesProvider,
   public viewCtrl: ViewController,
   public formBuilder:FormBuilder) {
    

    let currentUser = JSON.parse(localStorage.getItem('userId'));
    let require=new FormControl('', Validators.required);
    let requireemail=new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]));

    if(localStorage.getItem("userId")) {
      this.userconnect = true;
      this.user = currentUser.id.$id;
      require=new FormControl('');
      requireemail=new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]));
    }

    this.idcompagnie=navParams.get("idcompagnie");
    this.emailcpy=navParams.get("emailcpy");

    console.log( this.idcompagnie);


    this.validations_form = this.formBuilder.group({
      nom: require,
      prenom: require,
      email: requireemail,
      message: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
    

    this.validation_messages = {

      'nom': [
        { type: 'required', message: 'Nom obligatoire' }
      ],
      'prenom': [
        { type: 'required', message: 'Prenom obligatoire' }
      ],
      'email': [
        { type: 'required', message: 'Email obligatoire' },
        { type: 'pattern', message: 'Email Invalid' }
      ],
      'message': [
        { type: 'required', message: 'Message obligatoire' }
      ]
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendMailPage');
  }

  sendmail(value){
    let myData="";
    if(this.userconnect==false){
       myData = JSON.stringify({emailcpy: this.emailcpy, idcompagnie: this.idcompagnie, nom: value.nom, prenom: value.prenom, email: value.email, message:value.message});

    }else{
       myData = JSON.stringify({emailcpy: this.emailcpy, idcompagnie: this.idcompagnie, user: this.user, message:value.message});
    }
    
    
    this.listingService.sendmail(myData);
    this.viewCtrl.dismiss();
  }

}
