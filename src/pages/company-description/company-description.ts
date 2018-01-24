import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the CompanyDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-description',
  templateUrl: 'company-description.html',
})
export class CompanyDescriptionPage {

  description:string;
  name:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.description= this.navParams.get("description");
    this.name = this.navParams.get('name');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
