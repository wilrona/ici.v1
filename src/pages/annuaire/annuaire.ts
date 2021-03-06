import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, MenuController, ModalController, Events } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import {VariableProvider} from "../../providers/variable/variable";
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

   public listing: Array<any> = [];
   cities: Array<any> = [];
   categories: Array<any> = [];
   reviews:[any];
   rate:[any];
   imageune:[any];
   count: 0;
   pushPage: any;
   listlength = 20;
   private start:number=0;
   public keyword: string= null;
   perpage:number = 20;
   totalPage = 0;
   companies:any;
   user;
   userconnect:boolean=false;

   loading: boolean;
   //Loading;
   showNoItem:boolean = false;


  constructor(public navCtrl: NavController,
              private emailComposer: EmailComposer, public navParams: NavParams, public menu: MenuController,
    public listingService: CompaniesProvider,
    private callNumber: CallNumber, public variable: VariableProvider,
    public events: Events) {

      menu.enable(true);

      var currentUser = JSON.parse(localStorage.getItem('userId'));
      this.user = currentUser;

      this.keyword= navParams.get("query");

      console.log("query11  "+this.keyword);

      if(localStorage.getItem("userId")) {
        this.userconnect = true;
      }

      events.subscribe('reloadAnnuaire', (cities, categories, keyword) => {

        this.cities = cities;
        this.categories = categories;
        this.keyword=keyword;

        if(this.variable.getInitTabAnnuaire() === false){

          this.loading = true;

          this.listingService.getListing(this.categories, this.cities, this.keyword).subscribe(
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

      });

    events.subscribe('listing', () => {

      this.loading = true;

      this.listingService.getListing(this.categories, this.cities, this.keyword).subscribe(
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

      // this.loading = true;
      // if(listing.length !== 0){
      //   this.listing=listing;
      //   this.showNoItem = false;
      // }else{
      //   this.showNoItem = true;
      // }
      // this.loading = false;
    });

     


      
      if(this.variable.getInitTabAnnuaire() === true){

        //console.log("q  "+this.keyword);
        this.loadData();

      }

      
      this.events.subscribe('citiesfilter', (cities) => {
          this.cities=cities;
      });
      this.events.subscribe('categoriesfilter', (categories) => {
          this.categories=categories;
      });
      
      this.events.subscribe('searchfilter', (search) => {
          this.keyword=search;
          console.log("query11  "+this.keyword);
      });

  }





  ngAfterViewInit(){

   //this.loadData();
   this.keyword= this.navParams.get("query");
   console.log("query112  "+this.keyword);
    ;

  }



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
     this.navCtrl.push(CompanyPage, {
      idcompagnie: id
    });

  }

  doInfinite(infiniteScroll) {
    this.start = this.start+1;

    setTimeout(() => {

      this.listingService.getListing(this.categories, this.cities, this.keyword, this.start*this.perpage)
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
    this.loading = true;

    this.listingService.getListing(this.categories, this.cities, this.keyword).subscribe(
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
