import { Component } from '@angular/core';
import { NavController, NavParams, Events, App } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';
import {AnnuairePage} from "../annuaire/annuaire";
import {VariableProvider} from "../../providers/variable/variable";


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public companyprovider: CompaniesProvider,
  public variable: VariableProvider,
  public events: Events, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  OpenDetail(e){
    console.log(e);
    //this.navCtrl.push(AnnuairePage, {query: e}); 
   
    //this.events.publish('searchfilter', e);
  //  this.navCtrl.parent.select(1);
   // this.navCtrl.setRoot(AnnuairePage);  
    //
   this.navCtrl.parent.select(1).then(()=> {
        //this.Events.publish("Play");
        this.navCtrl.push(AnnuairePage, {query: e});
        //const ANIMATION = { animate: true, direction: 'back' };
        // this.navCtrl.setRoot(AnnuairePage, {query: e}, ANIMATION);
        //this.variable.setInitTabAnnuaire(true);
        //this.navCtrl.push(AnnuairePage, {query: e});
        
    });
    //this.navCtrl.push(AnnuairePage, {query: e});
    
  }

}
