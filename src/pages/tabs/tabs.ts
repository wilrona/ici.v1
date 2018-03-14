import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import { HomePage } from '../home/home';
import {Events, MenuController, ModalController, Nav, NavController, Tab, Tabs} from "ionic-angular";
import {AnnuairePage} from "../annuaire/annuaire";
import {MapsPage} from "../maps/maps";
import {VariableProvider} from "../../providers/variable/variable";
import {CompaniesProvider} from "../../providers/companies/companies";
import {LoginPage} from "../login/login";
import {InscriptionPage} from "../inscription/inscription";
import {FavorisPage} from "../favoris/favoris";
import {CommentairesPage} from "../commentaires/commentaires";
import {MessagesPage} from "../messages/messages";



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AnnuairePage;
  tab3Root = MapsPage;

  @ViewChild('myTabs') tabRef: Tabs;

  cities: Array<any>;
  categories: Array<any>;
  listing: Array<any>;

  citiesfilter:Array<any>;
  categoriesfilter:Array<any>;
  searchfilter: string = "";
  // listing:Array<any>;
  listingMap:Array<any>;
  @Input() userconnect:boolean=false;
  @Output() disconnect: EventEmitter<boolean>;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, index: number}>;

  constructor(public navCtrl: NavController, public menu: MenuController,
              public events: Events, public variable: VariableProvider,
              public listingService: CompaniesProvider, public modalCtrl: ModalController
  ) {

    this.pages = [
      { title: 'Recherche', component: HomePage, index: 0 },
      { title: 'Annuaires', component: AnnuairePage, index: 1 },
      { title: 'Maps', component: MapsPage, index: 2 }
    ];

    this.events.subscribe('citiesfilter', (cities) => {
      this.citiesfilter=cities;
    });
    this.events.subscribe('categoriesfilter', (categories) => {
      this.categoriesfilter=categories;
    });
    this.events.subscribe('searchfilter', (search) => {
      this.searchfilter=search;
    });



    if(localStorage.getItem("userId")) {
      this.userconnect = true;
    }

    this.disconnect = new EventEmitter<boolean>();

    events.subscribe('userconnect', (user) => {
      this.userconnect = user;
      this.disconnect.emit(this.userconnect);
    });

  }

  ionViewDidLoad() {
    this.events.subscribe('citiesfilter', (cities) => {
      this.cities = cities;
    });
    this.events.subscribe('categoriesfilter', (categories) => {
      this.categories = categories;
    });
    this.events.subscribe('searchfilter', (search) => {
      this.searchfilter=search;
    });
  }

  menuToggle(e : Tab){
    this.menu.enable(true, 'menu');

    if(e.index === 2){
      this.events.publish('reloadMaps', this.cities, this.categories, this.searchfilter);

      }
    if (e.index === 1) {
      this.events.publish('reloadAnnuaire', this.cities, this.categories, this.searchfilter);
    }
  }

  closedFiltre(){
    this.menu.enable(true, 'menu');
  }

  filtre(){
    //   console.log("nn0 ");

    /*this.listingService.getListing(this.categoriesfilter, this.citiesfilter, this.searchfilter).subscribe(
      data => {
        this.events.publish('listing', data)
      }
    );*/

    this.events.publish('citiesfilter', this.citiesfilter);
    this.events.publish('categoriesfilter', this.categoriesfilter);
    this.events.publish('searchfilter', this.searchfilter);

    this.events.publish('listing', this.categoriesfilter, this.citiesfilter, this.searchfilter);
    this.events.publish('listingMap', this.categoriesfilter, this.citiesfilter, this.searchfilter);


    /*this.listingService.getMarkers(this.categoriesfilter, this.citiesfilter, this.searchfilter).subscribe(
      data => {
        this.events.publish('listingMap', data)
      }
    );*/

    if(this.citiesfilter || this.categoriesfilter || this.searchfilter){
      this.variable.setInitTabMaps(false);
    }else{
      this.variable.setInitTabMaps(true);
    }

    if(this.citiesfilter || this.categoriesfilter || this.searchfilter){
      this.variable.setInitTabAnnuaire(false);
    }else{
      this.variable.setInitTabAnnuaire(true);
    }


    this.menu.toggle();
    this.closedFiltre();
    this.events.publish('clearFilter', false)
  }


  clearfilter(){
    this.citiesfilter = [];
    this.categoriesfilter = [];
    this.searchfilter = "";
    this.filtre();
    this.events.publish('clearFilter', true)
  }


  logout(){
    localStorage.clear();
    this.userconnect=false;
    this.disconnect.emit(this.userconnect);
    this.events.publish('userconnect', false);
    this.menu.toggle();
  }

  login(){
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
    this.menu.toggle();
  }

  inscription(){
    let modal = this.modalCtrl.create(InscriptionPage, { showDismiss : true});
    modal.present();
    this.menu.toggle();
  }


  favoris(){
    this.navCtrl.push(FavorisPage);
  }

  messages(){
    this.navCtrl.push(MessagesPage);
  }

  commentaires(){
    this.navCtrl.push(CommentairesPage);
  }

  openTab(page){
    this.tabRef.select(page.index)
  }

  keyUpSearch(e){
    //console.log("e");
    //console.log(e.target.value);

    this.events.publish('searchfilter', e.target.value);
  }

}
