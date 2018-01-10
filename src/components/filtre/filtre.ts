import { Component } from '@angular/core';
import { CompaniesProvider } from '../../providers/companies/companies';

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
  cities: [any];
  categories: [any];    
  cat: [any]; 
  
      
   
   

  constructor(public listingService: CompaniesProvider) { 
    this.getCities();
    this.loadCategory();
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

}
