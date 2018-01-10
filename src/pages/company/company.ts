import {ChangeDetectorRef, Component, Renderer, ViewChild} from '@angular/core';
import {Content, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CompanyDescriptionPage} from "../company-description/company-description";
import {CompanyImagesPage} from "../company-images/company-images";
import {CompanyInfoPage} from "../company-info/company-info";

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




}
