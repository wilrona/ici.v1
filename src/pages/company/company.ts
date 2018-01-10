import {ChangeDetectorRef, Component, ElementRef, Renderer, ViewChild} from '@angular/core';
import {Content, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CompanyDescriptionPage} from "../company-description/company-description";
import {CompanyImagesPage} from "../company-images/company-images";
import {CompanyInfoPage} from "../company-info/company-info";
import {CompanyCategoryPage} from "../company-category/company-category";


declare var google;
/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company',
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

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public renderer: Renderer,
    public modalCtrl: ModalController

  ) { }

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

  openDescriptionEdit() {
    let descriptionModal = this.modalCtrl.create(CompanyDescriptionPage);
    descriptionModal.present();
  }

  openImageEdit() {
    let imageModal = this.modalCtrl.create(CompanyImagesPage);
    imageModal.present();
  }

  openInfoEdit(){
    let infoModal = this.modalCtrl.create(CompanyInfoPage);
    infoModal.present();
  }

  openCategoryEdit(){
    let categoryModal = this.modalCtrl.create(CompanyCategoryPage);
    categoryModal.present();
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

  activeMap(){
    this.dark = false
  }

  activeLocation(){
    this.dark = true;
  }

  activeAvis(){
    this.dark = true;
  }

}
