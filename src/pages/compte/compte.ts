import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Events, IonicPage, MenuController, ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {InscriptionPage} from "../inscription/inscription";

/**
 * Generated class for the ComptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compte',
  templateUrl: 'compte.html',
})
export class ComptePage {

  @Input() userconnect:boolean=false;
  @Output() disconnect: EventEmitter<boolean>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menu: MenuController, public modalCtrl: ModalController,
              public events : Events
  ) {
    menu.enable(true);

    if(localStorage.getItem("userId")) {
      this.userconnect = true;
    }

    this.disconnect = new EventEmitter<boolean>();

    events.subscribe('userconnect', (user) => {
      this.userconnect = user;
      this.disconnect.emit(this.userconnect);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComptePage');
  }

  openMenu(evt) {
    if(evt === "right"){
      this.menu.enable(true, 'menu');
      this.menu.enable(false, 'filtre');
    }else{
      this.menu.enable(true, 'filtre');
      this.menu.enable(false, 'menu');
    }
    this.menu.toggle();
  }

  logout(){
    localStorage.clear();
    this.userconnect=false;
    this.disconnect.emit(this.userconnect);
    this.events.publish('userconnect', false);
  }

  login(){
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  inscription(){
    let modal = this.modalCtrl.create(InscriptionPage, { showDismiss : true});
    modal.present();
  }
}
