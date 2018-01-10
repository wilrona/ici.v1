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
  @ViewChild('editable') contenu;
  EditActive: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n' +
      '     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!'
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editDescription(){
    this.contenu.nativeElement.contentEditable = true;
    this.EditActive = true;
  }

  removeEdit(){
    this.contenu.nativeElement.contentEditable = false;
    this.EditActive = false;
  }

}
