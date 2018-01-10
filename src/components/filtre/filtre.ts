import {Component, Input} from '@angular/core';

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

  constructor() { }

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
    event.target.parentElement.parentElement.parentElement.classList.toggle('hover');
  }


}
