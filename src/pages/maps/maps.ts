import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController, Events, Platform} from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';

import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import {VariableProvider} from "../../providers/variable/variable";
import {CompanyPage} from "../company/company";

declare var google: any;
declare var MarkerClusterer: any;
declare var RichMarker: any;

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

  public listMarker: Array<any>;
  cities: Array<any> = [];
  categories: Array<any> = [];
  listing: Array<any> = [];
  val: number;
  // public listMarker = new Array();
  public newMarkers: Array<any> = [];
  public currentMaker: any;
  public element: object;

  // @Output() refresh: EventEmitter<object>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, public menu: MenuController,
              public listingService: CompaniesProvider,
              public toastCtrl: ToastController,
              public platform: Platform,
              private emailComposer: EmailComposer,
              private callNumber: CallNumber,
              public variable: VariableProvider,
              public events: Events) {

    menu.enable(true);

    // this.refresh = new EventEmitter<object>();

    this.events.subscribe('citiesfilter', (cities) => {
      this.cities = cities;
    });
    this.events.subscribe('categoriesfilter', (categories) => {
      this.categories = categories;
    });


    events.subscribe('listingMap', (listing) => {
      this.newMarkers = [];
      this.platform.ready().then(() => this.loadMaps());

    });

    events.subscribe('reloadMaps', (cities, categories) => {

      this.categories = categories;
      this.cities = cities;

      if (this.variable.getInitTabMaps() === false) {
        this.newMarkers = [];
        this.platform.ready().then(() => this.loadMaps());
      }

    });

    if (this.variable.getInitTabMaps() === true) {
      this.newMarkers = [];
      this.platform.ready().then(() => this.loadMaps());
    }

  }

  ionViewDidLoad() {

  }

  openDetail(id) {
    this.navCtrl.push(CompanyPage, {
      idcompagnie: id
    });

  }

  openMenu(evt) {
    if (evt === "right") {
      this.menu.enable(true, 'menu');
      this.menu.enable(false, 'filtre');
    } else {
      this.menu.enable(true, 'filtre');
      this.menu.enable(false, 'menu');
    }
    this.menu.toggle();
    document.getElementById('map').style.height = '100%';


  }

  loadMaps() {
    this.initializeMap();
    this.getMarkers();
  }

  initializeMap() {
    let mapEle = this.mapElement.nativeElement;
    this.map = new google.maps.Map(mapEle, {
      zoom: 6,
      center: new google.maps.LatLng(7.4452674, 12.4346327),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: [{
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#c6c6c6"}]
      }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
      }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{"saturation": -100}, {"lightness": 45}]
      }, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{"visibility": "simplified"}]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#ffffff"}]
      }, {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      }, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]}, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{"color": "#dde6e8"}, {"visibility": "on"}]
      }],
      disableDoubleClickZoom: false,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
    });
  }


  placeMarkers(markers) {

    for (let point of markers) {

      let markerContent = document.createElement('div');
      let thumbnailImage;

      thumbnailImage = "http://yoomeeonl.webfactional.com/media/pictures/categories/bar.jpg";

      // if ((point["logo"] != undefined) || (point["logo"] != '')) {
      //   thumbnailImage = point["logo"];
      // }
      // else {
      //   // thumbnailImage = base_url+"/assets/img/items/default.png";
      //   thumbnailImage = "http://yoomeeonl.webfactional.com/media/pictures/categories/bar.jpg";
      // }

      // if (point["featured"] == 1) {
      //   markerContent.innerHTML =
      //     '<div class="marker" data-id="' + point["_id"]['$id'] + '">' +
      //     '<div class="title">' + point["name"] + '</div>' +
      //     '<div class="marker-wrapper">' +
      //     '<div class="tag"><i class="fa fa-check"></i></div>' +
      //     '<div class="pin">' +
      //     '<div class="image" style="background-image: url(' + thumbnailImage + ');"></div>' +
      //     '</div>' +
      //     '</div>' +
      //     '</div>';
      // }
      // else {
      markerContent.innerHTML =
        // '<div class="marker" data-id="'+ point["_id"]+'">' +
        '<div class="marker" data-id="' + point["_id"]['$id'] + '">' +
        '<div class="title">' + point["name"] + '</div>' +
        '<div class="marker-wrapper">' +
        '<div class="pin">' +
        '<div class="image" style="background-image: url(' + thumbnailImage + ');"></div>' +
        '</div>' +
        '</div>';
      // console.log(markers[i]["_id"]);
      // console.log(markers[i]["_id"].$id);
      // }

      // Latitude, Longitude and Address

      if (point["latitude"] && point["longitude"]) {
        this.renderRichMarker(point, markerContent);
      }
      else {
        console.log("No location coordinates" + point["name"]);
      }

    }
  }


  renderRichMarker(i, markerContent) {

    //console.log( map.getBounds().contains( new google.maps.LatLng( markers[i]["latitude"], markers[i]["longitude"] ) ) );
    let marker = new RichMarker({
      position: new google.maps.LatLng(i["latitude"], i["longitude"]),
      map: this.map,
      draggable: false,
      content: markerContent,
      flat: true
    });
    /* google.maps.event.addListener(marker, 'click', (function(marker, i) {

       return function(i) {
         this.element={"name": "ari"};
         this.refresh.emit(this.element);
         alert(i["name"]);
         let heightDetail = document.getElementById('details').offsetHeight;
         document.getElementById('map').style.height = 'calc(100% - '+heightDetail+'px)';
       }
     })(marker, i));*/
    // google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //   // this.element = i;
    //
    //   document.getElementById('details').classList.toggle('uk-hidden');
    //   let heightDetail = document.getElementById('details').offsetHeight;
    //   document.getElementById('map').style.height = 'calc(100% - '+heightDetail+'px)';
    //
    // })(marker, i));

    google.maps.event.addListener(marker, 'click', () => {
        console.log(i);
        let DetailElement = document.getElementById('details');
        if(this.isEmpty(this.element)){
          this.element = i;

          DetailElement.classList.remove('uk-hidden');
          document.getElementById('map').style.height = 'calc(100% - 187px)';

        }else{

          if(this.element != i){
            this.element = i;
          }else{
            DetailElement.classList.add('uk-hidden');
            document.getElementById('map').style.height = '100%';
            this.element = {};
          }
        }


    });

    this.currentMaker = i;
    this.newMarkers.push(marker);

  }

  placeCluster() {

    let clusterStyles = [
      {
        url: 'http://yoomeeonl.webfactional.com/assets/img/cluster.png',
        height: 36,
        width: 36,
      }
    ];

    new MarkerClusterer(this.map, this.newMarkers, {styles: clusterStyles, maxZoom: 14});
  }

  getMarkers() {
    this.listingService.getMarkers(this.categories, this.cities).subscribe(data => {
      this.placeMarkers(data);
      this.placeCluster();
    });

  }

  closedModal() {
    document.getElementById('map').style.height = '100%';
    document.getElementById('details').classList.add('uk-hidden');
    this.element = {};
  }

  callCompany(phonenumber: any) {
    this.callNumber.callNumber(phonenumber, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer ' + phonenumber));
  }

  emailCompany(emailcpy: any) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
      }
    });

    let email = {
      to: emailcpy,
      subject: '',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  isEmpty(arg: object) {
    for (var item in arg) {
      return false;
    }
    return true;
  }

}

