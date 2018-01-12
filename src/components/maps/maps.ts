import {Component, ElementRef, ViewChild, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
//import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  // template: '<p>Hello, {{test}}!</p>'
})
export class MapsComponent {


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  @Input() business : {name:"", latitude:"",longitude:""};
  name;
  latitude;
  longitude;
 

  constructor( public navParams: NavParams) {
    //var business=this.navParams.get("business");
    
  }

  ngAfterViewInit(){
    this.name=this.business.name;
    this.latitude=this.business.latitude;
    this.longitude=this.business.longitude;
        
    this.loadMap();
  }

  loadMap(){

    let latLng = new google.maps.LatLng(this.latitude, this.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
    };

    let MapEl = this.mapElement.nativeElement;
    this.map = new google.maps.Map(MapEl, mapOptions);

    console.log(this.latitude+" - "+this.longitude);
    var position = new google.maps.LatLng(this.latitude, this.longitude);

     let markerData = {
          position: position,
          map: this.map,
          title: this.name,
        };

    var marker = new google.maps.Marker(markerData);
    marker.setMap(this.map);

  }

}
