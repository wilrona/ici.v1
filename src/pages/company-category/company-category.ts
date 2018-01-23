import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
  public idCategories: Array<any> = [];
  public cat;
  public subcat: Array<any> = [];
  public search;
  public result;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public listingService: CompaniesProvider,
  public viewCtrl: ViewController) {

    navParams.get("categories").map(cat => {
        this.idCategories.push(cat.id.$id)
    });

    this.categories = navParams.get("categories");
  }

  ionViewDidLoad() {
    this.loadCategory();
  }

  defaultSelect(id){
      const index = this.idCategories.indexOf(id);

      console.log('check');
      return index > -1;
  }

   itemAdd(i, event, nam){
    event.preventDefault();
    /*const index = this.itenSelect.indexOf(i);
    const index2 = this.itenSelect2.indexOf(nam);
    console.log("nam "+nam);
    console.log("j "+i);

    //console.log("nam "+event);

    //var el={"name":name, "id":i};
    if(index > - 1){
      this.itenSelect.splice(index, 1);
      this.itenSelect2.splice(index2, 1);

    }else {
      this.itenSelect.push(i);
      this.itenSelect2.push(nam);

    }


    this.events.publish('categoriesfilter', this.itenSelect);
    //this.categoriesselect=this.itenSelect;

    console.log("iten1 "+this.itenSelect);
    //console.log("iten2 "+this.categoriesselect);


    this.events.publish('selectcategoriesid', this.itenSelect, this.itenSelect2);*/

    event.target.parentElement.parentElement.parentElement.classList.toggle('hover');
    // event.target.parentElement.parentElement.classList.toggle('hover');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  changeCategorie(){

  }



  loadCategory(){
     this.listingService.getSubcats().subscribe(
        data => {
             data.map(parent => {
               parent.subcat.map(sub => {
                 this.subcat.push(sub);
               })
             });
             this.result = this.subcat;
             this.initializeItems();
          }
     );
  }

  initializeItems() {
    this.result.sort(function(name1, name2) {
      if ( name1.name < name2.name ){
        return -1;
      }else if( name1.name > name2.name ){
        return 1;
      }else{
        return 0;
      }
    });

    this.subcat = this.result;
  }

  searchCategory(e){
     console.log("e1 "+this.search);
     console.log(e);

     let val = e.target.value;

     let i=0;

     let result=[];
     let res=[];
     console.log("test++-++2--");
     console.log(this.cat);


      /* if(e.data==null){
           this.cat=this.cats;
           console.log(this.cats);
           console.log("test");

       }*/

     // this.cat.filter((item) => {
        for(let item of this.cat){

         /* if (item.name.toLowerCase().indexOf(this.search.toLowerCase())>-1){
            console.log(item.name);
          }*/
         /* if (item.subcat.name.toLowerCase().indexOf(this.search.toLowerCase())>-1){
            console.log(item.subcat.name);
          }*/
          let ct =item;
         // let ct2 =item;
          let subcat=[];

          var j=0;

         // cat.subcat.filter((it) => {
        for(let it of ct.subcat){
           // console.log("rech "+it.name);
            let res = it.name.split(" ");
            let rech="";
            for(let i=0; i<res.length; i++){
                rech=rech+res[i];
            }
            //  console.log("rech "+rech);
            let index=rech.toLowerCase().indexOf(val);
            if (index>-1){
              subcat.push(it);
              console.log(it.name+"  "+index+" "+val);
              console.log("+ --+ "+rech);
            }

            j++;
        }
         console.log("subcat  "+i);
         console.log(subcat);
         ct.subcat=subcat;

         result.push(ct);
        //res.push(ct2);



        i++;

        }

        this.cat=result;
        //this.cats=res;

        console.log("-----------test++-++2--");
        console.log(this.cat);

  }

  searchInCatetegory(e){

    this.initializeItems();

    let val = e.target.value;

    if (val && val.trim() != '') {
        this.subcat = this.subcat.filter((item) => {
           return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });

    }

  }



  onCancelCategory(e){
      this.loadCategory();
  }

}
