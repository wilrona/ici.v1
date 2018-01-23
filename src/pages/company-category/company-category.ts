import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, Events} from 'ionic-angular';
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
  public events: Events) {

   this.categories = navParams.get("categoriesselect");
   this.categoriesname = navParams.get("categoriesselectname");

   this.itenSelect=this.categories;
   this.itenSelect2=this.categoriesname;
   
   console.log("c1 "+this.categories);
   console.log("c2 "+this.categoriesname);
   
   this.loadCategory();
   //this.defaultSelect1();
  }

  ionViewDidLoad() {
  //  this.loadCategory();
 // this.loadCategory();
   
    
  }

  defaultSelect(item){

      const index = this.categories.indexOf(item._id.$id);
      console.log("i111  "+item._id.$id);
      if(index>-1){
        // this.hover="hover";
         console.log("yes "+item._id.$id);

         return "hover"; 
         
      }
      else{
        return "";
      }
    
  }

   defaultSelect1(categories){
      for (let cat of categories){
           const index = this.categories.indexOf(cat._id.$id);
           if(index>-1){
              categories.classe="hover";
          }
          else{
              categories.classe="";
          }
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
      // event.target.parentElement.parentElement.classList.toggle('hover');
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
        
        
        
          if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
              return true;
          }
        
          return false;
      })
  }



  searchCategory(e){

     this.cat=this.cats;
     //this.loadCategory();
     console.log("e1 "+this.search);
     console.log(e);
     let i=0;
      
     let result=[];
     let res=[];
     console.log("test++-++2--");
     console.log(this.cats);
     console.log(this.cat);
     
           
      /* if(e.data==null){
           this.cat=this.cats;  
           console.log(this.cats);
           console.log("test");
           
       }*/
      
      this.cat.filter((item) => {
        //for(let item of this.cat){
          
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

          /*var search = e.target.value;
          console.log("rech "+search);*/
          
         ct.subcat.filter((it) => {
        //for(let it of ct.subcat){  
           // 
            let res = it.name.split(" ");
            let rech="";
            for(let i=0; i<res.length; i++){
                rech=rech+res[i];
            }
            //  console.log("rech "+rech);
            let index=rech.toLowerCase().indexOf(this.search.toLowerCase());
            if (index>-1){
              subcat.push(it);
              console.log(it.name+"  "+index+" "+this.search.toLowerCase());
              console.log("+ --+ "+rech);
            } 

            j++;
        });
         console.log("subcat  "+i);
         console.log(subcat);
         ct.subcat=subcat;
 
         result.push(ct);
        //res.push(ct2);  
           
       

        i++;

        //} 
      });
       
        this.cat=result;
        //this.cats=res;
        
        console.log("-----------test++-++2--");
        console.log(this.cats);
        console.log(this.cat);
        
  }

  onCancelCategory(e){
      this.cat=this.cats;
  }

}
