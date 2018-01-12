import {Component, ElementRef, Input, ViewChild} from '@angular/core';

declare var google;
/**
 * Generated class for the MapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'maps',
  templateUrl: 'maps.html'
})
export class MapsComponent {


  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor() {}

  ngAfterViewInit(){
    this.loadMap();
  }

  loadMap(){

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let MapEl = this.mapElement.nativeElement;
    this.map = new google.maps.Map(MapEl, mapOptions);

  }

}
