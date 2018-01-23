import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies';

/**
 * Generated class for the CompanyCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-category',
  templateUrl: 'company-category.html',
})
export class CompanyCategoryPage {
  public categories;
  categoriesname;
  cat ;
  cats;
  search;

  itenSelect:Array<any> = [];
  itenSelect2:Array<any> = [];
  searchString = '';

  constructor(public navCtrl: NavController,
          public navParams: NavParams,
          public listingService: CompaniesProvider,
          public viewCtrl: ViewController,
          public events: Events
  ) {

  this.categories = navParams.get("categoriesselect");
  this.categoriesname = navParams.get("categoriesselectname");

  this.itenSelect=this.categories;
  this.itenSelect2=this.categoriesname;

  console.log("c1 "+this.categories);
  console.log("c2 "+this.categoriesname);

  this.loadCategory();
}

  ionViewDidLoad() {
    this.loadCategory();
  }

  defaultSelect(item){

     const index = this.categories.indexOf(item._id.$id);
     if(index>-1){
            return "hover";
     }
     else{
         return "";
     }

  }

  itemAdd(i, event, nam){

     const index = this.itenSelect.indexOf(i);
     const index2 = this.itenSelect2.indexOf(nam);
     console.log("nam "+nam);
     console.log("j "+i);
     if(index > - 1){
       this.itenSelect.splice(index, 1);
       this.itenSelect2.splice(index2, 1);

     }else {
       this.itenSelect.push(i);
       this.itenSelect2.push(nam);

     }

     console.log("iten1 "+this.itenSelect);
     event.target.parentElement.parentElement.parentElement.classList.toggle('hover');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  changeCategorie(){
    this.events.publish('selectcategoriesid', this.itenSelect, this.itenSelect2);
  }



  loadCategory(){
      this.listingService.getAllCategories().subscribe(
           data => {
              this.cat= data;
              this.cats=data;
             }
      );

  }


 searchCat(searchbar) {
   // reset countries list with initial call
     this.cat = this.cats;
   // set q to the value of the searchbar
     var q = searchbar.target.value;

     // if the value is an empty string don't filter the items
       if (q.trim() == '') {
         return;
     }

     this.cat = this.cat.filter((v) => {
         return (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1);
     })
 }




  onCancelCategory(e){
    this.cat=this.cats;
  }

}
