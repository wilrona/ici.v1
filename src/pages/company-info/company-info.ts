import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController, ModalController, Events, LoadingController, Loading, ActionSheetController, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MapProvider } from '../../providers/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import {CompanyCategoryPage} from "../company-category/company-category";
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Http, Headers, RequestOptions } from '@angular/http';

// DONT FORGET THIS DECLARATION TO AVOID TYPESCRIPT ERROR
declare var VideoPicturePreviewPickerV2: any;

/**
 * Generated class for the CompanyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;
declare var cordova: any;

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
  @Input() categorie:Array<any> = [];
  @Output() refresh: EventEmitter<Array<object>>;
  maincategorie:{};
  maincat;
  id;
  cat;

  lastImage: string = null;
  loading: Loading;
  storageDirectory: string = '';
  @Input() logoLocation: string = '';
  @Output() refreshlogo: EventEmitter<string>;
  imagedir: string = '';
  logoexist=false;
  user;

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
  public http: Http,
  public events: Events,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,
  private transfer: FileTransfer,
  private file: File,
  private filePath: FilePath,
  public actionSheetCtrl: ActionSheetController,
  private camera: Camera,
  public platform: Platform) {
    let company = navParams.get("company");

    var i=0;
    for(let t of company.tags){
      if(t.cat==0){
      this.tags[i]=t.key;
      i++;
      }
    }

    var currentUser = JSON.parse(localStorage.getItem('userId'));
      this.user = currentUser;



    this.maincategorie={"name": company.maincategorie, "id": company.maincategorieId};

    this.cat = company.maincategorieId;

    this.refresh = new EventEmitter<Array<object>>();

    this.categorie=company.categorie;
    this.imagedir=company.imagedir;
    this.logoLocation=company.logo;

    events.subscribe('selectcategoriesid', (cat, name) => {
          console.log("c " +cat);
          console.log("name "+name);

         // alert("ar");
          i=0;
          for(let c of cat){
            var b={ "id": c, "name": name[i]};
            this.categorie[i]=b;
            i++;
          }
          this.refresh.emit(this.categorie);

    });

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
        tags: [this.tags,''],
        id:[company._id.$id,'']
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInfoPage');
  }



  ngAfterViewInit(){
      this.loadMaps();

  }

  openCategoryEdit(data){
    let categoryModal = this.modalCtrl.create(CompanyCategoryPage, { categories: data} );
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

public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return  cordova.file.dataDirectory + img; // this.storageDirectory + img;
  }
}


private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
    this.logoLocation=this.pathForImage(this.lastImage);
      }, error => {
    this.presentToast('Error while storing file.');
  });
}

private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };

  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}


public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


uploadImage() {

  var url = "http://yoomeeonl.webfactional.com/assets/external/upload.php";

  // File for Upload
  var filename = this.lastImage; // this.lastImage;
  var targetPath =this.pathForImage(this.lastImage); //this.pathForImage(this.lastImage);
  if((this.imagedir=="")|| (this.imagedir==null)){
     this.imagedir = btoa((new Date()).getTime()+"");
  }

  this.logoLocation=this.imagedir+"/"+filename;
  // File name only

  let options: FileUploadOptions = {
     fileKey: 'files',
     fileName: filename,
     chunkedMode: false,
     mimeType: "multipart/form-data",   //"image/jpeg",
     params : {'files': filename, 'imagedir': this.imagedir}
  }
  var trustHosts = true;
  const fileTransfer: FileTransferObject = this.transfer.create();
  var ft = new FileTransfer();

  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });

  this.loading.present();
  fileTransfer.upload(targetPath, encodeURI(url), options)
   .then((data) => {
     // success
     this.loading.dismissAll();
     this.presentToast('Image succesful uploaded.');
     this.logoexist=true;

   }, (err) => {
     // error
     this.loading.dismissAll();
    this.presentToast('Error while uploading file.');
   });

}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

saveInfo(value){

    if(!(this.lastImage === null)){
      this.uploadImage();
      this.logoexist=true;
    }

    //this.maincat= this.maincategorie.id;

    if(this.maincat==undefined){
      this.maincat= this.cat;
    }

    var myData = JSON.stringify({  quartier:value.quartier, userid: this.user.id.$id, tags: value.tags, adresse:value.adresse,
      region: value.region,website: value.siteweb,longitude: value.longitude,
      latitude: value.latitude, description: value.description, name: value.name,repere: value.repere,ville: value.ville,
      email: value.email,phone: value.phone,idcategorie: this.categorie
      ,maincategorie: this.maincat.$id, id:value.id, bp:value.bp,
      imagedir:this.imagedir, logoLocation:this.logoLocation, logoexist: this.logoexist});


   // console.log(this.maincat);
    console.log(myData);

    /*this.http.post("http://yoomeeonl.webfactional.com/MobileApp/updatecompanyInfo",myData)
    .subscribe(data => {
      this.events.publish('companyInfoupdate', data["_body"]);
      //this.presentToast(data["_body"]);
      // console.log( data["_body"]);
      this.dismiss();
      console.log( data["_body"]);
    }, error => {
    console.log("Oooops!");
  });*/

}




}
