import {ChangeDetectorRef, Component, Renderer, ViewChild} from '@angular/core';
import {Content, IonicPage, ModalController, NavController, NavParams, Platform} from 'ionic-angular';
import {CompanyDescriptionPage} from "../company-description/company-description";
import {CompanyImagesPage} from "../company-images/company-images";
import {CompanyInfoPage} from "../company-info/company-info";
import { CompaniesProvider } from '../../providers/companies/companies';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';


/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html'
})
export class CompanyPage {

  @ViewChild(Content) content: Content;
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  transition:boolean = false;
  public business ={};
  // articles:Array<any> = new Array(20).fill('');
  segmentation:string;
  idcompagnie;

  dark:boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public renderer: Renderer,
    public modalCtrl: ModalController,
    private emailComposer: EmailComposer,
    public listingService: CompaniesProvider, 
    private platform: Platform, 
    private callNumber: CallNumber
  ) {
    this.idcompagnie = navParams.get("idcompagnie");
    this.loadData(this.idcompagnie);
  }

  ionViewWillEnter(){
    this.segmentation ='desc';

  }
  ionViewDidLoad() {

    this.headerImgUrl = 'assets/imgs/back.jpg';
    // this.content.enableScrollListener();
  }

  loadData(id){
      this.listingService.getCompanyById(id).subscribe(
            data => this.business= data
        );
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



}
