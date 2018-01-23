import {ChangeDetectorRef, Component, ElementRef, Renderer, ViewChild} from '@angular/core';
import {Content, Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {CompaniesProvider} from "../../providers/companies/companies";
import {EmailComposer} from "@ionic-native/email-composer";
import {CallNumber} from "@ionic-native/call-number";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ReviewFormPage} from "../review-form/review-form";
import {LoginPage} from "../login/login";

declare var google;
/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-company-details',
  templateUrl: 'company.html',
})
export class CompanyPage {

  @ViewChild(Content) content: Content;
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  transition:boolean = false;
  // articles:Array<any> = new Array(20).fill('');
  segmentation:string;
  dark:boolean = true;

  /*public ;*/
  business={};
  idcompagnie;
  desc;
  latitude;
  longitude;
  name;
  valiRate;
  userconnect=false;
  user;
  ville;
  quartier;
  description;
  repere;
  adresse;



  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public renderer: Renderer,
    public modalCtrl: ModalController,
    public listingService: CompaniesProvider,
    private emailComposer: EmailComposer,
    private callNumber: CallNumber,
    private iab: InAppBrowser,
    private events: Events
  ) {

    this.idcompagnie = navParams.get("idcompagnie");
    this.loadData(this.idcompagnie);
    //this.desc=this.business.description;
    var currentUser = JSON.parse(localStorage.getItem('userId'));


    this.user = currentUser;

    if(localStorage.getItem("userId")) {
      // console.log("true1");
      this.userconnect = true;
    }

    events.subscribe('userconnect', (user) => {
      // console.log("true2");
      this.userconnect =true;
    });

    events.subscribe('companyInfoupdate', (data) => {
      //alert("ss la");
      var data = JSON.parse(data);
      this.business=data;
      /*this.name=data.name;
      this.ville=data.ville;
      this.quartier=data.quartier;
      this.description=data.description;
      this.latitude=data.latitude;
      this.longitude=data.longitude;
      this.repere=data.repere;
      this.adresse=data.adresse;*/
    });
  }
  loadData(id){
    this.listingService.getCompanyById(id).subscribe(
      data => {
        this.business= data;
        this.latitude=data.latitude;
        this.name=data.name;
        this.longitude=data.longitude;
        this.ville=data.ville;
        this.quartier=data.quartier;
        this.description=data.description;
        this.repere=data.repere;
        this.adresse=data.adresse;
      }
    );
  }

  ionViewWillEnter(){
    this.segmentation ='desc';
  }

  ngAfterViewInit(){
    // this.loadMap();

  }

  ionViewDidLoad() {

    this.headerImgUrl = 'assets/imgs/back.jpg';
    // this.content.enableScrollListener();


  }
  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 15;
    if(scrollTop < 0){
      this.transition = false;
      this.headerImgSize = `${ Math.abs(scrollTop)/2 + 100}%`;
    }else{
      this.transition = true;
      this.headerImgSize = '100%'
    }
    this.ref.detectChanges();
  }

  onModelChange(val, companyId){
    //alert(this.user);
    if(this.userconnect==true){
      let myModal = this.modalCtrl.create(ReviewFormPage, {vote: val, companyId: companyId});
      myModal.present();

    } else{
      let myModal = this.modalCtrl.create(LoginPage,{type:"review",vote: val, companyId: companyId });
      myModal.present();
    }

  }

  loadMap(){

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
    };

    let MapEl = this.mapElement.nativeElement;
    this.map = new google.maps.Map(MapEl, mapOptions);
  }

  activeMap(){
    this.dark = false
  }

  activeLocation(){
    this.dark = true;
  }

  activeAvis(){
    this.dark = true;
  }

  callCompany(phonenumber:any){
    this.callNumber.callNumber(phonenumber, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer '+phonenumber));
  }

  emailCompany(emailcpy:any){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
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

  websiteCompany(siteweb){
    const browser = this.iab.create(siteweb);

  }
}
