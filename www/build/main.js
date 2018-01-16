webpackJsonp([10],{

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnuairePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__ = __webpack_require__(75);
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
var AnnuairePage = /** @class */ (function () {
    function AnnuairePage(navCtrl, loadingCtrl, emailComposer, navParams, menu, listingService, callNumber, modalCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailComposer = emailComposer;
        this.navParams = navParams;
        this.menu = menu;
        this.listingService = listingService;
        this.callNumber = callNumber;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.listlength = 20;
        this.start = 0;
        this.keyword = "";
        this.perpage = 20;
        this.totalPage = 0;
        this.userconnect = false;
        //Loading;
        this.showNoItem = false;
        menu.enable(true);
        var currentUser = JSON.parse(localStorage.getItem('userId'));
        this.user = currentUser;
        if (localStorage.getItem("userId")) {
            this.userconnect = true;
        }
        this.loadData();
        events.subscribe('listing', function (listing) {
            if (listing.length !== 0) {
                _this.listing = listing;
                _this.showNoItem = false;
            }
            else {
                _this.showNoItem = true;
            }
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
    AnnuairePage.prototype.loadData = function () {
        var _this = this;
        this.listingService.getListing().subscribe(function (data) {
            if (data.length !== 0) {
                _this.listing = data;
                _this.showNoItem = false;
            }
            else {
                _this.showNoItem = true;
            }
            _this.loading = false;
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
            selector: 'page-annuaire',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\annuaire\annuaire.html"*/'<!--\n\n  Generated template for the AnnuairePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-toolbar padding-horizontal>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n\n        <ion-icon name="menu" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n\n    </ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="openMenu(\'left\')">\n\n        <ion-icon name="funnel" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="uk-height-small uk-flex uk-flex-middle uk-flex-center uk-margin-large-top" *ngIf="loading">\n\n    <div class="uk-text-center">\n\n      <span class="uk-display-block uk-margin-medium-bottom">Chargement ....</span>\n\n      <div uk-spinner></div>\n\n    </div>\n\n  </div>\n\n  <div *ngIf="!showNoItem">\n\n      <ion-list>\n\n          <ion-card *ngFor="let liste of listing ">\n\n            <ion-card-content>\n\n              <ion-grid>\n\n                <ion-row>\n\n                  <ion-col col-9>\n\n                    <h2 class="uk-text-truncate uk-margin-remove" (click)="openDetail(liste._id.$id)">{{liste.name}}</h2>\n\n                    <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted" style="margin-bottom: 4px !important;">{{liste.ville}} {{liste.quartier}}</div>\n\n                    <!--  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-success uk-text-small"> <ion-icon name="checkmark-circle"></ion-icon> Entreprise validé</div>\n\n                    <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-danger uk-text-small"> <ion-icon name="close"></ion-icon> Validation en cours</div> -->\n\n                  </ion-col>\n\n                  <ion-col col-3>\n\n                    <rating  [(ngModel)]="liste.ratecount"\n\n                             readOnly="true"\n\n                             max="5"\n\n                             emptyStarIconName="star-outline"\n\n                             halfStarIconName="star-half"\n\n                             starIconName="star"\n\n                             nullable="false"\n\n                             (ngModelChange)="onModelChange($event, liste._id.$id)"></rating>\n\n                    <div class="uk-text-right uk-h4 uk-margin-remove" >{{liste.reviewcount}} avis</div>\n\n                    <!-- <div class="uk-text-right uk-text-success uk-h4 uk-margin-remove uk-text-bold">8h à 18h30</div> -->\n\n                  </ion-col>\n\n                  <ion-col col class="uk-padding-remove-vertical">\n\n                    <hr no-margin="">\n\n                  </ion-col>\n\n                </ion-row>\n\n                <ion-row>\n\n                  <ion-col col-9>\n\n                    <ion-item class="item-compagny">\n\n                      <ion-thumbnail item-start>\n\n                        <img  *ngIf="liste.imageune==null"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg" class="uk-responsive-height">\n\n                        <img  *ngIf="liste.imageune!=null"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/{{liste.imageune}}" class="uk-responsive-height">\n\n                      </ion-thumbnail>\n\n                      <div>\n\n                        <ion-badge item-end class="uk-margin-remove-top uk-margin-remove-left uk-margin-remove-right">{{liste.maincategorie}}</ion-badge>\n\n                      </div>\n\n\n\n                      <div class="uk-h4 uk-margin-remove">\n\n                        <ul class="uk-text-small uk-padding-small uk-padding-remove-vertical uk-padding-remove-right" no-margin>\n\n                          <li *ngIf="liste.adresse!=\'\'">{{liste.adresse}}</li>\n\n                          <li *ngIf="liste.repere!=\'\'">{{liste.repere}}</li>\n\n                          <!--li>Localisation</li-->\n\n                        </ul>\n\n                      </div>\n\n\n\n                    </ion-item>\n\n                  </ion-col>\n\n                  <ion-col col-3 class="uk-position-relative">\n\n                    <div class="uk-position-bottom-right">\n\n                      <ion-icon name="call" class="icon-m" (click)="callCompany(liste.phone)"></ion-icon>\n\n                      <ion-icon name="mail" class="icon-m" (click)="emailCompany(liste.email)"></ion-icon>\n\n                    </div>\n\n                  </ion-col>\n\n                </ion-row>\n\n              </ion-grid>\n\n            </ion-card-content>\n\n          </ion-card>\n\n          <ion-infinite-scroll (ionInfinite)="doInfinite($event)" > <!--*ngIf="page < totalPage"-->\n\n            <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data..."></ion-infinite-scroll-content>\n\n          </ion-infinite-scroll>\n\n      </ion-list>\n\n  </div>\n\n  <div *ngIf="showNoItem">\n\n      <div class="uk-height-small uk-flex uk-flex-middle uk-flex-center uk-NoItem uk-margin-large-top">\n\n        <div class="uk-text-center uk-padding-large">\n\n          <ion-icon name="funnel" class="uk-margin-auto"></ion-icon>\n\n          <div ion-text color="dark" class="uk-margin-medium-top uk-h2">\n\n            Changer les paramètres de votre filtre pour obtenir plus d\'entreprise\n\n          </div>\n\n        </div>\n\n      </div>\n\n  </div>\n\n\n\n\n\n\n\n</ion-content>\n\n\n\n\n\n\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\annuaire\annuaire.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], AnnuairePage);
    return AnnuairePage;
}());

//# sourceMappingURL=annuaire.js.map

/***/ }),

/***/ 157:
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
var CompanyCategoryPage = /** @class */ (function () {
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
            selector: 'page-company-category',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\company-category\company-category.html"*/'<!--\n\n  Generated template for the CompanyCategoryPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button icon-only small (click)="dismiss()">\n\n        <ion-icon name="close" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>Gérer vos categories</ion-title>\n\n\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding-vertical>\n\n  <filtre [showVille]="false"></filtre>\n\n\n\n  <div class="uk-height-fab"></div>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-fab right bottom>\n\n    <button ion-fab color="success"><ion-icon name="checkmark"></ion-icon></button>\n\n  </ion-fab>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\company-category\company-category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */]])
    ], CompanyCategoryPage);
    return CompanyCategoryPage;
}());

//# sourceMappingURL=company-category.js.map

/***/ }),

/***/ 158:
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
var CompanyDescriptionPage = /** @class */ (function () {
    function CompanyDescriptionPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.EditActive = false;
        this.description = this.navParams.get("description");
        this.name = this.navParams.get("name");
        this.id = this.navParams.get("id");
    }
    CompanyDescriptionPage.prototype.ionViewDidLoad = function () {
        /*  this.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n' +
            '     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!'
        */
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
            selector: 'page-company-description',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\company-description\company-description.html"*/'<!--\n\n  Generated template for the CompanyDescriptionPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button color="primary" icon-only small (click)="dismiss()" [hidden]="EditActive">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title class="uk-title-color-red">{{name}}</ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only small (click)="removeEdit()" [hidden]="!EditActive">\n\n        <span ion-text color="primary">Annuler</span>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div [textContent]="description" (input)="description=$event.target.textContent" #editable></div>\n\n\n\n  <!-- <ion-item class="commentbox">\n\n\n\n    <div\n\n      contenteditable="true"\n\n      [textContent]="description"\n\n      (input)="description=$event.target.textContent"\n\n    >\n\n    </div>\n\n\n\n    <ion-buttons right item-right>\n\n      <button ion-button clear (tap)="submitComment()">\n\n        <ion-icon name="send"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-item> -->\n\n\n\n\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-fab right bottom>\n\n    <button ion-fab color="primary" (click)="editDescription()" [hidden]="EditActive" ><ion-icon name="create"></ion-icon></button>\n\n  </ion-fab>\n\n  <ion-fab right bottom>\n\n    <button ion-fab color="success" [hidden]="!EditActive" ><ion-icon name="checkmark"></ion-icon></button>\n\n  </ion-fab>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\company-description\company-description.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */]])
    ], CompanyDescriptionPage);
    return CompanyDescriptionPage;
}());

//# sourceMappingURL=company-description.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyImagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_img_viewer__ = __webpack_require__(160);
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
var CompanyImagesPage = /** @class */ (function () {
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
            selector: 'page-company-images',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\company-images\company-images.html"*/'<!--\n\n  Generated template for the CompanyImagesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button icon-only small (click)="dismiss()" [hidden]="deletedActive">\n\n        <ion-icon name="close" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title class="uk-title-color-red">Image de Compagny</ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only small (click)="removeDeteletedItem()" [hidden]="!deletedActive">\n\n        <span ion-text color="primary">Annuler</span>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-4 *ngFor="let image of images">\n\n          <div class="one-image uk-background-cover"   tappable>\n\n            <img cover src="{{ image.image }}" #myImage (tap)="zoomeImage(myImage, $event, image.id)" (press)="deleteItem($event, image.id)" id="{{ image.id }}">\n\n          </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n<div class="uk-height-fab"></div>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-fab right bottom>\n\n    <button ion-fab color="primary" (click)="uploadPicture()" block [hidden]="deletedActive" ><ion-icon name="image"></ion-icon></button>\n\n  </ion-fab>\n\n  <ion-fab right bottom>\n\n    <button ion-fab color="success" [hidden]="!deletedActive"><ion-icon name="trash"></ion-icon></button>\n\n  </ion-fab>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\company-images\company-images.html"*/,
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

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_map_map__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__company_category_company_category__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CompanyInfoPage = /** @class */ (function () {
    function CompanyInfoPage(geolocation, mapService, formBuilder, navCtrl, navParams, viewCtrl, modalCtrl, platform) {
        this.geolocation = geolocation;
        this.mapService = mapService;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.tags = [];
        this.addressElement = null;
        var company = navParams.get("company");
        var i = 0;
        for (var _i = 0, _a = company.tags; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.cat == 0) {
                this.tags[i] = t.key;
                i++;
            }
        }
        this.validations_form = this.formBuilder.group({
            ville: [company.ville, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            name: [company.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            phone: [company.phone, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            description: [company.description, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            region: [company.region, ''],
            quartier: [company.quartier, ''],
            latitude: [company.latitude, ''],
            longitude: [company.longitude, ''],
            adresse: [company.adresse, ''],
            email: [company.email, ''],
            siteweb: [company.siteweb, ''],
            bp: [company.bp, ''],
            repere: [company.repere, ''],
            tags: [this.tags, '']
        });
    }
    CompanyInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompanyInfoPage');
    };
    CompanyInfoPage.prototype.ngAfterViewInit = function () {
        this.loadMaps();
    };
    CompanyInfoPage.prototype.openCategoryEdit = function () {
        var categoryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__company_category_company_category__["a" /* CompanyCategoryPage */]);
        categoryModal.present();
    };
    CompanyInfoPage.prototype.loadMaps = function () {
        this.initializeMap();
        this.addressElement = document.getElementById('search').getElementsByTagName('input')[0];
        this.initAutocomplete();
    };
    CompanyInfoPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CompanyInfoPage.prototype.initializeMap = function () {
        //let that = this;
        //this.currentLocation();
        //  this.zone.run(() => {
        var mapEle = this.mapElement.nativeElement;
        this.map = new google.maps.Map(mapEle, {
            zoom: 16,
            center: { lat: 4.036072, lng: 9.672423799999933 },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
            disableDoubleClickZoom: false,
            disableDefaultUI: true,
            zoomControl: false,
            scaleControl: true,
        });
        var markerData = {
            position: {
                lat: 4.036072,
                lng: 9.672423799999933
            },
            map: this.map,
        };
        var dMarker = new google.maps.Marker(markerData);
        dMarker.setMap(this.map);
    };
    CompanyInfoPage.prototype.getAddress = function (latLngObj) {
        var _this = this;
        // Get the address object based on latLngObj
        this.mapService.getStreetAddress(latLngObj).subscribe(function (s_address) {
            if (s_address.status == "ZERO_RESULTS") {
                _this.mapService.getAddress(latLngObj).subscribe(function (address) {
                    //console.log(address);
                    _this.validations_form.patchValue({ quartier: address.results[0].address_components[1].long_name, region: address.results[0].address_components[4].long_name, ville: address.results[0].address_components[2].long_name, longitude: latLngObj.long, latitude: latLngObj.lat, adresse: address.results[0].address_components[0].long_name });
                    // this.addressChange.emit(this.address);
                    _this.getAddressComponentByPlace(address.results[0], latLngObj);
                }, function (err) { return console.log("Error in getting the street address " + err); });
            }
            else {
                //this.address = s_address.results[0].formatted_address;
                _this.validations_form.patchValue({ quartier: s_address.results[0].address_components[1].long_name, region: s_address.results[0].address_components[4].long_name, ville: s_address.results[0].address_components[2].long_name, longitude: latLngObj.long, latitude: latLngObj.lat, adresse: s_address.results[0].address_components[0].long_name });
                _this.getAddressComponentByPlace(s_address.results[0], latLngObj);
            }
        }, function (err) {
            console.log('No Address found ' + err);
        });
    };
    CompanyInfoPage.prototype.getMapCenter = function () {
        return this.map.getCenter();
    };
    CompanyInfoPage.prototype.createAutocomplete = function (addressEl) {
        var _this = this;
        var options = {
            types: [],
            componentRestrictions: { country: 'cm' }
        };
        //console.log("y3  "+this.addressElement);
        var autocomplete = new google.maps.places.Autocomplete(this.addressElement, options);
        autocomplete.bindTo('bounds', this.map);
        return new __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"](function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    var latLngObj = { 'lat': place.geometry.location.lat(), 'long': place.geometry.location.lng() };
                    _this.getAddress(latLngObj);
                    sub.next(place.geometry.location);
                    var markerData = {
                        position: {
                            lat: latLngObj.lat,
                            lng: latLngObj.long
                        },
                        map: _this.map,
                    };
                    var dMarker = new google.maps.Marker(markerData);
                    dMarker.setMap(_this.map);
                    // this.addressChange.emit(this.address);
                }
            });
        });
    };
    CompanyInfoPage.prototype.getAddressComponentByPlace = function (place, latLngObj) {
        var components;
        components = {};
        for (var i = 0; i < place.address_components.length; i++) {
            var ac = place.address_components[i];
            components[ac.types[0]] = ac.long_name;
        }
        var addressObj = {
            street: (components.street_number) ? components.street_number : 'not found',
            area: components.route,
            city: (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality,
            country: (components.administrative_area_level_1) ? components.administrative_area_level_1 : components.political,
            postCode: components.postal_code,
            loc: [latLngObj.long, latLngObj.lat],
            address: this.adresse
        };
        //localStorage.clear();
        //localStorage.setItem('carryr_customer', JSON.stringify(addressObj));
        return components;
    };
    CompanyInfoPage.prototype.initAutocomplete = function () {
        var _this = this;
        this.createAutocomplete(this.addressElement).subscribe(function (location) {
            //console.log('Searchdata', location);
            var latLngObj = { 'lat': location.lat(), 'long': location.lng() };
            _this.getAddress(latLngObj);
            var options = {
                center: location,
                zoom: 16
            };
            _this.map.setOptions(options);
        });
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('map'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
    ], CompanyInfoPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('searchbar', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] }),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _b || Object)
    ], CompanyInfoPage.prototype, "searchbar", void 0);
    CompanyInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company-info',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\company-info\company-info.html"*/'<!--\n\n  Generated template for the CompanyInfoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button icon-only small (click)="dismiss()">\n\n        <ion-icon name="close" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title class="uk-title-color-red">Information </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n<form class="form"  [formGroup]="validations_form"  >\n\n<ion-card class="uk-background-default card-info no-border-radius" margin-bottom>\n\n  <ion-card-content class="uk-flex uk-flex-middle uk-flex-center">\n\n    <div class="uk-width-1-1">\n\n      <div class="uk-text-center uk-margin-auto">\n\n        <img src="assets/imgs/default.jpg" alt="" class="logo uk-border-circle uk-margin-auto uk-display-block" margin-bottom>\n\n        <button ion-button clear small class="button-custom-size" (click)="uploadPicture()">Modifier le logo</button>\n\n      </div>\n\n      <div class="uk-grid-collapse uk-grid">\n\n        <div class="uk-width-expand">\n\n          <ion-list no-margin>\n\n            <ion-item no-padding no-border>\n\n              <ion-select interface="action-sheet" multiple="false" placeholder="Selectionnez une catégorie principale">\n\n                <ion-option value="">Selectionnez une catégorie principale</ion-option>\n\n                <ion-option value="mute_15">For 15 Minutes</ion-option>\n\n                <ion-option value="mute_1">For 1 Hour</ion-option>\n\n                <ion-option value="mute_23">For 24 Hours</ion-option>\n\n                <ion-option value="mute_inf">Until I turn it back on</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n          </ion-list>\n\n        </div>\n\n        <div class="uk-width-auto">\n\n            <button ion-button clear  (click)="openCategoryEdit()">\n\n              <ion-icon name="add"></ion-icon>\n\n            </button>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </ion-card-content>\n\n</ion-card>\n\n\n\n<div class="uk-background-default uk-padding uk-padding-remove-bottom uk-padding-remove-top">\n\n  \n\n  <ion-list no-margin>\n\n    <ion-item no-padding no-border>\n\n      <ion-label floating>Nom de l\'entreprise</ion-label>\n\n      <ion-input type="text" formControlName="name"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding no-border>\n\n      <ion-label floating>Description de l\'entreprise</ion-label>\n\n      <ion-textarea  formControlName="description"></ion-textarea>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Téléphone</ion-label>\n\n      <ion-input type="text" formControlName="phone"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Adresse Email</ion-label>\n\n      <ion-input type="text" formControlName="email"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Site Web</ion-label>\n\n      <ion-input type="text" formControlName="siteweb"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Repère de la position de votre entreprise</ion-label>\n\n      <ion-input type="text" formControlName="repere"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n    <!--ion-label>Mot clés</ion-label-->\n\n    <ion-tags-input formControlName="tags" [placeholder]="\'+ tags\'" [once]="\'true\'" [separatorStr]="\',\'" [type]="text" class="uk-margin-large-bottom"></ion-tags-input>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-searchbar autocorrect="off" autocapitalize="off" spellcheck="off" #searchbar placeholder="Search..." class="search"  id="search" ></ion-searchbar>\n\n  <div #map id="map" class="map" style="height:200px;"></div>\n\n\n\n  <ion-list no-margin>\n\n      <ion-item no-padding no-border>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Ville</ion-label>\n\n      <ion-input type="text" formControlName="ville"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>adresse</ion-label>\n\n      <ion-input type="text" formControlName="adresse"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>latitude</ion-label>\n\n      <ion-input type="text" formControlName="latitude"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>longitude</ion-label>\n\n      <ion-input type="text" formControlName="longitude"></ion-input>\n\n    </ion-item><ion-item no-padding>\n\n      <ion-label floating>Quartier</ion-label>\n\n      <ion-input type="text" formControlName="quartier"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Region</ion-label>\n\n      <ion-input type="text" formControlName="region"></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Boite Postale</ion-label>\n\n      <ion-input type="text" formControlName="bp"></ion-input>\n\n    </ion-item>\n\n    \n\n\n\n    <ion-item no-padding no-border>\n\n    </ion-item>\n\n  </ion-list>\n\n  \n\n</div>\n\n<div class="uk-height-fab"></div>\n\n</form>\n\n</ion-content>\n\n<ion-footer>\n\n  <ion-fab right bottom>\n\n    <button ion-fab color="success"><ion-icon name="checkmark"></ion-icon></button>\n\n  </ion-fab>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\company-info\company-info.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_map_map__["a" /* MapProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_map_map__["a" /* MapProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */]) === "function" && _k || Object])
    ], CompanyInfoPage);
    return CompanyInfoPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=company-info.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*import { ModalPage } from '../../pages/modal-page/modal-page';
import { AddGpsPage } from '../../pages/add-gps/add-gps';*/
//import {AuthProvider} from '../../providers/auth/auth';

//import {JwtHelper} from "angular2-jwt";
//import {Storage} from "@ionic/storage";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(events, app, navCtrl, http, toastCtrl, navParams, formBuilder, modalCtrl) {
        this.events = events;
        this.app = app;
        this.navCtrl = navCtrl;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.modalCtrl = modalCtrl;
        // When the page loads, we want the Login segment to be selected
        this.authType = "login";
        // We need to set the content type for the server
        this.contentHeader = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({ "Content-Type": "application/json" });
        this.validations_form = this.formBuilder.group({
            login: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.validation_messages = {
            'login': [
                { type: 'required', message: 'Login is required.' }
            ],
            'password': [
                { type: 'required', message: 'password is required.' }
            ]
        };
    }
    LoginPage.prototype.openModal = function () {
        /*  let myModal = this.modalCtrl.create(ModalPage); //ModalPage
          myModal.present();*/
    };
    LoginPage.prototype.connexion = function (val) {
        var _this = this;
        var myData = JSON.stringify({ email: val.login, password: val.password });
        this.http.post("http://yoomeeonl.webfactional.com/MobileApp/login", myData)
            .map(function (result) {
            return result.json();
        })
            .subscribe(function (data) {
            // console.log(data["id"]);
            if (data["id"] == 0) {
                _this.presentToast("Votre login nexiste pas, veuillez pour inscrire.");
            }
            else {
                //console.log(data["_body"]); 
                localStorage.setItem('userId', JSON.stringify({ id: data["id"], lastName: data["last_name"], firstName: data["first_name"], email: data["email"] }));
                //this.navCtrl.push('CpanelPage');
                //  let nav = this.app.getRootNav();
                // nav.setRoot('CpanelPage');
                _this.events.publish('userconnect', true);
                _this.navCtrl.popToRoot();
                //this.navCtrl.setRoot ('CpanelPage');
            }
        }, function (error) {
            console.log("Oooops!");
        });
    };
    LoginPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 5000,
            position: 'top'
        });
        toast.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="form-content">\n  <form class="form" [formGroup]="validations_form"  (ngSubmit)="connexion(validations_form.value)">\n   \n    <ion-item>\n      <ion-label floating color="primary">Login</ion-label>\n      <ion-input type="text" formControlName="login"></ion-input>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.login">\n        <div class="error-message" *ngIf="validations_form.get(\'login\').hasError(validation.type) && (validations_form.get(\'login\').dirty || validations_form.get(\'login\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n\n    <ion-item>\n      <ion-label floating color="primary">Mot de passe</ion-label>\n      <ion-input type="password" formControlName="password"></ion-input>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.password">\n        <div class="error-message" *ngIf="validations_form.get(\'password\').hasError(validation.type) && (validations_form.get(\'password\').dirty || validations_form.get(\'password\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n\n    \n\n\n  \n    <button ion-button full type="submit" [disabled]="!validations_form.valid">log</button>\n  </form>\n  <button ion-button block (click)="openModal()">Mot de passe oublié?</button>\n</ion-content>\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(56);
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
 * Generated class for the ReviewFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReviewFormPage = /** @class */ (function () {
    function ReviewFormPage(navCtrl, navParams, formBuilder, http, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.userexist = false;
        this.validations_form = this.formBuilder.group({
            titre: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            message: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.validation_messages = {
            'login': [
                { type: 'required', message: 'Login is required.' }
            ],
            'password': [
                { type: 'required', message: 'password is required.' }
            ]
        };
        this.note = this.navParams.get("vote");
        this.companyId = this.navParams.get("companyId");
        var currentUser = JSON.parse(localStorage.getItem('userId'));
        this.user = currentUser;
        if (localStorage.getItem("userId")) {
            this.userexist = true;
        }
    }
    /* ionViewDidLoad() {
      console.log('ionViewDidLoad ReviewFormPage');
     }*/
    ReviewFormPage.prototype.addreview = function (value) {
        var _this = this;
        var myData = JSON.stringify({ titre: value.titre, message: value.message, note: this.note, companyId: this.companyId, userId: this.user.id.$id });
        // alert(value.titre+"  "+this.note+"  "+value.message+" "+this.companyId);
        this.http.post("http://yoomeeonl.webfactional.com/MobileApp/saveReview", myData)
            .subscribe(function (data) {
            //console.log( data["_body"]);
            _this.toastCtrl.create({ message: "Votre commentaire a été enregistré", position: "top" });
        }, function (error) {
            //console.log("Oooops!");
        });
    };
    ReviewFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-review-form',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\review-form\review-form.html"*/'<!--\n  Generated template for the ReviewFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>review-formPage</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <rating  [(ngModel)]="note"\n                     readOnly="false"\n                     max="5"\n                     emptyStarIconName="star-outline"\n                     halfStarIconName="star-half"\n                     starIconName="star"\n                     nullable="false" ></rating>\n  <form class="form" [formGroup]="validations_form"  >\n   \n    \n\n    <ion-item>\n      <ion-label floating color="primary">Titre</ion-label>\n      <ion-input type="text" formControlName="titre"></ion-input>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.titre">\n        <div class="error-message" *ngIf="validations_form.get(\'titre\').hasError(validation.type) && (validations_form.get(\'titre\').dirty || validations_form.get(\'titre\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n\n    <ion-item>\n      <ion-label floating color="primary">Message</ion-label>\n      <ion-textarea type="message" formControlName="message"></ion-textarea>\n    </ion-item>\n    <div class="validation-errors">\n      <ng-container *ngFor="let validation of validation_messages.message">\n        <div class="error-message" *ngIf="validations_form.get(\'message\').hasError(validation.type) && (validations_form.get(\'message\').dirty || validations_form.get(\'message\').touched)">\n          {{ validation.message }}\n        </div>\n      </ng-container>\n    </div>\n\n    <button ion-button full type="submit" [disabled]="!validations_form.valid" (click)="addreview(validations_form.value)">Save</button>\n    <button ion-button full type="submit" [disabled]="!validations_form.valid">Annuler</button>\n    \n  </form>\n</ion-content>\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\review-form\review-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */]])
    ], ReviewFormPage);
    return ReviewFormPage;
}());

//# sourceMappingURL=review-form.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComptePage; });
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
 * Generated class for the ComptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ComptePage = /** @class */ (function () {
    function ComptePage(navCtrl, navParams, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        menu.enable(true);
    }
    ComptePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ComptePage');
    };
    ComptePage.prototype.openMenu = function (evt) {
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
    ComptePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-compte',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\compte\compte.html"*/'<!--\n\n  Generated template for the ComptePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-toolbar padding-horizontal>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n\n        <ion-icon name="menu" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n\n    </ion-title>\n\n\n\n    <!-- ion-buttons end>\n\n      <button ion-button icon-only>\n\n        <ion-icon name="pin" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons -->\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\compte\compte.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */]])
    ], ComptePage);
    return ComptePage;
}());

//# sourceMappingURL=compte.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(74);
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
var MapsPage = /** @class */ (function () {
    function MapsPage(navCtrl, navParams, menu, listingService, toastCtrl, platform, emailComposer, callNumber, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.listingService = listingService;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.emailComposer = emailComposer;
        this.callNumber = callNumber;
        this.events = events;
        this.listMarker = new Array();
        // public listMarker = new Array();
        this.newMarkers = [];
        menu.enable(true);
        this.refresh = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.events.subscribe('citiesfilter', function (cities) {
            _this.cities = cities;
        });
        this.events.subscribe('categoriesfilter', function (categories) {
            _this.categories = categories;
        });
        events.subscribe('listingMap', function (listing) {
            _this.newMarkers = [];
            _this.platform.ready().then(function () { return _this.loadMaps(); });
        });
        this.platform.ready().then(function () { return _this.loadMaps(); });
    }
    MapsPage.prototype.ionViewDidLoad = function () {
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
        document.getElementById('map').style.height = '100%';
    };
    MapsPage.prototype.loadMaps = function () {
        this.initializeMap();
        this.getMarkers();
    };
    MapsPage.prototype.initializeMap = function () {
        var mapEle = this.mapElement.nativeElement;
        this.map = new google.maps.Map(mapEle, {
            zoom: 6,
            center: new google.maps.LatLng(7.4452674, 12.4346327),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#c6c6c6" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#dde6e8" }, { "visibility": "on" }] }],
            disableDoubleClickZoom: false,
            disableDefaultUI: true,
            zoomControl: true,
            scaleControl: true,
        });
    };
    MapsPage.prototype.placeMarkers = function (markers) {
        for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
            var point = markers_1[_i];
            var marker = void 0;
            var markerContent = document.createElement('div');
            var thumbnailImage = void 0;
            thumbnailImage = "http://yoomeeonl.webfactional.com/media/pictures/categories/bar.jpg";
            // if ((point["logo"] != undefined) || (point["logo"] != '')) {
            //   thumbnailImage = point["logo"];
            // }
            // else {
            //   // thumbnailImage = base_url+"/assets/img/items/default.png";
            //   thumbnailImage = "http://yoomeeonl.webfactional.com/media/pictures/categories/bar.jpg";
            // }
            // if (point["featured"] == 1) {
            //   markerContent.innerHTML =
            //     '<div class="marker" data-id="' + point["_id"]['$id'] + '">' +
            //     '<div class="title">' + point["name"] + '</div>' +
            //     '<div class="marker-wrapper">' +
            //     '<div class="tag"><i class="fa fa-check"></i></div>' +
            //     '<div class="pin">' +
            //     '<div class="image" style="background-image: url(' + thumbnailImage + ');"></div>' +
            //     '</div>' +
            //     '</div>' +
            //     '</div>';
            // }
            // else {
            markerContent.innerHTML =
                // '<div class="marker" data-id="'+ point["_id"]+'">' +
                '<div class="marker" data-id="' + point["_id"]['$id'] + '">' +
                    '<div class="title">' + point["name"] + '</div>' +
                    '<div class="marker-wrapper">' +
                    '<div class="pin">' +
                    '<div class="image" style="background-image: url(' + thumbnailImage + ');"></div>' +
                    '</div>' +
                    '</div>';
            // console.log(markers[i]["_id"]);
            // console.log(markers[i]["_id"].$id);
            // }
            // Latitude, Longitude and Address
            if (point["latitude"] && point["longitude"]) {
                this.renderRichMarker(point, markerContent);
            }
            else {
                console.log("No location coordinates" + point["name"]);
            }
        }
    };
    MapsPage.prototype.renderRichMarker = function (i, markerContent) {
        var _this = this;
        //console.log( map.getBounds().contains( new google.maps.LatLng( markers[i]["latitude"], markers[i]["longitude"] ) ) );
        var marker = new RichMarker({
            position: new google.maps.LatLng(i["latitude"], i["longitude"]),
            map: this.map,
            draggable: false,
            content: markerContent,
            flat: true
        });
        /* google.maps.event.addListener(marker, 'click', (function(marker, i) {
            
           return function(i) {
             this.element={"name": "ari"};
             this.refresh.emit(this.element);
             alert(i["name"]);
             let heightDetail = document.getElementById('details').offsetHeight;
             document.getElementById('map').style.height = 'calc(100% - '+heightDetail+'px)';
           }
         })(marker, i));*/
        google.maps.event.addListener(marker, 'click', function () {
            _this.element = i;
            _this.refresh.emit(_this.element);
            var heightDetail = document.getElementById('details').offsetHeight;
            document.getElementById('map').style.height = 'calc(100% - ' + heightDetail + 'px)';
        });
        this.currentMaker = i;
        this.newMarkers.push(marker);
    };
    MapsPage.prototype.placeCluster = function () {
        var clusterStyles = [
            {
                url: 'http://yoomeeonl.webfactional.com/assets/img/cluster.png',
                height: 36,
                width: 36,
            }
        ];
        new MarkerClusterer(this.map, this.newMarkers, { styles: clusterStyles, maxZoom: 14 });
    };
    MapsPage.prototype.getMarkers = function () {
        var _this = this;
        this.listingService.getMarkers(this.categories, this.cities).subscribe(function (data) {
            _this.placeMarkers(data);
            _this.placeCluster();
        });
    };
    MapsPage.prototype.closedModal = function () {
        document.getElementById('map').style.height = '100%';
    };
    MapsPage.prototype.callCompany = function (phonenumber) {
        this.callNumber.callNumber(phonenumber, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer ' + phonenumber); });
    };
    MapsPage.prototype.emailCompany = function (emailcpy) {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
            }
        });
        var email = {
            to: emailcpy,
            subject: '',
            body: '',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    MapsPage.prototype.isEmpty = function (arg) {
        for (var item in arg) {
            return false;
        }
        return true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], MapsPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], MapsPage.prototype, "element", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
    ], MapsPage.prototype, "refresh", void 0);
    MapsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-maps',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\maps\maps.html"*/'<!--\n  Generated template for the MapsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar padding-horizontal>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n        <ion-icon name="menu" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openMenu(\'left\')">\n        <ion-icon name="funnel" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="uk-position-relative">\n\n  <div #map id="map"></div>\n  <div class="uk-background-default uk-box-shadow-medium" id="details">\n    <ion-list>\n      <ion-card>\n        <ion-card-content>\n          <ion-grid>\n\n            <ion-row>\n              <ion-col col-9>\n                <h2 class="uk-text-truncate uk-margin-remove" *ngIf="!isEmpty(element)">{{element.name}}</h2>\n                <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted" style="margin-bottom: 4px !important;" *ngIf="!isEmpty(element)">{{element.ville}} {{element.quartier}}</div>\n                <!-- div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-success uk-text-small"> <ion-icon name="checkmark-circle"></ion-icon> Entreprise validé</div -->\n                <!-- <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-danger uk-text-small"> <ion-icon name="close"></ion-icon> Validation en cours</div> -->\n              </ion-col>\n              <ion-col col-3 *ngIf="!isEmpty(element)">\n                <rating  [(ngModel)]="element.ratecount"\n                         readOnly="true"\n                         max="5"\n                         emptyStarIconName="star-outline"\n                         halfStarIconName="star-half"\n                         starIconName="star"\n                         nullable="false" ></rating>\n                <div class="uk-text-right uk-h4 uk-margin-remove">{{element.reviewcount}} avis</div>\n                <!-- div class="uk-text-right uk-text-success uk-h4 uk-margin-remove">8h à 18h30</div -->\n              </ion-col>\n              <ion-col col class="uk-padding-remove-vertical">\n                <hr no-margin="">\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col col-9>\n                <ion-item class="item-compagny">\n                  <ion-thumbnail item-start>\n                    <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg" class="uk-responsive-height">\n                  </ion-thumbnail>\n                  <div>\n                    <ion-badge item-end class="uk-margin-remove-top uk-margin-remove-left uk-margin-remove-right" *ngIf="!isEmpty(element)">{{element.maincategorie}}</ion-badge>\n                  </div>\n\n                  <div class="uk-h4 uk-margin-remove">\n                    <ul class="uk-text-small uk-padding-small uk-padding-remove-vertical uk-padding-remove-right" no-margin>\n                      <li *ngIf="!isEmpty(element)">{{element.adresse}}</li>\n                      <li *ngIf="!isEmpty(element)">{{element.repere}}</li>\n                    </ul>\n                  </div>\n\n                </ion-item>\n              </ion-col>\n              <ion-col col-3 class="uk-position-relative">\n                <div class="uk-position-bottom-right">\n                  <button *ngIf="!isEmpty(element)" ion-button (click)="callCompany(element.phone)"><ion-icon name="call"></ion-icon></button>\n                  <button *ngIf="!isEmpty(element)" ion-button  (click)="emailCompany(element.email)"><ion-icon name="mail"></ion-icon></button>\n                </div>\n              </ion-col>\n            </ion-row>\n            <ion-row no-padding no-margin>\n              <ion-col col-12 class="uk-position-relative" no-padding>\n                <div class="uk-text-center">\n                  <button ion-button clear small icon-only block (tap)="closedModal()">Fermé</button>\n                </div>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n  </div>\n\n\n\n</ion-content>\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\maps\maps.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], MapsPage);
    return MapsPage;
}());

//# sourceMappingURL=maps.js.map

/***/ }),

/***/ 178:
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
webpackEmptyAsyncContext.id = 178;

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/annuaire/annuaire.module": [
		708,
		9
	],
	"../pages/company-category/company-category.module": [
		709,
		8
	],
	"../pages/company-description/company-description.module": [
		710,
		7
	],
	"../pages/company-images/company-images.module": [
		711,
		6
	],
	"../pages/company-info/company-info.module": [
		712,
		5
	],
	"../pages/company/company.module": [
		713,
		0
	],
	"../pages/compte/compte.module": [
		714,
		4
	],
	"../pages/login/login.module": [
		715,
		3
	],
	"../pages/maps/maps.module": [
		716,
		2
	],
	"../pages/review-form/review-form.module": [
		717,
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
webpackAsyncContext.id = 222;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(117);
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
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MapProvider = /** @class */ (function () {
    function MapProvider(http) {
        this.http = http;
        this.contentHeader = new Headers({ 'Content-Type': 'application/json' });
        this.google_api_key = 'AIzaSyBEDfNcQRmKQEyulDN8nGWjLYPm8s4YB58'; // 'AIzaSyBYl6qf41tq3IkHSyipd_Pm8C-EDsgcYmA';
        console.log('Hello MapProvider Provider');
    }
    MapProvider.prototype.getAddress = function (params) {
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + params.lat + ',' + params.long;
        return this.GET(url);
    };
    MapProvider.prototype.getStreetAddress = function (params) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + this.google_api_key + '&latlng=' + params.lat + ',' + params.long + '&result_type=street_address';
        return this.GET(url);
    };
    MapProvider.prototype.GET = function (url) {
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    MapProvider.prototype.POST = function (url, params) {
        // let options = new RequestOptions({
        //   headers: this.contentHeader
        // });
        // return this.http.post(url, params, options).map(res => res.json());
    };
    MapProvider.prototype.DEL = function (url) {
        // let options = new RequestOptions({
        //   headers: this.contentHeader
        // });
        // return this.http.delete(url, options).map(res => res.json());
    };
    MapProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], MapProvider);
    return MapProvider;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__annuaire_annuaire__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__maps_maps__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__compte_compte__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, menu, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.events = events;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__annuaire_annuaire__["a" /* AnnuairePage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__maps_maps__["a" /* MapsPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__compte_compte__["a" /* ComptePage */];
        this.MapsParams = {};
        events.subscribe('listingMap', function (listing) {
            _this.MapsParams['data'] = listing;
            _this.MapsParams['tab'] = true;
        });
    }
    TabsPage.prototype.menuToggle = function () {
        this.menu.enable(true, 'menu');
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\tabs\tabs.html"*/'\n\n<ion-tabs tabsHighlight="true" selectedIndex="0" tabsPlacement="bottom"  (ionChange)="menuToggle()">\n\n  <ion-tab [root]="tab1Root" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabIcon="list"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabIcon="locate"></ion-tab>\n\n  <ion-tab [root]="tab4Root" tabIcon="person"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Events */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_company__ = __webpack_require__(368);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
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
            selector: 'page-home',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-toolbar padding-horizontal>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n\n        <ion-icon name="menu" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n\n    </ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only>\n\n        <ion-icon name="pin" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n  <div class="uk-height-medium uk-background-cover uk-position-relative uk-flex uk-flex-center uk-flex-middle" style="background-image: url(\'assets/imgs/back.jpg\');">\n\n    <div class="uk-position-cover cover"></div>\n\n    <div class="uk-content-cover">\n\n      <div class="uk-h2 uk-margin-large-bottom">Bienvenue sur ICI.CM</div>\n\n      <ion-auto-complete [options]="{ placeholder : \'Rechercher un lieu\' }" [(ngModel)]="keyword"></ion-auto-complete>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="uk-card uk-card-default">\n\n    <div class="uk-card-header uk-text-left uk-padding-small uk-position-relative">\n\n      <h6 class="uk-margin-remove">Nouveaux lieux</h6>\n\n\n\n    </div>\n\n    <div class="uk-card-body uk-padding-remove">\n\n      <ion-slides slidesPerView=1.5 autoplay="5000" loop="false" speed="1000" >\n\n        <ion-slide>\n\n          <ion-card>\n\n            <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg"/>\n\n            <ion-card-content class="uk-position-relative">\n\n              <ion-badge item-end class="uk-margin-small">Catégorie Catégorie Catégorie</ion-badge>\n\n              <h2 class="uk-text-truncate uk-margin-remove" (click)="OpenDetail()">Nom de l\'entreprise</h2>\n\n              <small>Ville</small>\n\n              <div class="uk-position-bottom-right uk-padding-small">\n\n                <rating  [(ngModel)]="rate"\n\n                         readOnly="true"\n\n                         max="5"\n\n                         emptyStarIconName="star-outline"\n\n                         halfStarIconName="star-half"\n\n                         starIconName="star"\n\n                         nullable="false" ></rating>\n\n\n\n              </div>\n\n            </ion-card-content>\n\n          </ion-card>\n\n        </ion-slide>\n\n        <ion-slide>\n\n          <ion-card>\n\n            <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg"/>\n\n            <ion-card-content class="uk-position-relative">\n\n              <ion-badge item-end class="uk-margin-small">Catégorie Catégorie Catégorie</ion-badge>\n\n              <h2 class="uk-text-truncate uk-margin-remove">Nom de l\'entreprise</h2>\n\n              <small>Ville</small>\n\n              <div class="uk-position-bottom-right uk-padding-small">\n\n                <rating  [(ngModel)]="rate"\n\n                         readOnly="true"\n\n                         max="5"\n\n                         emptyStarIconName="star-outline"\n\n                         halfStarIconName="star-half"\n\n                         starIconName="star"\n\n                         nullable="false" ></rating>\n\n\n\n              </div>\n\n            </ion-card-content>\n\n          </ion-card>\n\n        </ion-slide>\n\n      </ion-slides>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_description_company_description__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__company_images_company_images__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__company_info_company_info__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__company_category_company_category__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_companies_companies__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_email_composer__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_review_form_review_form__ = __webpack_require__(163);
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
var CompanyPage = /** @class */ (function () {
    function CompanyPage(navCtrl, navParams, ref, renderer, modalCtrl, listingService, emailComposer, callNumber, iab, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ref = ref;
        this.renderer = renderer;
        this.modalCtrl = modalCtrl;
        this.listingService = listingService;
        this.emailComposer = emailComposer;
        this.callNumber = callNumber;
        this.iab = iab;
        this.events = events;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.dark = true;
        /*public ;*/
        this.business = {};
        this.userconnect = false;
        this.idcompagnie = navParams.get("idcompagnie");
        this.loadData(this.idcompagnie);
        //this.desc=this.business.description;
        var currentUser = JSON.parse(localStorage.getItem('userId'));
        this.user = currentUser;
        if (localStorage.getItem("userId")) {
            // console.log("true1");
            this.userconnect = true;
        }
        events.subscribe('userconnect', function (user) {
            // console.log("true2");
            _this.userconnect = true;
        });
    }
    CompanyPage.prototype.loadData = function (id) {
        var _this = this;
        this.listingService.getCompanyById(id).subscribe(function (data) {
            _this.business = data;
            _this.latitude = data.latitude;
            _this.name = data.name;
            _this.longitude = data.longitude;
        });
    };
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
    CompanyPage.prototype.openDescriptionEdit = function (descr, name, id) {
        var descriptionModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__company_description_company_description__["a" /* CompanyDescriptionPage */], { "description": descr, "name": name, "id": id });
        descriptionModal.present();
    };
    CompanyPage.prototype.openImageEdit = function () {
        var imageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__company_images_company_images__["a" /* CompanyImagesPage */]);
        imageModal.present();
    };
    CompanyPage.prototype.openInfoEdit = function () {
        console.log(this.business);
        var infoModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__company_info_company_info__["a" /* CompanyInfoPage */], { "company": this.business });
        infoModal.present();
    };
    CompanyPage.prototype.openCategoryEdit = function () {
        var categoryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__company_category_company_category__["a" /* CompanyCategoryPage */]);
        categoryModal.present();
    };
    CompanyPage.prototype.onModelChange = function (val, companyId) {
        //alert(this.user);
        if (this.userconnect == true) {
            var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_11__pages_review_form_review_form__["a" /* ReviewFormPage */], { vote: val, companyId: companyId });
            myModal.present();
        }
        else {
            var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */]);
            myModal.present();
        }
    };
    CompanyPage.prototype.loadMap = function () {
        var latLng = new google.maps.LatLng(-34.9290, 138.6010);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
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
    CompanyPage.prototype.callCompany = function (phonenumber) {
        this.callNumber.callNumber(phonenumber, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer ' + phonenumber); });
    };
    CompanyPage.prototype.emailCompany = function (emailcpy) {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
            }
        });
        var email = {
            to: emailcpy,
            subject: '',
            body: '',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    CompanyPage.prototype.websiteCompany = function (siteweb) {
        var browser = this.iab.create(siteweb);
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
            selector: 'page-company',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\pages\company\company.html"*/'<!--\n\n  Generated template for the CompanyPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-header shadow>\n\n\n\n  <ion-navbar [class.show-background]="showToolbar">\n\n    <ion-title [hidden]="!showToolbar" class="uk-text-truncate">{{business.name}}</ion-title>\n\n    <ion-buttons end *ngIf="userconnect==true">\n\n      <button ion-button icon-only small (click)="openInfoEdit(business._id.$id)">\n\n        <ion-icon name="create"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content  class="content"\n\n              (ionScroll)="onScroll($event)"\n\n              [class.transition]="transition"\n\n              [style.background-size]="headerImgSize"\n\n              [style.backgroundImage]="\'url(http://yoomeeonl.webfactional.com/media/pictures/companies/\'+ business.imageune +\')\'"><!--headerImgUrl-->\n\n\n\n  <div class="user-info uk-height-small uk-flex uk-flex-middle uk-flex-center">\n\n    <h2 class="uk-size" padding-horizontal>{{business.name}} {{userconnect}}</h2>\n\n  </div>\n\n\n\n  <div class="contents">\n\n\n\n    <button ion-button block class="uk-block-button">Consultez notre vidéo</button>\n\n\n\n    <ion-card no-margin class="card-info">\n\n      <ion-card-content no-padding>\n\n        <ion-grid>\n\n          <ion-row>\n\n            <ion-col col-9>\n\n              <ion-item class="item-compagny uk-padding-remove">\n\n                <ion-thumbnail item-start>\n\n\n\n                  <img  *ngIf="business.logo==\'\'" src="assets/imgs/default.jpg" class="uk-responsive-height uk-border-circle">\n\n                  <img  *ngIf="business.logo!=\'\'" src="{{business.logo}}" class="uk-responsive-height uk-border-circle">\n\n                </ion-thumbnail>\n\n                <div>\n\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted" style="margin-bottom: 4px !important;">{{business.ville}} {{business.quartier}}</div>\n\n                  <!--  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-success uk-text-small"> <ion-icon name="checkmark-circle"></ion-icon> Entreprise validé</div>\n\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-danger uk-text-small"> <ion-icon name="close"></ion-icon> Validation en cours</div> -->\n\n                  <ion-badge item-end class="uk-margin-remove-top uk-margin-remove-left uk-margin-remove-right">{{business.maincategorie}}</ion-badge>\n\n                </div>\n\n\n\n              </ion-item>\n\n            </ion-col>\n\n            <ion-col col-3 class="uk-position-relative">\n\n              <div class="">\n\n                <rating  [(ngModel)]="business.ratecount"\n\n                         readOnly="true"\n\n                         max="5"\n\n                         emptyStarIconName="star-outline"\n\n                         halfStarIconName="star-half"\n\n                         starIconName="star"\n\n                         nullable="false" ></rating>\n\n                <div class="uk-text-right uk-h4 uk-margin-remove">{{business.reviewcount}} avis</div>\n\n                <div class="uk-text-right uk-text-danger uk-text-bold uk-h4 uk-margin-remove">Fermé</div>\n\n              </div>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card no-margin margin-top class="card-info">\n\n      <ion-card-header no-padding>\n\n        <ion-segment [(ngModel)]="segmentation">\n\n          <ion-segment-button value="desc" (ionSelect)="activeLocation()">\n\n            Description\n\n          </ion-segment-button>\n\n          <ion-segment-button value="locale" (ionSelect)="activeMap()"  *ngIf="business.latitude!=\'\'">\n\n            Localisation\n\n          </ion-segment-button>\n\n          <ion-segment-button value="avis" (ionSelect)="activeAvis()">\n\n            Avis\n\n          </ion-segment-button>\n\n        </ion-segment>\n\n      </ion-card-header>\n\n      <ion-card-content [ngSwitch]="segmentation" no-padding>\n\n        <div *ngSwitchCase="\'desc\'" class="uk-height-1-1 uk-position-relative uk-padding-small">\n\n\n\n          <div class="uk-position-relative">\n\n            <ion-label ion-text class="uk-text-bold uk-display-block">Image</ion-label>\n\n            <div class="uk-position-center-right">\n\n              <button ion-button clear small class="button-custom-size" (click)="openImageEdit()">Gérer</button>\n\n            </div>\n\n          </div>\n\n\n\n\n\n          <ion-slides loop="true" slidesPerView="4" margin-top spaceBetween="3" >\n\n\n\n\n\n              <ion-slide *ngFor="let item of business.gallery">\n\n                <img alt="city"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/{{item.url}}"  imageViewer>\n\n              </ion-slide>\n\n\n\n\n\n          </ion-slides>\n\n          <hr>\n\n          <div class="uk-text-break uk-position-relative">\n\n            <div class="uk-height-max-small" style="overflow: hidden">\n\n               {{business.description}}\n\n             </div>\n\n            <div class="show-more-end"></div>\n\n\n\n            <div class="uk-text-center" *ngIf="business.description!=\'\'">\n\n              <button ion-button clear small (click)="openDescriptionEdit(business.description, business.name, business._id.$id)">Lire la suite</button>\n\n            </div>\n\n          </div>\n\n          <hr>\n\n          <ion-grid no-padding>\n\n            <ion-row>\n\n              <ion-col col-5>\n\n                <ion-label class="uk-text-bold">\n\n                  Autres catégories :\n\n                </ion-label>\n\n              </ion-col>\n\n              <ion-col col-7>\n\n                <div ion-text class="uk-text-break">\n\n                    <p *ngFor="let item of business.tags">\n\n                      <span *ngIf="item.cat==1">{{item.key}} </span>\n\n                    </p>\n\n                    <div>\n\n                      <button ion-button clear small class="button-custom-size" (click)="openCategoryEdit()">Gérer vos categories</button>\n\n                    </div>\n\n                </div>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n          <hr>\n\n          <ion-grid no-padding>\n\n            <ion-row>\n\n              <ion-col col-12 class="uk-position-relative">\n\n                <ion-label class="uk-text-bold">\n\n                  Horaire :\n\n                </ion-label>\n\n                <span class="uk-text-success">Ouvert</span> aujourd\'hui de 08h à 15h\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n        </div>\n\n        <div *ngSwitchCase="\'locale\'" class="uk-height-1-1"  >\n\n          <maps [business]="business"></maps>\n\n        </div>\n\n        <div *ngSwitchCase="\'avis\'" class="uk-height-1-1">\n\n          <div class="uk-padding-small rating-block uk-text-center">\n\n\n\n            <div ion-text class="uk-h1 uk-text-center uk-margin-remove-bottom" color="dark">Noté ce professionnel</div>\n\n            <div ion-text class="uk-h3 uk-text-center uk-margin-small-top">Cliquez sur les etoiles pour noter ce professionnel</div>\n\n            <rating  [(ngModel)]="valiRate"\n\n                     readOnly="false"\n\n                     max="5"\n\n                     emptyStarIconName="star-outline"\n\n                     halfStarIconName="star-half"\n\n                     starIconName="star"\n\n                     nullable="false" (ngModelChange)="onModelChange($event, business._id.$id)"></rating>\n\n\n\n            <button ion-button clear class="uk-text-center" (click)="onModelChange(valiRate,business._id.$id)">Ecrire un avis</button>\n\n\n\n          </div>\n\n\n\n          <hr>\n\n\n\n          <ion-list>\n\n            <ion-item *ngFor="let item of business.reviews">\n\n              <ion-avatar item-start>\n\n                <img src="http://yoomeeonl.webfactional.com/{{item.picture}}">\n\n             \n\n              </ion-avatar>\n\n              <div class="uk-position-relative uk-comments">\n\n                <h2>{{item.username}}</h2>\n\n                <rating  [(ngModel)]="item.rate"\n\n                                          readOnly="true"\n\n                                          max="5"\n\n                                          emptyStarIconName="star-outline"\n\n                                          halfStarIconName="star-half"\n\n                                          starIconName="star"\n\n                                          nullable="false" ></rating>\n\n                <ion-note class="uk-position-center-right">{{item.date}}</ion-note>\n\n              </div>\n\n              <p>{{item.review}}</p>\n\n              <hr>\n\n            </ion-item>\n\n\n\n        \n\n\n\n          </ion-list>\n\n\n\n\n\n        </div>\n\n      </ion-card-content>\n\n    </ion-card>\n\n\n\n  </div>\n\n\n\n</ion-content>\n\n\n\n<ion-footer [class.bgFooter]="dark">\n\n  <ion-grid>\n\n\n\n\n\n    \n\n    <ion-row [hidden]="!dark">\n\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center" style="height: 56px">\n\n        <button ion-button clear color="white" (click)="callCompany(item.phone)"><ion-icon name="call"></ion-icon></button>\n\n      </ion-col>\n\n\n\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center" style="height: 56px">\n\n        <button ion-button clear color="white" (click)="emailCompany(item.email)"><ion-icon name="mail"></ion-icon></button>\n\n\n\n      </ion-col>\n\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center" style="height: 56px">\n\n        <button ion-button clear color="white"><ion-icon name="globe"></ion-icon></button>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row [hidden]="dark">\n\n      <ion-col col-12 padding-horizontal class="uk-text-center uk-flex uk-flex-middle uk-flex-center" style="height: 56px">\n\n        <span ion-text color="primary">{{business.adresse}} {{business.repere}}</span>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\pages\company\company.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_companies_companies__["a" /* CompaniesProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], CompanyPage);
    return CompanyPage;
}());

//# sourceMappingURL=company.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(375);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic2_auto_complete__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic2_rating__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_annuaire_annuaire__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_filtre_filtre__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_img_viewer__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_company_description_company_description__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_company_images_company_images__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_company_info_company_info__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_company_category_company_category__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_review_form_review_form__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_login_login__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ionic_tags_input__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_maps_maps__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_email_composer__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_call_number__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_companies_companies__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_compte_compte__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_in_app_browser__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_geolocation__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_map_map__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_annuaire_annuaire__["a" /* AnnuairePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_compte_compte__["a" /* ComptePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_company_description_company_description__["a" /* CompanyDescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_company_images_company_images__["a" /* CompanyImagesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_company_info_company_info__["a" /* CompanyInfoPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_company_category_company_category__["a" /* CompanyCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_review_form_review_form__["a" /* ReviewFormPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                // components
                __WEBPACK_IMPORTED_MODULE_11__components_filtre_filtre__["a" /* FiltreComponent */],
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
                        { loadChildren: '../pages/company/company.module#CompanyPageModule', name: 'CompanyPage', segment: 'company', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/compte/compte.module#ComptePageModule', name: 'ComptePage', segment: 'compte', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/maps/maps.module#MapsPageModule', name: 'MapsPage', segment: 'maps', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/review-form/review-form.module#ReviewFormPageModule', name: 'ReviewFormPage', segment: 'review-form', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8_ionic2_auto_complete__["a" /* AutoCompleteModule */],
                __WEBPACK_IMPORTED_MODULE_9_ionic2_rating__["a" /* Ionic2RatingModule */],
                __WEBPACK_IMPORTED_MODULE_12_ionic_img_viewer__["b" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_19_ionic_tags_input__["a" /* IonTagsInputModule */],
                __WEBPACK_IMPORTED_MODULE_21__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_annuaire_annuaire__["a" /* AnnuairePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_compte_compte__["a" /* ComptePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_company_description_company_description__["a" /* CompanyDescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_company_images_company_images__["a" /* CompanyImagesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_company_info_company_info__["a" /* CompanyInfoPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_company_category_company_category__["a" /* CompanyCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_review_form_review_form__["a" /* ReviewFormPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_24__providers_companies_companies__["a" /* CompaniesProvider */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_28__providers_map_map__["a" /* MapProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_companies_companies__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menu, events, listingService) {
        var _this = this;
        this.menu = menu;
        this.events = events;
        this.listingService = listingService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        this.userconnect = false;
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.events.subscribe('citiesfilter', function (cities) {
            _this.citiesfilter = cities;
        });
        this.events.subscribe('categoriesfilter', function (categories) {
            _this.categoriesfilter = categories;
        });
        if (localStorage.getItem("userId")) {
            this.userconnect = true;
        }
        this.disconnect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        events.subscribe('userconnect', function (user) {
            _this.userconnect = true;
            _this.disconnect.emit(_this.userconnect);
        });
    }
    MyApp.prototype.closedFiltre = function () {
        this.menu.enable(true, 'menu');
    };
    MyApp.prototype.filtre = function () {
        //   console.log("nn0 ");
        var _this = this;
        this.listingService.getListing(this.categoriesfilter, this.citiesfilter).subscribe(function (data) {
            _this.listing = data;
            _this.events.publish('listing', data);
        });
        this.listingService.getMarkers(this.categoriesfilter, this.citiesfilter).subscribe(function (data) {
            _this.listingMap = data;
            _this.events.publish('listingMap', data);
        });
        this.events.publish('citiesfilter', this.citiesfilter);
        this.events.publish('categoriesfilter', this.categoriesfilter);
        this.menu.toggle();
        this.closedFiltre();
        this.events.publish('clearFilter', false);
    };
    MyApp.prototype.clearfilter = function () {
        this.citiesfilter = [];
        this.categoriesfilter = [];
        this.filtre();
        this.events.publish('clearFilter', true);
    };
    MyApp.prototype.logout = function () {
        localStorage.clear();
        this.userconnect = false;
        this.disconnect.emit(this.userconnect);
        this.events.publish('userconnect', false);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], MyApp.prototype, "userconnect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
    ], MyApp.prototype, "disconnect", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\app\app.html"*/'\n\n<ion-menu [content]="content" side="left" id="menu">\n\n  <ion-header class="uk-box-shadow-medium">\n\n    <div class="uk-position-relative uk-height-small">\n\n      <div class="uk-position-center uk-padding-small">\n\n        <img src="assets/imgs/logoici.png" alt="" width="40" margin>\n\n      </div>\n\n      <ion-title class="uk-position-bottom-center uk-padding-small">Connectez-vous</ion-title>\n\n    </div>\n\n  </ion-header>\n\n\n\n  <ion-content id="menuLeft">\n\n    <ion-list no-margin>\n\n      <button ion-item>\n\n        Accueil\n\n      </button>\n\n      <button ion-item >\n\n        Annuaire\n\n      </button>\n\n      <button ion-item >\n\n        Maps\n\n      </button>\n\n    </ion-list>\n\n    <ion-item-group>\n\n      <ion-item-divider color="light">Mon Compte</ion-item-divider>\n\n      <button ion-item *ngIf="userconnect==false">\n\n        Connexion\n\n      </button>   \n\n       <button ion-item *ngIf="userconnect==true">\n\n        Mes Entreprises\n\n      </button>\n\n      <button ion-item >\n\n        Ajouter une entreprise\n\n      </button>\n\n       <button ion-item *ngIf="userconnect==true" (click)="logout()">\n\n        Déconnexion\n\n      </button>\n\n    </ion-item-group>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<ion-menu [content]="content" side="right" id="filtre" swipeEnabled="false" (ionClose)="closedFiltre()">\n\n  <ion-header class="uk-box-shadow-medium">\n\n    <div class="uk-position-relative uk-height-small">\n\n      <ion-title class="uk-position-center"><ion-icon name="funnel" icon-left></ion-icon> Filtre</ion-title>\n\n    </div>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <filtre></filtre>\n\n  </ion-content>\n\n\n\n  <ion-footer>\n\n    <div padding>\n\n      <button ion-button color="success" small (click)="filtre()"> Valider </button>\n\n      <button ion-button color="light" small (click)="clearfilter()"> Effacer </button>\n\n    </div>\n\n  </ion-footer>\n\n\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_companies_companies__["a" /* CompaniesProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompaniesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(117);
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
var CompaniesProvider = /** @class */ (function () {
    function CompaniesProvider(http) {
        this.http = http;
        this.labelAttribute = "name";
        this.perpage = 20;
        this.data = null;
        this.count = 0;
        this.category = null;
    }
    CompaniesProvider.prototype.getMarkers = function (category, city) {
        if (category === void 0) { category = []; }
        if (city === void 0) { city = []; }
        return this.http.get('http://yoomeeonl.webfactional.com/mobileApp/allCompaniesForMap?category=' + category + '&city=' + city)
            .map(function (res) {
            return res.json();
        });
        //.map((res) => res.json());
    };
    CompaniesProvider.prototype.getListing = function (category, city, start) {
        if (category === void 0) { category = []; }
        if (city === void 0) { city = []; }
        if (start === void 0) { start = 0; }
        // return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchmobile?limit='+this.perpage+'&start='+start)
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchmobile?category=' + category + '&city=' + city + '&limit=' + this.perpage + '&start=' + start)
            .map(function (result) {
            //  console.log(result.json())
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
            // console.log(result.json())
            return result.json();
            //  .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
    };
    CompaniesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], CompaniesProvider);
    return CompaniesProvider;
}());

//# sourceMappingURL=companies.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__ = __webpack_require__(45);
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
var FiltreComponent = /** @class */ (function () {
    function FiltreComponent(listingService, events) {
        var _this = this;
        this.listingService = listingService;
        this.events = events;
        this.shownGroup = null;
        this.ville = true;
        this.clear = false;
        this.itenSelect = [];
        this.loadCategory();
        this.getCities();
        this.events.subscribe('clearFilter', function (clear) {
            if (clear === true) {
                _this.itenSelect = [];
                _this.city = [];
                var elems = document.getElementsByClassName('item-block');
                [].forEach.call(elems, function (el) {
                    el.classList.remove("hover");
                });
            }
        });
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
        // event.target.parentElement.parentElement.classList.toggle('hover');
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('clear'),
        __metadata("design:type", Boolean)
    ], FiltreComponent.prototype, "clear", void 0);
    FiltreComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'filtre',template:/*ion-inline-start:"D:\lab\icicmapp\ici.v1\src\components\filtre\filtre.html"*/'<!-- Generated template for the FilterComponent component -->\n\n\n\n\n\n      <div class="uk-padding-small" [hidden]="!ville">\n\n\n\n        <ion-item no-margin no-padding>\n\n          <ion-label stacked>Par ville</ion-label>\n\n          <ion-select [(ngModel)]="city" interface="action-sheet" multiple="true" (ionChange)="onTypeSelected($event)">\n\n            <ion-option  *ngFor="let item of cities">{{item.name}}</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n      </div>\n\n      <ion-label padding-left [hidden]="!ville">Par catégorie</ion-label>\n\n\n\n      <ion-list *ngFor="let item of cat">\n\n        <ion-list-header color="primary" (click)="toggleGroup(item.id)">\n\n          {{item.name}}\n\n          <ion-icon name="add" color="light" class="uk-position-center-right" padding-right *ngIf="!isGroupShown(item.id)"></ion-icon>\n\n          <ion-icon name="close" color="light" class="uk-position-center-right" padding-right *ngIf="isGroupShown(item.id)"></ion-icon>\n\n\n\n        </ion-list-header>\n\n        <ion-list no-padding no-margin [hidden]="!isGroupShown(item.id)" *ngFor="let it of item.subcat">\n\n          <ion-item (click)="itemAdd(it._id.$id, $event)" >{{it.name}}</ion-item>\n\n\n\n        </ion-list>\n\n      </ion-list>\n\n\n\n\n\n<div class="uk-padding-small" [hidden]="!ville">\n\n  <ion-item no-margin no-padding>\n\n    <ion-label stacked>Par ville</ion-label>\n\n    <ion-select [(ngModel)]="city" interface="action-sheet" multiple="true" (ionChange)="onTypeSelected($event)">\n\n      <ion-option  *ngFor="let item of cities">{{item.name}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n</div>\n\n<ion-label padding-left [hidden]="!ville">Par catégorie</ion-label>\n\n\n\n<ion-list *ngFor="let item of cat">\n\n  <ion-list-header color="primary" (click)="toggleGroup(item.id)">\n\n    {{item.name}}\n\n    <ion-icon name="add" color="light" class="uk-position-center-right" padding-right *ngIf="!isGroupShown(item.id)"></ion-icon>\n\n    <ion-icon name="close" color="light" class="uk-position-center-right" padding-right *ngIf="isGroupShown(item.id)"></ion-icon>\n\n\n\n  </ion-list-header>\n\n  <ion-list no-padding no-margin [hidden]="!isGroupShown(item.id)" *ngFor="let it of item.subcat">\n\n    <ion-item (tap)="itemAdd(it._id.$id, $event)"> {{it.name}}\n\n      <ion-icon item-end name="checkmark" small class="icon-check" color="primary"></ion-icon>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-list>\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"D:\lab\icicmapp\ici.v1\src\components\filtre\filtre.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__["a" /* CompaniesProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Events */]])
    ], FiltreComponent);
    return FiltreComponent;
}());

//# sourceMappingURL=filtre.js.map

/***/ })

},[370]);
//# sourceMappingURL=main.js.map