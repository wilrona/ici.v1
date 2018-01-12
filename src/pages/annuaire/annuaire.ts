import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, MenuController, Events } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import {CompanyPage} from "../company/company";

/**
 * Generated class for the AnnuairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annuaire',
  templateUrl: 'annuaire.html',
})
export class AnnuairePage {

   public listing: [any];
   cities: [any];
   categories:[any];
   reviews:[any];
   rate:[any];
   imageune:[any];
   count: 0;
   pushPage: any;
   listlength = 20;
   private start:number=0;
   public keyword: string="";
   perpage:number = 20;
   totalPage = 0;
   companies:any;
   user;
   userexist=false;
   loading: boolean = true;

   showNoItem:boolean = false;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController, private emailComposer: EmailComposer, public navParams: NavParams, public menu: MenuController,
    public listingService: CompaniesProvider,
    private callNumber: CallNumber,
    public events: Events) {

      menu.enable(true);

      var currentUser = JSON.parse(localStorage.getItem('userId'));
      this.user = currentUser;
      if(localStorage.getItem("userId")) {
        this.userexist = true;
      }
      this.loadData();

      events.subscribe('listing', (listing) => {

        if(listing.length !== 0){
          this.listing=listing;
          this.showNoItem = false;
        }else{
          this.showNoItem = true;
        }

          // console.log("test" +listing);
      });

      this.events.subscribe('citiesfilter', (cities) => {
          this.cities=cities;
      });
      this.events.subscribe('categoriesfilter', (categories) => {
          this.categories=categories;
      });

  }




 /* ngOnInit(){

   this.loadData();

  }*/



 /*onModelChange(val, companyId){

   if(this.userexist==true){
      //alert(val);
      let myModal = this.modalCtrl.create(AddreviewPage, {vote: val, companyId: companyId});
      myModal.present();

   } else{
      let myModal = this.modalCtrl.create(LoginPage);
      myModal.present();
   }

 }*/

 getImagesUneByCompany(id){
    return this.imageune.find(x => x.idcompagnie.$id === id);
 }

 getAllAverageRate(id){
    let countrate = 0;
    if (this.rate.find(x => x._id.$id === id)!=null){
       countrate=this.rate.find(x => x._id.$id === id).count;
    }
    return countrate;
  }

  getAllAverageReview(id){
     let countreview=0;
     if (this.reviews.find(x => x._id.$id === id)!=null){
         countreview=this.reviews.find(x => x._id.$id === id).count;
     }
     return countreview;
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

  openDetail(id) {
     this.navCtrl.push('CompanyPage', {
      idcompagnie: id
    });

  }

  doInfinite(infiniteScroll) {
    this.start = this.start+1;

    setTimeout(() => {

      this.listingService.getListing(this.categories, this.cities, this.start*this.perpage)
         .subscribe(
           res => {
             this.companies = res;
           //  this.totalPage = 1745;//this.companies.total_pages;
             for(let i=0; i<this.companies.length; i++) {
               this.listing.push(this.companies[i]);
             }
           }//,
         //  error =>  this.errorMessage = <any>error
         );

      //console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }


  loadData(){

    this.listingService.getListing().subscribe(
        data => {
          if(data.length !== 0){

            this.listing = data;


            this.showNoItem = false;
          }else{
            this.showNoItem = true;
          }
          this.loading = false;
        }
    );
  }

  callCompany(phonenumber:any){
      this.callNumber.callNumber(phonenumber, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer '+phonenumber));
  }

  emailCompany(emailcpy:any){
    this.emailComposer.isAvailable().then((available: boolean) =>{
         if(available) {
           //Now we know we can send
         }
      });

      let email = {
        to: emailcpy,
        //cc: 'erika@mustermann.de',
      //  bcc: ['john@doe.com', 'jane@doe.com'],
       /* attachments: [
          'file://img/logo.png',
          'res://icon.png',
          'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
          'file://README.pdf'
        ],*/
        subject: '',
        body: '',
        isHtml: true
      };

      // Send a text message using default options
      this.emailComposer.open(email);
  }
}
