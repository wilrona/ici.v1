webpackJsonp([7],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnuairePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__ = __webpack_require__(222);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AnnuairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AnnuairePage = (function () {
    function AnnuairePage(navCtrl, loadingCtrl, emailComposer, navParams, menu, listingService, callNumber, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailComposer = emailComposer;
        this.navParams = navParams;
        this.menu = menu;
        this.listingService = listingService;
        this.callNumber = callNumber;
        this.events = events;
        this.listlength = 20;
        this.start = 0;
        this.keyword = "";
        this.perpage = 20;
        this.totalPage = 0;
        this.userexist = false;
        menu.enable(true);
        var currentUser = JSON.parse(localStorage.getItem('userId'));
        this.user = currentUser;
        if (localStorage.getItem("userId")) {
            this.userexist = true;
        }
        this.loadData();
        events.subscribe('listing', function (listing) {
            _this.listing = listing;
            // console.log("test" +listing);
        });
        this.events.subscribe('citiesfilter', function (cities) {
            _this.cities = cities;
        });
        this.events.subscribe('categoriesfilter', function (categories) {
            _this.categories = categories;
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
    AnnuairePage.prototype.getImagesUneByCompany = function (id) {
        return this.imageune.find(function (x) { return x.idcompagnie.$id === id; });
    };
    AnnuairePage.prototype.getAllAverageRate = function (id) {
        var countrate = 0;
        if (this.rate.find(function (x) { return x._id.$id === id; }) != null) {
            countrate = this.rate.find(function (x) { return x._id.$id === id; }).count;
        }
        return countrate;
    };
    AnnuairePage.prototype.getAllAverageReview = function (id) {
        var countreview = 0;
        if (this.reviews.find(function (x) { return x._id.$id === id; }) != null) {
            countreview = this.reviews.find(function (x) { return x._id.$id === id; }).count;
        }
        return countreview;
    };
    AnnuairePage.prototype.openMenu = function (evt) {
        if (evt === "right") {
            this.menu.enable(true, 'menu');
            this.menu.enable(false, 'filtre');
        }
        else {
            this.menu.enable(true, 'filtre');
            this.menu.enable(false, 'menu');
        }
        this.menu.toggle();
    };
    AnnuairePage.prototype.openDetail = function (id) {
        this.navCtrl.push('CompanyPage', {
            idcompagnie: id
        });
    };
    AnnuairePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.start = this.start + 1;
        /*let query=this.keyword;
        let ville= new Array();
        let cat= new Array();
      
        var i =0;
        for(let c of this.cities){
          if (c.checked==true){
      
            ville[i]=c.name;
            i++;
          }
        }*/
        setTimeout(function () {
            _this.listingService.getListing(_this.categories, _this.cities, _this.start * _this.perpage)
                .subscribe(function (res) {
                _this.companies = res;
                //  this.totalPage = 1745;//this.companies.total_pages;
                for (var i = 0; i < _this.companies.length; i++) {
                    _this.listing.push(_this.companies[i]);
                }
            } //,
            //  error =>  this.errorMessage = <any>error
            );
            //console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 1000);
    };
    AnnuairePage.prototype.loadCategory = function () {
        var _this = this;
        this.listingService.getAllCategories().subscribe(function (data) { return _this.categories = data; });
    };
    AnnuairePage.prototype.loadData = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'chargement...',
        });
        this.loading.present();
        this.listingService.getListing().subscribe(function (data) {
            if (data) {
                _this.listing = data;
                _this.loading.dismiss();
            }
        });
    };
    AnnuairePage.prototype.callCompany = function (phonenumber) {
        this.callNumber.callNumber(phonenumber, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer ' + phonenumber); });
    };
    AnnuairePage.prototype.emailCompany = function (emailcpy) {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
                //Now we know we can send
            }
        });
        var email = {
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
    };
    AnnuairePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-annuaire',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/annuaire/annuaire.html"*/'<!--\n  Generated template for the AnnuairePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar padding-horizontal>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n        <ion-icon name="menu" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openMenu(\'left\')">\n        <ion-icon name="funnel" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n    <!--ion-item-divider color="light">3500 resultats d\'entreprise</ion-item-divider-->\n\n    <ion-card *ngFor="let liste of listing ">\n      <ion-card-content>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-9>\n              <h2 class="uk-text-truncate uk-margin-remove" (click)="openDetail(liste._id.$id)">{{liste.name}}</h2>\n              <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted" style="margin-bottom: 4px !important;">{{liste.ville}} {{liste.quartier}}</div>\n              <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-success uk-text-small"> <ion-icon name="checkmark-circle"></ion-icon> Entreprise validé</div>\n              <!-- <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-danger uk-text-small"> <ion-icon name="close"></ion-icon> Validation en cours</div> -->\n            </ion-col>\n            <ion-col col-3>\n              <rating  [(ngModel)]="liste.ratecount"\n                       readOnly="true"\n                       max="5"\n                       emptyStarIconName="star-outline"\n                       halfStarIconName="star-half"\n                       starIconName="star"\n                       nullable="false" \n                       (ngModelChange)="onModelChange($event, liste._id.$id)"></rating>\n              <div class="uk-text-right uk-h4 uk-margin-remove">{{liste.reviewcount}} avis</div>\n              <div class="uk-text-right uk-text-success uk-h4 uk-margin-remove uk-text-bold">8h à 18h30</div>\n            </ion-col>\n            <ion-col col class="uk-padding-remove-vertical">\n              <hr no-margin="">\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-9>\n              <ion-item class="item-compagny">\n                <ion-thumbnail item-start>\n                  <img  *ngIf="liste.imageune==null"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg" class="uk-responsive-height">\n			            <img  *ngIf="liste.imageune!=null"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/{{liste.imageune}}" class="uk-responsive-height">\n                </ion-thumbnail>\n                <div>\n                  <ion-badge item-end class="uk-margin-remove-top uk-margin-remove-left uk-margin-remove-right">{{liste.maincategorie}}</ion-badge>\n                </div>\n\n                <div class="uk-h4 uk-margin-remove">\n                  <ul class="uk-text-small uk-padding-small uk-padding-remove-vertical uk-padding-remove-right" no-margin>\n                    <li *ngIf="liste.adresse!=\'\'">{{liste.adresse}}</li>\n                    <li *ngIf="liste.repere!=\'\'">{{liste.repere}}</li>\n                    <!--li>Localisation</li-->\n                  </ul>\n                </div>\n\n              </ion-item>\n            </ion-col>\n            <ion-col col-3 class="uk-position-relative">\n              <div class="uk-position-bottom-right">\n                <ion-icon name="call" class="icon-m" (click)="callCompany(liste.phone)"></ion-icon>\n                <ion-icon name="mail" class="icon-m" (click)="emailCompany(liste.email)"></ion-icon>\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n    \n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)" > <!--*ngIf="page < totalPage"-->\n      <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data..."></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/annuaire/annuaire.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]) === "function" && _h || Object])
    ], AnnuairePage);
    return AnnuairePage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=annuaire.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CompanyCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompanyCategoryPage = (function () {
    function CompanyCategoryPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    CompanyCategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompanyCategoryPage');
    };
    CompanyCategoryPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CompanyCategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company-category',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-category/company-category.html"*/'<!--\n  Generated template for the CompanyCategoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only small (click)="dismiss()">\n        <ion-icon name="close" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title>Gérer vos categories</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding-vertical>\n  <filtre [showVille]="false"></filtre>\n\n  <div class="uk-height-fab"></div>\n</ion-content>\n\n<ion-footer>\n  <ion-fab right bottom>\n    <button ion-fab color="success"><ion-icon name="checkmark"></ion-icon></button>\n  </ion-fab>\n</ion-footer>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-category/company-category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */]])
    ], CompanyCategoryPage);
    return CompanyCategoryPage;
}());

//# sourceMappingURL=company-category.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyDescriptionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CompanyDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompanyDescriptionPage = (function () {
    function CompanyDescriptionPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.EditActive = false;
    }
    CompanyDescriptionPage.prototype.ionViewDidLoad = function () {
        this.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n' +
            '     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!';
    };
    CompanyDescriptionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CompanyDescriptionPage.prototype.editDescription = function () {
        this.contenu.nativeElement.contentEditable = true;
        this.EditActive = true;
    };
    CompanyDescriptionPage.prototype.removeEdit = function () {
        this.contenu.nativeElement.contentEditable = false;
        this.EditActive = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('editable'),
        __metadata("design:type", Object)
    ], CompanyDescriptionPage.prototype, "contenu", void 0);
    CompanyDescriptionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company-description',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-description/company-description.html"*/'<!--\n  Generated template for the CompanyDescriptionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button color="primary" icon-only small (click)="dismiss()" [hidden]="EditActive">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title class="uk-title-color-red">Nom de l\'entreprise, Nom de l\'entreprise</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only small (click)="removeEdit()" [hidden]="!EditActive">\n        <span ion-text color="primary">Annuler</span>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div [textContent]="description" (input)="description=$event.target.textContent" #editable></div>\n\n  <!-- <ion-item class="commentbox">\n\n    <div\n      contenteditable="true"\n      [textContent]="description"\n      (input)="description=$event.target.textContent"\n    >\n    </div>\n\n    <ion-buttons right item-right>\n      <button ion-button clear (tap)="submitComment()">\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-item> -->\n\n\n</ion-content>\n\n<ion-footer>\n  <ion-fab right bottom>\n    <button ion-fab color="primary" (click)="editDescription()" [hidden]="EditActive" ><ion-icon name="create"></ion-icon></button>\n  </ion-fab>\n  <ion-fab right bottom>\n    <button ion-fab color="success" [hidden]="!EditActive" ><ion-icon name="checkmark"></ion-icon></button>\n  </ion-fab>\n</ion-footer>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-description/company-description.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */]])
    ], CompanyDescriptionPage);
    return CompanyDescriptionPage;
}());

//# sourceMappingURL=company-description.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyImagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_img_viewer__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CompanyImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompanyImagesPage = (function () {
    function CompanyImagesPage(navCtrl, navParams, platform, viewCtrl, imageViewerCtrl, renderer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.images = [];
        this.deletedActive = false;
        this.itemToDelete = [];
        this.images = [
            { id: 1, image: 'assets/imgs/default.jpg' },
            { id: 2, image: 'assets/imgs/default.jpg' },
            { id: 3, image: 'assets/imgs/default.jpg' },
            { id: 4, image: 'assets/imgs/default.jpg' },
            { id: 5, image: 'assets/imgs/default.jpg' },
            { id: 6, image: 'assets/imgs/default.jpg' },
            { id: 7, image: 'assets/imgs/default.jpg' },
            { id: 8, image: 'assets/imgs/default.jpg' },
            { id: 9, image: 'assets/imgs/default.jpg' },
        ];
        this._imageViewerCtrl = imageViewerCtrl;
    }
    CompanyImagesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompanyImagesPage');
    };
    CompanyImagesPage.prototype.uploadPicture = function () {
        this.platform.ready().then(function () {
            VideoPicturePreviewPickerV2.openPicker(function (results) {
                console.log(results);
            }, function (error) {
                console.log(error);
            }, {
                limit_Select: 10,
                Is_multiSelect: true,
                picture_selector: true,
                video_selector: false,
                display_video_time: false,
                display_preview: true
            });
        });
    };
    CompanyImagesPage.prototype.zoomeImage = function (myImage, e, image) {
        if (!this.deletedActive) {
            // Affiche le detail de la page
            var imageViewer = this._imageViewerCtrl.create(myImage);
            imageViewer.present();
        }
        else {
            if (this.itemToDelete.indexOf(image) > -1) {
                var index = this.itemToDelete.indexOf(image);
                this.itemToDelete.splice(index, 1);
                this.renderer.setElementStyle(e.target.parentElement, 'border', 'none');
                if (this.itemToDelete.length === 0) {
                    this.deletedActive = false;
                }
            }
            else {
                this.itemToDelete.push(image);
                this.renderer.setElementStyle(e.target.parentElement, 'border', '4px solid red');
            }
        }
    };
    CompanyImagesPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CompanyImagesPage.prototype.deleteItem = function (e, image) {
        this.deletedActive = true;
        this.renderer.setElementStyle(e.target.parentElement, 'border', '4px solid red');
        this.itemToDelete.push(image);
    };
    CompanyImagesPage.prototype.removeDeteletedItem = function () {
        this.itemToDelete.map(function (x) {
            document.getElementById(x).parentElement.style.border = 'none';
        });
        this.itemToDelete.splice(0, this.itemToDelete.length);
        this.deletedActive = false;
    };
    CompanyImagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company-images',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-images/company-images.html"*/'<!--\n  Generated template for the CompanyImagesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only small (click)="dismiss()" [hidden]="deletedActive">\n        <ion-icon name="close" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title class="uk-title-color-red">Image de Compagny</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only small (click)="removeDeteletedItem()" [hidden]="!deletedActive">\n        <span ion-text color="primary">Annuler</span>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-4 *ngFor="let image of images">\n          <div class="one-image uk-background-cover"   tappable>\n            <img cover src="{{ image.image }}" #myImage (tap)="zoomeImage(myImage, $event, image.id)" (press)="deleteItem($event, image.id)" id="{{ image.id }}">\n          </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n<div class="uk-height-fab"></div>\n</ion-content>\n\n<ion-footer>\n  <ion-fab right bottom>\n    <button ion-fab color="primary" (click)="uploadPicture()" block [hidden]="deletedActive" ><ion-icon name="image"></ion-icon></button>\n  </ion-fab>\n  <ion-fab right bottom>\n    <button ion-fab color="success" [hidden]="!deletedActive"><ion-icon name="trash"></ion-icon></button>\n  </ion-fab>\n</ion-footer>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-images/company-images.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_img_viewer__["a" /* ImageViewerController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer */]])
    ], CompanyImagesPage);
    return CompanyImagesPage;
}());

//# sourceMappingURL=company-images.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CompanyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompanyInfoPage = (function () {
    function CompanyInfoPage(navCtrl, navParams, viewCtrl, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.tags = [];
    }
    CompanyInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompanyInfoPage');
    };
    CompanyInfoPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CompanyInfoPage.prototype.uploadPicture = function () {
        this.platform.ready().then(function () {
            VideoPicturePreviewPickerV2.openPicker(function (results) {
                console.log(results);
            }, function (error) {
                console.log(error);
            }, {
                limit_Select: 1,
                Is_multiSelect: false,
                picture_selector: false,
                video_selector: false,
                display_video_time: false,
                display_preview: true
            });
        });
    };
    CompanyInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company-info',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-info/company-info.html"*/'<!--\n  Generated template for the CompanyInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only small (click)="dismiss()">\n        <ion-icon name="close" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title class="uk-title-color-red">Information</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n<ion-card class="uk-background-default card-info no-border-radius" margin-bottom>\n  <ion-card-content class="uk-flex uk-flex-middle uk-flex-center">\n    <div class="uk-width-1-1">\n      <div class="uk-text-center uk-margin-auto">\n        <img src="assets/imgs/default.jpg" alt="" class="logo uk-border-circle uk-margin-auto uk-display-block" margin-bottom>\n        <button ion-button clear small class="button-custom-size" (click)="uploadPicture()">Modifier le logo</button>\n      </div>\n      <div class="uk-grid-collapse uk-grid">\n        <div class="uk-width-expand">\n          <ion-list no-margin>\n            <ion-item no-padding no-border>\n              <ion-select interface="action-sheet" multiple="false" placeholder="Selectionnez une catégorie principale">\n                <ion-option value="">Selectionnez une catégorie principale</ion-option>\n                <ion-option value="mute_15">For 15 Minutes</ion-option>\n                <ion-option value="mute_1">For 1 Hour</ion-option>\n                <ion-option value="mute_23">For 24 Hours</ion-option>\n                <ion-option value="mute_inf">Until I turn it back on</ion-option>\n              </ion-select>\n            </ion-item>\n          </ion-list>\n        </div>\n        <div class="uk-width-auto">\n            <button ion-button clear>\n              <ion-icon name="add"></ion-icon>\n            </button>\n        </div>\n      </div>\n    </div>\n  </ion-card-content>\n</ion-card>\n\n<div class="uk-background-default uk-padding uk-padding-remove-bottom uk-padding-remove-top">\n  <ion-list no-margin>\n    <ion-item no-padding no-border>\n      <ion-label floating>Nom de l\'entreprise</ion-label>\n      <ion-input type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item no-padding>\n      <ion-label floating>Recherchez votre adresse</ion-label>\n      <ion-input type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item no-padding>\n      <ion-label floating>Ville</ion-label>\n      <ion-input typwilrona\n                 e="text" value=""></ion-input>\n    </ion-item>\n    <ion-item no-padding>\n      <ion-label floating>Quartier</ion-label>\n      <ion-input type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item no-padding>\n      <ion-label floating>Rue</ion-label>\n      <ion-input type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item no-padding>\n      <ion-label floating>Boite Postale</ion-label>\n      <ion-input type="text" value=""></ion-input>\n    </ion-item>\n    <input type="hidden"  value="longitude">\n    <input type="hidden"  value="latitude">\n    <ion-item no-padding>\n      <ion-label floating>Repère de la position de votre entreprise</ion-label>\n      <ion-input type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item no-padding>\n      <ion-label floating>Téléphone</ion-label>\n      <ion-input type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item no-padding>\n      <ion-label floating>Adresse Email</ion-label>\n      <ion-input type="text" value=""></ion-input>\n    </ion-item>\n    <ion-item no-padding>\n      <ion-label floating>Site Web</ion-label>\n      <ion-input type="text" value=""></ion-input>\n    </ion-item>\n\n    <ion-item no-padding no-border>\n    </ion-item>\n  </ion-list>\n  <ion-label>Mot clés</ion-label>\n  <ion-tags-input [(ngModel)]="tags" [placeholder]="\'+ tags\'" [once]="\'true\'" [separatorStr]="\',\'" [type]="text" class="uk-margin-large-bottom"></ion-tags-input>\n\n</div>\n<div class="uk-height-fab"></div>\n\n</ion-content>\n<ion-footer>\n  <ion-fab right bottom>\n    <button ion-fab color="success"><ion-icon name="checkmark"></ion-icon></button>\n  </ion-fab>\n</ion-footer>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-info/company-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */]])
    ], CompanyInfoPage);
    return CompanyInfoPage;
}());

//# sourceMappingURL=company-info.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapsPage = (function () {
    function MapsPage(navCtrl, navParams, menu, listingService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.listingService = listingService;
        this.toastCtrl = toastCtrl;
        this.listMarker = new Array();
        menu.enable(true);
    }
    MapsPage.prototype.ionViewDidLoad = function () {
        console.log(this.mapElement.nativeElement);
    };
    MapsPage.prototype.openMenu = function (evt) {
        if (evt === "right") {
            this.menu.enable(true, 'menu');
            this.menu.enable(false, 'filtre');
        }
        else {
            this.menu.enable(true, 'filtre');
            this.menu.enable(false, 'menu');
        }
        this.menu.toggle();
    };
    MapsPage.prototype.ngAfterViewInit = function () {
        this.loadMaps();
    };
    MapsPage.prototype.loadMap = function () {
        var latLng = new google.maps.LatLng(-34.9290, 138.6010);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var MapEl = this.mapElement.nativeElement;
        this.map = new google.maps.Map(MapEl, mapOptions);
    };
    MapsPage.prototype.loadMaps = function () {
        this.initializeMap();
        this.getMarkers();
    };
    MapsPage.prototype.initializeMap = function () {
        var mapEle = this.mapElement.nativeElement;
        this.map = new google.maps.Map(mapEle, {
            zoom: 7,
            center: new google.maps.LatLng(6.6820251, 10.1803522),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
            disableDoubleClickZoom: false,
            disableDefaultUI: true,
            zoomControl: true,
            scaleControl: true,
        });
    };
    MapsPage.prototype.getMarkers = function () {
        var _this = this;
        this.listingService.getMarkers().subscribe(function (data) {
            _this.addMarkersToMap(data);
            _this.setMapOnAll(_this.map);
        });
    };
    MapsPage.prototype.addMarkersToMap = function (markers) {
        for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
            var marker = markers_1[_i];
            var position = new google.maps.LatLng(marker.latitude, marker.longitude);
            var dMarker = new google.maps.Marker({ position: position, title: marker.name, id: marker._id }); //icon: { url : 'http://yoomeeonl.webfactional.com/media/pictures/categories/bar.jpg' },
            this.listMarker.push(dMarker);
        }
    };
    MapsPage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.listMarker.length; i++) {
            this.listMarker[i].setMap(map);
            //Attach click event handler to the marker.
            var content = 'Latitude: <br />Longitude: ' + this.listMarker[i].title;
            var item = { "id": this.listMarker[i].id.$id, "title": this.listMarker[i].title, "ville": this.listMarker[i].ville, "repere": this.listMarker[i].repere };
            this.addInfoWindow(this.listMarker[i], content, this.listMarker[i].id.$id, item);
        }
        new MarkerClusterer(this.map, this.listMarker, {
            cssClass: 'custom-pin',
            imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m'
        });
    };
    MapsPage.prototype.addInfoWindow = function (marker, content, id, item) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            _this.presentToast(content, id);
        });
    };
    MapsPage.prototype.presentToast = function (content, id) {
        var toast = this.toastCtrl.create({
            message: content,
            /*duration: 3000,*/
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "Voir Plus"
        });
        toast.onDidDismiss(function () {
            // this.openDetails(id);
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('map'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
    ], MapsPage.prototype, "mapElement", void 0);
    MapsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-maps',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/maps/maps.html"*/'<!--\n  Generated template for the MapsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar padding-horizontal>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n        <ion-icon name="menu" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openMenu(\'left\')">\n        <ion-icon name="funnel" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div #map id="map"></div>\n</ion-content>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/maps/maps.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */]) === "function" && _f || Object])
    ], MapsPage);
    return MapsPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=maps.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/annuaire/annuaire.module": [
		703,
		6
	],
	"../pages/company-category/company-category.module": [
		704,
		5
	],
	"../pages/company-description/company-description.module": [
		705,
		4
	],
	"../pages/company-images/company-images.module": [
		706,
		3
	],
	"../pages/company-info/company-info.module": [
		707,
		2
	],
	"../pages/company/company.module": [
		709,
		0
	],
	"../pages/maps/maps.module": [
		708,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 215;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_contact__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__annuaire_annuaire__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__maps_maps__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = (function () {
    function TabsPage(navCtrl, menu) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_4__annuaire_annuaire__["a" /* AnnuairePage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_5__maps_maps__["a" /* MapsPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_1__contact_contact__["a" /* ContactPage */];
    }
    TabsPage.prototype.menuToggle = function () {
        this.menu.enable(true, 'menu');
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/tabs/tabs.html"*/'\n<ion-tabs tabsHighlight="true" selectedIndex="0" tabsPlacement="bottom"  (ionChange)="menuToggle()">\n  <ion-tab [root]="tab1Root" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabIcon="list"></ion-tab>\n  <ion-tab [root]="tab3Root" tabIcon="locate"></ion-tab>\n  <ion-tab [root]="tab4Root" tabIcon="person"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* MenuController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/contact/contact.html"*/'<ion-header no-border="">\n  <ion-toolbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      <img alt="logo" height="40"  src="/assets/imgs/logoici.png" ><!--icicm1-->\n    </ion-title>\n\n    <ion-buttons end >\n      <button ion-button icon-only>\n        <ion-icon name="pin" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_company__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, menu) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        menu.enable(true);
    }
    HomePage.prototype.openMenu = function (evt) {
        if (evt === "right") {
            this.menu.enable(true, 'menu');
            this.menu.enable(false, 'filtre');
        }
        else {
            this.menu.enable(true, 'filtre');
            this.menu.enable(false, 'menu');
        }
        this.menu.toggle();
    };
    HomePage.prototype.OpenDetail = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__company_company__["a" /* CompanyPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/home/home.html"*/'<ion-header>\n  <ion-toolbar padding-horizontal>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n        <ion-icon name="menu" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only>\n        <ion-icon name="pin" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n\n  <div class="uk-height-medium uk-background-cover uk-position-relative uk-flex uk-flex-center uk-flex-middle" style="background-image: url(\'assets/imgs/back.jpg\');">\n    <div class="uk-position-cover cover"></div>\n    <div class="uk-content-cover">\n      <div class="uk-h2 uk-margin-large-bottom">Bienvenue sur ICI.CM</div>\n      <ion-auto-complete [options]="{ placeholder : \'Rechercher un lieu\' }" [(ngModel)]="keyword"></ion-auto-complete>\n    </div>\n  </div>\n\n  <div class="uk-card uk-card-default">\n    <div class="uk-card-header uk-text-left uk-padding-small uk-position-relative">\n      <h6 class="uk-margin-remove">Nouveaux lieux</h6>\n\n    </div>\n    <div class="uk-card-body uk-padding-remove">\n      <ion-slides slidesPerView=1.5 autoplay="5000" loop="false" speed="1000" >\n        <ion-slide>\n          <ion-card>\n            <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg"/>\n            <ion-card-content class="uk-position-relative">\n              <ion-badge item-end class="uk-margin-small">Catégorie Catégorie Catégorie</ion-badge>\n              <h2 class="uk-text-truncate uk-margin-remove" (click)="OpenDetail()">Nom de l\'entreprise</h2>\n              <small>Ville</small>\n              <div class="uk-position-bottom-right uk-padding-small">\n                <rating  [(ngModel)]="rate"\n                         readOnly="true"\n                         max="5"\n                         emptyStarIconName="star-outline"\n                         halfStarIconName="star-half"\n                         starIconName="star"\n                         nullable="false" ></rating>\n\n              </div>\n            </ion-card-content>\n          </ion-card>\n        </ion-slide>\n        <ion-slide>\n          <ion-card>\n            <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg"/>\n            <ion-card-content class="uk-position-relative">\n              <ion-badge item-end class="uk-margin-small">Catégorie Catégorie Catégorie</ion-badge>\n              <h2 class="uk-text-truncate uk-margin-remove">Nom de l\'entreprise</h2>\n              <small>Ville</small>\n              <div class="uk-position-bottom-right uk-padding-small">\n                <rating  [(ngModel)]="rate"\n                         readOnly="true"\n                         max="5"\n                         emptyStarIconName="star-outline"\n                         halfStarIconName="star-half"\n                         starIconName="star"\n                         nullable="false" ></rating>\n\n              </div>\n            </ion-card-content>\n          </ion-card>\n        </ion-slide>\n      </ion-slides>\n    </div>\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_description_company_description__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__company_images_company_images__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__company_info_company_info__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__company_category_company_category__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompanyPage = (function () {
    function CompanyPage(navCtrl, navParams, ref, renderer, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ref = ref;
        this.renderer = renderer;
        this.modalCtrl = modalCtrl;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.dark = true;
    }
    CompanyPage.prototype.ionViewWillEnter = function () {
        this.segmentation = 'desc';
    };
    CompanyPage.prototype.ngAfterViewInit = function () {
        // this.loadMap();
    };
    CompanyPage.prototype.ionViewDidLoad = function () {
        this.headerImgUrl = 'assets/imgs/back.jpg';
        // this.content.enableScrollListener();
    };
    CompanyPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 15;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    CompanyPage.prototype.openDescriptionEdit = function () {
        var descriptionModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__company_description_company_description__["a" /* CompanyDescriptionPage */]);
        descriptionModal.present();
    };
    CompanyPage.prototype.openImageEdit = function () {
        var imageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__company_images_company_images__["a" /* CompanyImagesPage */]);
        imageModal.present();
    };
    CompanyPage.prototype.openInfoEdit = function () {
        var infoModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__company_info_company_info__["a" /* CompanyInfoPage */]);
        infoModal.present();
    };
    CompanyPage.prototype.openCategoryEdit = function () {
        var categoryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__company_category_company_category__["a" /* CompanyCategoryPage */]);
        categoryModal.present();
    };
    CompanyPage.prototype.loadMap = function () {
        var latLng = new google.maps.LatLng(-34.9290, 138.6010);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var MapEl = this.mapElement.nativeElement;
        this.map = new google.maps.Map(MapEl, mapOptions);
    };
    CompanyPage.prototype.activeMap = function () {
        this.dark = false;
    };
    CompanyPage.prototype.activeLocation = function () {
        this.dark = true;
    };
    CompanyPage.prototype.activeAvis = function () {
        this.dark = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], CompanyPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], CompanyPage.prototype, "mapElement", void 0);
    CompanyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company/company.html"*/'<!--\n  Generated template for the CompanyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header shadow>\n\n  <ion-navbar [class.show-background]="showToolbar">\n    <ion-title [hidden]="!showToolbar" class="uk-text-truncate">Nom de l\'entreprise Nom de l\'entreprise</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only small (click)="openInfoEdit()">\n        <ion-icon name="create"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content  class="content"\n              (ionScroll)="onScroll($event)"\n              [class.transition]="transition"\n              [style.background-size]="headerImgSize"\n              [style.backgroundImage]="\'url(\'+ headerImgUrl+ \')\'">\n\n  <div class="user-info uk-height-small uk-flex uk-flex-middle uk-flex-center">\n    <h2 class="uk-size" padding-horizontal>Nom de l\'entreprise, Nom de l\'entreprise, Nom de l\'entreprise, </h2>\n  </div>\n\n  <div class="contents">\n\n    <button ion-button block class="uk-block-button">Consultez notre vidéo</button>\n\n    <ion-card no-margin class="card-info">\n      <ion-card-content no-padding>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-9>\n              <ion-item class="item-compagny uk-padding-remove">\n                <ion-thumbnail item-start>\n                  <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg" class="uk-responsive-height uk-border-circle">\n                </ion-thumbnail>\n                <div>\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted" style="margin-bottom: 4px !important;">ville et quartier</div>\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-success uk-text-small"> <ion-icon name="checkmark-circle"></ion-icon> Entreprise validé</div>\n                  <!-- <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-danger uk-text-small"> <ion-icon name="close"></ion-icon> Validation en cours</div> -->\n                  <ion-badge item-end class="uk-margin-remove-top uk-margin-remove-left uk-margin-remove-right">Catégorie</ion-badge>\n                </div>\n\n              </ion-item>\n            </ion-col>\n            <ion-col col-3 class="uk-position-relative">\n              <div class="">\n                <rating  [(ngModel)]="rate"\n                         readOnly="true"\n                         max="5"\n                         emptyStarIconName="star-outline"\n                         halfStarIconName="star-half"\n                         starIconName="star"\n                         nullable="false" ></rating>\n                <div class="uk-text-right uk-h4 uk-margin-remove">3 avis</div>\n                <div class="uk-text-right uk-text-danger uk-text-bold uk-h4 uk-margin-remove">Fermé</div>\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card no-margin margin-top class="card-info">\n      <ion-card-header no-padding>\n        <ion-segment [(ngModel)]="segmentation">\n          <ion-segment-button value="desc" (ionSelect)="activeLocation()">\n            Description\n          </ion-segment-button>\n          <ion-segment-button value="locale" (ionSelect)="activeMap()">\n            Localisation\n          </ion-segment-button>\n          <ion-segment-button value="avis" (ionSelect)="activeAvis()">\n            Avis\n          </ion-segment-button>\n        </ion-segment>\n      </ion-card-header>\n      <ion-card-content [ngSwitch]="segmentation" no-padding>\n        <div *ngSwitchCase="\'desc\'" class="uk-height-1-1 uk-position-relative uk-padding-small">\n\n          <div class="uk-position-relative">\n            <ion-label ion-text class="uk-text-bold uk-display-block">Image</ion-label>\n            <div class="uk-position-center-right">\n              <button ion-button clear small class="button-custom-size" (click)="openImageEdit()">Gérer</button>\n            </div>\n          </div>\n\n\n\n          <ion-slides loop="true" slidesPerView="4" margin-top spaceBetween="3">\n\n            <ion-slide>\n              <img src="assets/imgs/default.jpg" alt="" imageViewer>\n            </ion-slide>\n\n            <ion-slide>\n              <img src="assets/imgs/default.jpg" alt="" imageViewer>\n            </ion-slide>\n\n            <ion-slide>\n              <img src="assets/imgs/default.jpg" alt="" imageViewer>\n            </ion-slide>\n\n            <ion-slide>\n              <img src="assets/imgs/default.jpg" alt="" imageViewer>\n            </ion-slide>\n            <ion-slide>\n              <img src="assets/imgs/default.jpg" alt="" imageViewer>\n            </ion-slide>\n            <ion-slide>\n              <img src="assets/imgs/default.jpg" alt="" imageViewer>\n            </ion-slide>\n            <ion-slide>\n              <img src="assets/imgs/default.jpg" alt="" imageViewer>\n            </ion-slide>\n\n\n          </ion-slides>\n          <hr>\n          <div class="uk-text-break uk-position-relative">\n            <div class="uk-height-max-small" style="overflow: hidden">\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n            </div>\n            <div class="show-more-end"></div>\n\n            <div class="uk-text-center">\n              <button ion-button clear small (click)="openDescriptionEdit()">Lire la suite</button>\n            </div>\n          </div>\n          <hr>\n          <ion-grid no-padding>\n            <ion-row>\n              <ion-col col-5>\n                <ion-label class="uk-text-bold">\n                  Autres catégories :\n                </ion-label>\n              </ion-col>\n              <ion-col col-7>\n                <div ion-text class="uk-text-break">\n                    categorie, catégorie, catégorie, catégorie, catégorie, catégorie, catégorie, catégorie\n                    <div>\n                      <button ion-button clear small class="button-custom-size" (click)="openCategoryEdit()">Gérer vos categories</button>\n                    </div>\n                </div>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <hr>\n          <ion-grid no-padding>\n            <ion-row>\n              <ion-col col-12 class="uk-position-relative">\n                <ion-label class="uk-text-bold">\n                  Horaire :\n                </ion-label>\n                <span class="uk-text-success">Ouvert</span> aujourd\'hui de 08h à 15h\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </div>\n        <div *ngSwitchCase="\'locale\'" class="uk-height-1-1">\n          <maps></maps>\n        </div>\n        <div *ngSwitchCase="\'avis\'" class="uk-height-1-1">\n          <div class="uk-padding-small rating-block uk-text-center">\n\n            <div ion-text class="uk-h1 uk-text-center uk-margin-remove-bottom" color="dark">Noté ce professionnel</div>\n            <div ion-text class="uk-h3 uk-text-center uk-margin-small-top">Cliquez sur les etoiles pour noter ce professionnel</div>\n            <rating  [(ngModel)]="valiRate"\n                     readOnly="false"\n                     max="5"\n                     emptyStarIconName="star-outline"\n                     halfStarIconName="star-half"\n                     starIconName="star"\n                     nullable="false" ></rating>\n\n            <button ion-button clear class="uk-text-center">Ecrire un avis</button>\n\n          </div>\n\n          <hr>\n\n          <ion-list>\n            <ion-item>\n              <ion-avatar item-start>\n                <img src="assets/imgs/default.jpg">\n              </ion-avatar>\n              <div class="uk-position-relative uk-comments">\n                <h2>Wilrona</h2>\n                <rating  [(ngModel)]="rate"\n                                          readOnly="true"\n                                          max="5"\n                                          emptyStarIconName="star-outline"\n                                          halfStarIconName="star-half"\n                                          starIconName="star"\n                                          nullable="false" ></rating>\n                <ion-note class="uk-position-center-right">3:43 pm</ion-note>\n              </div>\n              <p>This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us!, This town ain\'t big enough for the two of us!\n                This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us!, This town ain\'t big enough for the two of us!\n                This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us!, This town ain\'t big enough for the two of us!\n              </p>\n              <hr>\n            </ion-item>\n\n            <ion-item>\n              <ion-avatar item-start>\n                <img src="assets/imgs/default.jpg">\n              </ion-avatar>\n              <div class="uk-position-relative uk-comments">\n                <h2>Wilrona</h2>\n                <rating  [(ngModel)]="rate"\n                         readOnly="true"\n                         max="5"\n                         emptyStarIconName="star-outline"\n                         halfStarIconName="star-half"\n                         starIconName="star"\n                         nullable="false" ></rating>\n                <ion-note class="uk-position-center-right">3:43 pm</ion-note>\n              </div>\n              <p>This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us!, This town ain\'t big enough for the two of us!\n                This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us!, This town ain\'t big enough for the two of us!\n                This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us! This town ain\'t big enough for the two of us!, This town ain\'t big enough for the two of us!\n              </p>\n              <hr>\n            </ion-item>\n\n          </ion-list>\n\n\n        </div>\n      </ion-card-content>\n    </ion-card>\n\n  </div>\n</ion-content>\n\n<ion-footer [class.bgFooter]="dark">\n  <ion-grid>\n    <ion-row [hidden]="!dark">\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center" style="height: 56px">\n        <button ion-button clear color="white"><ion-icon name="call"></ion-icon></button>\n      </ion-col>\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center" style="height: 56px">\n        <button ion-button clear color="white"><ion-icon name="mail"></ion-icon></button>\n      </ion-col>\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center" style="height: 56px">\n        <button ion-button clear color="white"><ion-icon name="globe"></ion-icon></button>\n      </ion-col>\n    </ion-row>\n    <ion-row [hidden]="dark">\n      <ion-col col-12 padding-horizontal class="uk-text-center uk-flex uk-flex-middle uk-flex-center" style="height: 56px">\n        <span ion-text color="primary">Adresse de l\'entreprise ici</span>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company/company.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */]])
    ], CompanyPage);
    return CompanyPage;
}());

//# sourceMappingURL=company.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(370);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic2_auto_complete__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic2_rating__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_annuaire_annuaire__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_filtre_filtre__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_img_viewer__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_company_description_company_description__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_company_images_company_images__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_company_info_company_info__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_company_category_company_category__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ionic_tags_input__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_maps_maps__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_http__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_email_composer__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_call_number__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_companies_companies__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_annuaire_annuaire__["a" /* AnnuairePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_company_description_company_description__["a" /* CompanyDescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_company_images_company_images__["a" /* CompanyImagesPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_company_info_company_info__["a" /* CompanyInfoPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_company_category_company_category__["a" /* CompanyCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                // components
                __WEBPACK_IMPORTED_MODULE_12__components_filtre_filtre__["a" /* FiltreComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], { tabsHideOnSubPages: 'true' }, {
                    links: [
                        { loadChildren: '../pages/annuaire/annuaire.module#AnnuairePageModule', name: 'AnnuairePage', segment: 'annuaire', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company-category/company-category.module#CompanyCategoryPageModule', name: 'CompanyCategoryPage', segment: 'company-category', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company-description/company-description.module#CompanyDescriptionPageModule', name: 'CompanyDescriptionPage', segment: 'company-description', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company-images/company-images.module#CompanyImagesPageModule', name: 'CompanyImagesPage', segment: 'company-images', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company-info/company-info.module#CompanyInfoPageModule', name: 'CompanyInfoPage', segment: 'company-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/maps/maps.module#MapsPageModule', name: 'MapsPage', segment: 'maps', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company/company.module#CompanyPageModule', name: 'CompanyPage', segment: 'company', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9_ionic2_auto_complete__["a" /* AutoCompleteModule */],
                __WEBPACK_IMPORTED_MODULE_10_ionic2_rating__["a" /* Ionic2RatingModule */],
                __WEBPACK_IMPORTED_MODULE_13_ionic_img_viewer__["b" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_18_ionic_tags_input__["a" /* IonTagsInputModule */],
                __WEBPACK_IMPORTED_MODULE_20__angular_http__["b" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_annuaire_annuaire__["a" /* AnnuairePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_company_description_company_description__["a" /* CompanyDescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_company_images_company_images__["a" /* CompanyImagesPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_company_info_company_info__["a" /* CompanyInfoPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_company_category_company_category__["a" /* CompanyCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_23__providers_companies_companies__["a" /* CompaniesProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_companies_companies__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, menu, events, listingService) {
        var _this = this;
        this.menu = menu;
        this.events = events;
        this.listingService = listingService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.events.subscribe('citiesfilter', function (cities) {
            _this.citiesfilter = cities;
        });
        this.events.subscribe('categoriesfilter', function (categories) {
            _this.categoriesfilter = categories;
        });
    }
    MyApp.prototype.closedFiltre = function () {
        this.menu.enable(true, 'menu');
    };
    MyApp.prototype.filtre = function () {
        var _this = this;
        this.listingService.getListing(this.categoriesfilter, this.citiesfilter).subscribe(function (data) {
            _this.listing = data,
                _this.events.publish('listing', data);
        });
        this.menu.toggle();
        this.closedFiltre();
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/app/app.html"*/'\n<ion-menu [content]="content" side="left" id="menu">\n  <ion-header>\n    <div class="uk-position-relative uk-height-small">\n      <div class="uk-position-center uk-padding-small">\n        <img src="assets/imgs/logoici.png" alt="" width="40" margin>\n      </div>\n      <ion-title class="uk-position-bottom-center uk-padding-small">Connectez-vous</ion-title>\n    </div>\n  </ion-header>\n\n  <ion-content id="menuLeft">\n    <ion-list no-margin>\n      <button ion-item>\n        Accueil\n      </button>\n      <button ion-item >\n        Annuaire\n      </button>\n      <button ion-item >\n        Maps\n      </button>\n    </ion-list>\n    <ion-item-group>\n      <ion-item-divider color="light">Mon Compte</ion-item-divider>\n      <button ion-item >\n        Connexion\n      </button>\n      <button ion-item >\n        Ajouter une entreprise\n      </button>\n    </ion-item-group>\n  </ion-content>\n\n</ion-menu>\n\n<ion-menu [content]="content" side="right" id="filtre" swipeEnabled="false" (ionClose)="closedFiltre()">\n  <ion-header>\n    <div class="uk-position-relative uk-height-small">\n      <ion-title class="uk-position-center"><ion-icon name="funnel" icon-left></ion-icon> Filtre</ion-title>\n    </div>\n  </ion-header>\n\n  <ion-content>\n    <filtre></filtre>\n  </ion-content>\n\n  <ion-footer>\n    <div padding>\n      <button ion-button color="success" small (click)="filtre()"> Valider </button>\n      <button ion-button color="light" small> Effacer </button>\n    </div>\n  </ion-footer>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_companies_companies__["a" /* CompaniesProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompaniesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the CompaniesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CompaniesProvider = (function () {
    function CompaniesProvider(http) {
        this.http = http;
        this.labelAttribute = "name";
        this.perpage = 20;
        this.data = null;
        this.count = 0;
        this.category = null;
    }
    CompaniesProvider.prototype.getListing = function (category, city, start) {
        if (category === void 0) { category = []; }
        if (city === void 0) { city = []; }
        if (start === void 0) { start = 0; }
        // return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchmobile?limit='+this.perpage+'&start='+start)
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchmobile?category=' + category + '&city=' + city + '&limit=' + this.perpage + '&start=' + start)
            .map(function (result) {
            console.log(result.json());
            return result.json();
            //  .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
        /* if (this.data) {
           return Promise.resolve(this.data);
         }
      
         return new Promise(resolve => {
      
           //this.http.get('http://localhost:8080/compagnie?filter[limit]='+this.perpage+'&filter[skip]='+start)
           this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchmobile?filter[limit]='+this.perpage+'&filter[skip]='+start)
           //this.http.get('http://yoomeeonl.webfactional.com/data.json?filter[limit]='+this.perpage+'&filter[skip]='+start)
           
             .map(res => res.json())
             .subscribe(data => {
               this.data = data;
               resolve(this.data);
             });
         });*/
    };
    /*getCities(){
   
  
      if (this.city) {
        return Promise.resolve(this.city);
      }
   
      return new Promise(resolve => {
   
        this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchCity')
          .map(res => res.json())
          .subscribe(city => {
            this.city = city;
            resolve(this.city);
          });
      });
   
    }*/
    CompaniesProvider.prototype.getRecentPlaces = function () {
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/getRecentPlaces')
            .map(function (res) { return res.json(); });
    };
    CompaniesProvider.prototype.getCities = function () {
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchCity')
            .map(function (res) { return res.json(); });
    };
    CompaniesProvider.prototype.getMarkers = function (keyword, city) {
        if (keyword === void 0) { keyword = ''; }
        if (city === void 0) { city = []; }
        return this.http.get('http://yoomeeonl.webfactional.com/mobileApp/allCompaniesForMap?keyword=' + keyword + '&city=' + city)
            .map(function (res) { return res.json(); });
    };
    CompaniesProvider.prototype.getCompanyById = function (id) {
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/getCompanyById?id=' + id)
            .map(function (res) { return res.json(); });
    };
    CompaniesProvider.prototype.getCategories = function () {
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/getAllCategories')
            .map(function (res) { return res.json(); });
    };
    CompaniesProvider.prototype.getSubcats = function () {
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/getCategoriesClass')
            .map(function (res) { return res.json(); });
    };
    CompaniesProvider.prototype.getAllCategories = function () {
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/getAllCategories')
            .map(function (res) { return res.json(); });
    };
    /* getAllimageUne(){
    
          return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/getAllUneCompanyPicture')
            .map(res => res.json());
     }*/
    /*getAverageRate(){
   
         return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/getAverageRate')
           .map(res => res.json());
    }
   
    getAverageReview(){
   
         return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/getAverageReview')
           .map(res => res.json());
    }*/
    CompaniesProvider.prototype.getListingCount = function () {
        var _this = this;
        if (this.count) {
            return Promise.resolve(this.count);
        }
        return new Promise(function (resolve) {
            _this.http.get('http://localhost:8080/compagnie/count')
                .map(function (res) { return res.json(); })
                .subscribe(function (count) {
                _this.count = count;
                resolve(_this.count);
            });
        });
    };
    CompaniesProvider.prototype.getResults = function (keyword) {
        return this.http.get("http://yoomeeonl.webfactional.com/MobileApp/searchmobile?query=" + keyword + "&limit=10")
            .map(function (result) {
            console.log(result.json());
            return result.json();
            //  .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
    };
    CompaniesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], CompaniesProvider);
    return CompaniesProvider;
}());

//# sourceMappingURL=companies.js.map

/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the FilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var FiltreComponent = (function () {
    function FiltreComponent(listingService, events) {
        this.listingService = listingService;
        this.events = events;
        this.shownGroup = null;
        this.ville = true;
        this.itenSelect = [];
        this.loadCategory();
        this.getCities();
    }
    FiltreComponent.prototype.toggleGroup = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    FiltreComponent.prototype.isGroupShown = function (group) {
        return this.shownGroup === group;
    };
    ;
    FiltreComponent.prototype.itemAdd = function (i, event) {
        var index = this.itenSelect.indexOf(i);
        if (index > -1) {
            this.itenSelect.splice(index, 1);
        }
        else {
            this.itenSelect.push(i);
        }
        this.events.publish('categoriesfilter', this.itenSelect);
        event.target.parentElement.parentElement.parentElement.classList.toggle('hover');
    };
    FiltreComponent.prototype.getCities = function () {
        var _this = this;
        this.listingService.getCities().subscribe(function (data) { return _this.cities = data; });
    };
    FiltreComponent.prototype.loadCategory = function () {
        var _this = this;
        this.listingService.getSubcats().subscribe(function (data) { return _this.cat = data; });
    };
    FiltreComponent.prototype.onTypeSelected = function (value) {
        //console.log(value);
        this.events.publish('citiesfilter', value);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('showVille'),
        __metadata("design:type", Boolean)
    ], FiltreComponent.prototype, "ville", void 0);
    FiltreComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'filtre',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/components/filtre/filtre.html"*/'<!-- Generated template for the FilterComponent component -->\n\n\n      <div class="uk-padding-small" [hidden]="!ville">\n        <ion-item no-margin no-padding>\n          <ion-label stacked>Par ville</ion-label>\n          <ion-select [(ngModel)]="city" interface="action-sheet" multiple="true" (ionChange)="onTypeSelected($event)">\n            <ion-option  *ngFor="let item of cities">{{item.name}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </div>\n      <ion-label padding-left [hidden]="!ville">Par catégorie</ion-label>\n\n      <ion-list *ngFor="let item of cat">\n        <ion-list-header color="primary" (click)="toggleGroup(item.id)">\n          {{item.name}}\n          <ion-icon name="add" color="light" class="uk-position-center-right" padding-right *ngIf="!isGroupShown(item.id)"></ion-icon>\n          <ion-icon name="close" color="light" class="uk-position-center-right" padding-right *ngIf="isGroupShown(item.id)"></ion-icon>\n\n        </ion-list-header>\n        <ion-list no-padding no-margin [hidden]="!isGroupShown(item.id)" *ngFor="let it of item.subcat">\n          <ion-item (click)="itemAdd(it._id.$id, $event)" >{{it.name}}</ion-item>\n          \n        </ion-list>\n      </ion-list>\n\n     \n\n\n\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/components/filtre/filtre.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__["a" /* CompaniesProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Events */]])
    ], FiltreComponent);
    return FiltreComponent;
}());

//# sourceMappingURL=filtre.js.map

/***/ })

},[365]);
//# sourceMappingURL=main.js.map