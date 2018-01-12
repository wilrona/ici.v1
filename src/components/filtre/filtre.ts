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
  @Input('clear') clear: boolean = false;
  itenSelect:Array<any> = [];

  cities: Array<[any]>;
  categories: Array<[any]>;
  cat: Array<[any]>;
  city: Array<any>;

  constructor(public listingService: CompaniesProvider, public events: Events) {
    this.loadCategory();
    this.getCities();

    this.events.subscribe('clearFilter', (clear) => {
      if(clear === true){
        this.itenSelect = [];
        this.city = [];
        let elems = document.getElementsByClassName('item-block');

        [].forEach.call(elems, function(el) {
          el.classList.remove("hover");
        });
      }
    });
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
    // event.target.parentElement.parentElement.classList.toggle('hover');
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
