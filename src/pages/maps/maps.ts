import { Component, ElementRef, ViewChild } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';

declare var google: any;
declare var MarkerClusterer: any;
/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public listMarker=new Array();

  constructor(public navCtrl: NavController,
   public navParams: NavParams, public menu: MenuController,
   public listingService: CompaniesProvider,
   public toastCtrl: ToastController) {
    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log(this.mapElement.nativeElement);
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

  ngAfterViewInit(){
    this.loadMaps();
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

  loadMaps() {
      this.initializeMap();
      this.getMarkers();
  }

   initializeMap() {
      var mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(mapEle, {
        zoom: 7,
        center: new google.maps.LatLng(6.6820251,10.1803522),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
      });
  }

  getMarkers() {
    this.listingService.getMarkers().subscribe(data => {
      this.addMarkersToMap(data);
      this.setMapOnAll(this.map);
    });

  }

  addMarkersToMap(markers) {
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var dMarker = new google.maps.Marker({position: position, title: marker.name, id:marker._id});//icon: { url : 'http://yoomeeonl.webfactional.com/media/pictures/categories/bar.jpg' },
      this.listMarker.push(dMarker);
    }
  }

  setMapOnAll(map) {
        for (var i = 0; i < this.listMarker.length; i++) {
          this.listMarker[i].setMap(map);
           //Attach click event handler to the marker.

          var content= 'Latitude: <br />Longitude: ' + this.listMarker[i].title;
          var item={"id": this.listMarker[i].id.$id, "title": this.listMarker[i].title, "ville": this.listMarker[i].ville, "repere": this.listMarker[i].repere};
          this.addInfoWindow(this.listMarker[i], content, this.listMarker[i].id.$id, item);


        }
        new MarkerClusterer(this.map, this.listMarker, {
        cssClass: 'custom-pin',
        imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m'
      });
  }

  addInfoWindow(marker, content, id, item) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      this.presentToast(content,id);
    })
  }

  presentToast(content, id) {
    let toast = this.toastCtrl.create({
      message: content,
      /*duration: 3000,*/
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: "Voir Plus"
    });

    toast.onDidDismiss(() => {
     // this.openDetails(id);
    });

    toast.present();
  }



}
