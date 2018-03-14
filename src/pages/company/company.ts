import {ChangeDetectorRef, Component, ElementRef, Renderer, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Content, Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {CompaniesProvider} from "../../providers/companies/companies";
import {EmailComposer} from "@ionic-native/email-composer";
import {CallNumber} from "@ionic-native/call-number";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {ReviewFormPage} from "../review-form/review-form";
import {SendMailPage} from "../send-mail/send-mail";
import {LoginPage} from "../login/login";
import {CompanyDescriptionPage} from "../company-description/company-description";

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
  user=null;
  ville;
  quartier;
  description;
  repere;
  adresse;



  @ViewChild('map') mapElement: ElementRef;
  map: any;
  //checkfavorite:boolean;
  @Input() color:string="heart-outline";
  @Output() refreshfavorite: EventEmitter<string>;

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
    let currentUser = JSON.parse(localStorage.getItem('userId'));

    console.log(currentUser);
    this.refreshfavorite = new EventEmitter<string>();

    //this.user = currentUser;

    if(localStorage.getItem("userId")) {
      
      this.userconnect = true;
      this.user = currentUser.id.$id;
      if(currentUser.favorite){
        console.log("true11   "+currentUser);
        this.checkfavorite(currentUser.favorite, this.idcompagnie);
      }

    }
  

    events.subscribe('userconnect', (user) => {
      this.userconnect =true;
    });

    events.subscribe('companyInfoupdate', (data) => {
      var data = JSON.parse(data);
      this.business=data;
    });

    
    listingService.saveStats(this.idcompagnie, this.user,"pageview");
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



  checkfavorite(favorite, id){
    if (favorite.find(x => x.$id === id)!=null){
        this.color="heart";
    }
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
    if(this.userconnect==true){
      let myModal = this.modalCtrl.create(ReviewFormPage, {vote: val, companyId: companyId});
      myModal.present();

    } else{
      let myModal = this.modalCtrl.create(LoginPage,{type:"review",vote: val, companyId: companyId });
      myModal.present();
    }

  }


  connectFavorite(){
      let myModal = this.modalCtrl.create(LoginPage,{type:"favorite",  companyId: this.idcompagnie });
      myModal.present();
  }

  openDescriptionEdit(descr, name) {
    let descriptionModal = this.modalCtrl.create(CompanyDescriptionPage,{description: descr, name: name} );
    descriptionModal.present();
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
    this.listingService.saveStats(this.idcompagnie, this.user,"phoneview");
    this.callNumber.callNumber(phonenumber, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer '+phonenumber));
  }

  emailCompany(emailcpy:any){
    let sendmailModal = this.modalCtrl.create(SendMailPage,{emailcpy: emailcpy, idcompagnie: this.idcompagnie} );
    sendmailModal.present();
    /*this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
      }
    });

    let email = {
      to: emailcpy,
      subject: '',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);*/
  }

  websiteCompany(siteweb){
    this.listingService.saveStats(this.idcompagnie, this.user,"websiteview");
    siteweb="http://yoomee.cm";
    const browser = this.iab.create(siteweb, '_self');

  }

  favorite(){
    let type="add";
    let data = JSON.parse(localStorage.getItem('userId'));
    if(this.color=="heart"){
       type="remove"; 
       let favorite=data.favorite;
       let idx=favorite.findIndex(x => x.$id==this.idcompagnie);
       console.log("idx "+idx);
       favorite.splice(idx, 1);
       data["favorite"]=favorite;
       localStorage.setItem('userId', JSON.stringify(data));
       this.color="heart-outline";
    }
    else{
      
      let favorite=[];
      if(data.favorite){
        favorite=data.favorite;
      }
      console.log(favorite);
      favorite.push({$id : this.idcompagnie});
      data["favorite"]=favorite;
      localStorage.setItem('userId', JSON.stringify(data));
      this.color="heart";
    }
     this.listingService.favorite(this.idcompagnie, this.user, type);

    this.refreshfavorite.emit(this.color);
  }


}
