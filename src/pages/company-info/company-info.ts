import { Component, ViewChild, ElementRef } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController, ModalController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MapProvider } from '../../providers/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import {CompanyCategoryPage} from "../company-category/company-category";

// DONT FORGET THIS DECLARATION TO AVOID TYPESCRIPT ERROR
declare var VideoPicturePreviewPickerV2: any;

/**
 * Generated class for the CompanyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-company-info',
  templateUrl: 'company-info.html',
})
export class CompanyInfoPage {

  tags = [];
  //company:{};
  name;
  description;
  adresse;
  phone;
  email;
  siteweb;
  latitude;
  longitude;
  ville;
  region;
  quartier;
  bp;
  repere;
  validations_form;
  map: any; 
  addressElement: HTMLInputElement = null;

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;

  constructor(
  public geolocation : Geolocation, 
  public mapService: MapProvider,
  public formBuilder: FormBuilder, 
  public navCtrl: NavController, 
  public navParams: NavParams, 
  public viewCtrl: ViewController,
  public modalCtrl: ModalController,
  public platform: Platform) {
    var company = navParams.get("company");
    var i=0;
    for(let t of company.tags){
      if(t.cat==0){
      this.tags[i]=t.key;
      i++;
      }
    }
      this.validations_form = this.formBuilder.group({
        ville: [company.ville,Validators.required],
        name: [company.name,Validators.required],
        phone: [company.phone,Validators.required],
        description: [company.description,Validators.required],
        region: [company.region,''],
        quartier: [company.quartier,''],
        latitude: [company.latitude,''],
        longitude: [company.longitude,''],  
        adresse: [company.adresse,''],
        email: [company.email, ''],
        siteweb: [company.siteweb, ''],
        bp: [company.bp,''],
        repere: [company.repere,''],
        tags: [this.tags,'']
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInfoPage');
  }

  ngAfterViewInit(){
      this.loadMaps();
    
  }
  
  openCategoryEdit(){
    let categoryModal = this.modalCtrl.create(CompanyCategoryPage);
    categoryModal.present();
  }

  loadMaps() {
      this.initializeMap();
      this.addressElement = document.getElementById('search').getElementsByTagName('input')[0];
      this.initAutocomplete();
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  initializeMap() {
    //let that = this;
      //this.currentLocation();
  //  this.zone.run(() => {
      var mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(mapEle, {
        zoom: 16,
        center: { lat: 4.036072, lng: 9.672423799999933},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: false,
        scaleControl: true,
      });
        let markerData = {
          position: {
            lat:  4.036072,
            lng: 9.672423799999933
          },
          map: this.map,
        };
        var dMarker = new google.maps.Marker(markerData);
        dMarker.setMap(this.map);

  }

  getAddress(latLngObj) {
    // Get the address object based on latLngObj
    this.mapService.getStreetAddress(latLngObj).subscribe(
      s_address => {
        if (s_address.status == "ZERO_RESULTS") {
          this.mapService.getAddress(latLngObj).subscribe(
            address => {
              //console.log(address);
              this.validations_form.patchValue({quartier: address.results[0].address_components[1].long_name, region: address.results[0].address_components[4].long_name, ville: address.results[0].address_components[2].long_name, longitude: latLngObj.long, latitude: latLngObj.lat, adresse : address.results[0].address_components[0].long_name});
            
             // this.addressChange.emit(this.address);
              this.getAddressComponentByPlace(address.results[0], latLngObj);
            },
            err => console.log("Error in getting the street address " + err)
          )
        } else {
          
          //this.address = s_address.results[0].formatted_address;
           this.validations_form.patchValue({quartier: s_address.results[0].address_components[1].long_name, region: s_address.results[0].address_components[4].long_name, ville: s_address.results[0].address_components[2].long_name, longitude: latLngObj.long, latitude: latLngObj.lat, adresse : s_address.results[0].address_components[0].long_name});
            
          
          this.getAddressComponentByPlace(s_address.results[0], latLngObj);
          
        }
      },
      err => {
        console.log('No Address found ' + err);
      }
    );
  }

  getMapCenter(){
    return this.map.getCenter()
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    
    var options = {
                types: [],
                componentRestrictions: {country: 'cm'}
            };
    //console.log("y3  "+this.addressElement);
    const autocomplete = new google.maps.places.Autocomplete(this.addressElement, options);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          let latLngObj = {'lat': place.geometry.location.lat(), 'long': place.geometry.location.lng()}
          this.getAddress(latLngObj);
          sub.next(place.geometry.location);
            let markerData = {
              position: {
                lat: latLngObj.lat,
                lng: latLngObj.long
              },
              map: this.map,
            };
            var dMarker = new google.maps.Marker(markerData);
            dMarker.setMap(this.map);
           // this.addressChange.emit(this.address);
        }
      });
    });
  }

  getAddressComponentByPlace(place, latLngObj) {
    var components;

    components = {};

    for(var i = 0; i < place.address_components.length; i++){
      let ac = place.address_components[i];
      components[ac.types[0]] = ac.long_name;
    }

    let addressObj = {
      street: (components.street_number) ? components.street_number : 'not found',
      area: components.route,
      city: (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality,
      country: (components.administrative_area_level_1) ? components.administrative_area_level_1 : components.political,
      postCode: components.postal_code,
      loc: [latLngObj.long, latLngObj.lat],
      address: this.adresse
    }
    //localStorage.clear();
    //localStorage.setItem('carryr_customer', JSON.stringify(addressObj));
    return components;
  }

  initAutocomplete(): void {
   this.createAutocomplete(this.addressElement).subscribe((location) => {
      //console.log('Searchdata', location);
      let latLngObj = {'lat': location.lat(), 'long': location.lng()};
      this.getAddress(latLngObj);
      let options = {
        center: location,
        zoom: 16
      };
      this.map.setOptions(options);
    });
  }

  uploadPicture()
  {

    this.platform.ready().then(() =>
    {
      VideoPicturePreviewPickerV2.openPicker(
        function(results) {
          console.log(results);
        }, function (error) {
          console.log(error);
        }, {
          limit_Select: 1,
          Is_multiSelect: false,
          picture_selector:  false,
          video_selector:  false,
          display_video_time: false,
          display_preview: true
        });
    });
  }

}
