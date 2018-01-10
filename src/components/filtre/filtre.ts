import {Component, Input} from '@angular/core';
import { CompaniesProvider } from '../../providers/companies/companies';
import { Events } from 'ionic-angular';
/**
 * Generated class for the FilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filtre',
  templateUrl: 'filtre.html'
})
export class FiltreComponent {

  shownGroup = null;
  @Input('showVille') ville: boolean = true;
  itenSelect:Array<any> = [];

  cities: [any];
  categories: [any];    
  cat: [any]; 

  constructor(public listingService: CompaniesProvider, public events: Events) { 
    this.loadCategory();
    this.getCities();
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  itemAdd(i, event){
    const index = this.itenSelect.indexOf(i);
    if(index > - 1){
      this.itenSelect.splice(index, 1);
    }else {
      this.itenSelect.push(i);
    }
    this.events.publish('categoriesfilter', this.itenSelect);
    event.target.parentElement.parentElement.parentElement.classList.toggle('hover');
  }

  getCities(){
         this.listingService.getCities().subscribe(
            data => this.cities= data  
        );
  }

  loadCategory(){
          
         this.listingService.getSubcats().subscribe(
            data => this.cat= data
        );
     
  }

  onTypeSelected(value){
    //console.log(value);
    this.events.publish('citiesfilter', value);
  }


}
