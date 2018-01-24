webpackJsonp([7],{

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnuairePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_variable_variable__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__company_company__ = __webpack_require__(79);
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
    function AnnuairePage(navCtrl, loadingCtrl, emailComposer, navParams, menu, listingService, callNumber, modalCtrl, variable, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailComposer = emailComposer;
        this.navParams = navParams;
        this.menu = menu;
        this.listingService = listingService;
        this.callNumber = callNumber;
        this.modalCtrl = modalCtrl;
        this.variable = variable;
        this.events = events;
        this.listing = [];
        this.cities = [];
        this.categories = [];
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
        events.subscribe('reloadAnnuaire', function (cities, categories, keyword) {
            _this.cities = cities;
            _this.categories = categories;
            _this.keyword = keyword;
            if (_this.variable.getInitTabAnnuaire() === false) {
                _this.loading = true;
                _this.listingService.getListing(_this.categories, _this.cities, _this.keyword).subscribe(function (data) {
                    if (data.length !== 0) {
                        _this.listing = data;
                        _this.showNoItem = false;
                    }
                    else {
                        _this.showNoItem = true;
                    }
                    _this.loading = false;
                });
            }
        });
        events.subscribe('listing', function () {
            _this.loading = true;
            _this.listingService.getListing(_this.categories, _this.cities, _this.keyword).subscribe(function (data) {
                if (data.length !== 0) {
                    _this.listing = data;
                    _this.showNoItem = false;
                }
                else {
                    _this.showNoItem = true;
                }
                _this.loading = false;
            });
            // this.loading = true;
            // if(listing.length !== 0){
            //   this.listing=listing;
            //   this.showNoItem = false;
            // }else{
            //   this.showNoItem = true;
            // }
            // this.loading = false;
        });
        if (this.variable.getInitTabAnnuaire() === true) {
            this.loadData();
        }
        this.events.subscribe('citiesfilter', function (cities) {
            _this.cities = cities;
        });
        this.events.subscribe('categoriesfilter', function (categories) {
            _this.categories = categories;
        });
        this.events.subscribe('searchfilter', function (search) {
            _this.keyword = search;
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__company_company__["a" /* CompanyPage */], {
            idcompagnie: id
        });
    };
    AnnuairePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.start = this.start + 1;
        setTimeout(function () {
            _this.listingService.getListing(_this.categories, _this.cities, _this.keyword, _this.start * _this.perpage)
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
        this.loading = true;
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
            selector: 'page-annuaire',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/annuaire/annuaire.html"*/'<!--\n  Generated template for the AnnuairePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar padding-horizontal>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n        <ion-icon name="menu" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openMenu(\'left\')">\n        <ion-icon name="search" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class="uk-height-small uk-flex uk-flex-middle uk-flex-center uk-margin-large-top" *ngIf="loading">\n    <div class="uk-text-center">\n      <span class="uk-display-block uk-margin-medium-bottom">Chargement ....</span>\n      <div uk-spinner></div>\n    </div>\n  </div>\n  <div *ngIf="!loading">\n    <div *ngIf="!showNoItem">\n      <ion-list no-margin>\n        <ion-card *ngFor="let liste of listing " no-margin style="width: 100% !important;">\n          <ion-card-content>\n            <ion-grid class="uk-padding-remove-right">\n              <ion-row class="uk-padding-remove-right">\n                <ion-col col-9 no-padding>\n                  <ion-item class="item-compagny">\n                    <ion-thumbnail item-start>\n                      <img  *ngIf="liste.imageune==null"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg" class="uk-responsive-height uk-border-circle" imageViewer>\n                      <img  *ngIf="liste.imageune!=null"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/{{liste.imageune}}" class="uk-responsive-height uk-border-circle" imageViewer>\n                    </ion-thumbnail>\n\n\n                    <div (click)="openDetail(liste._id.$id)" tappable>\n                      <h3 class="uk-text-truncate uk-margin-remove">{{liste.name}}</h3>\n                      <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted">{{liste.ville}} {{liste.quartier}}</div>\n                      <ion-badge class="uk-margin-remove-left uk-margin-remove-right">{{liste.maincategorie}}</ion-badge>\n                    </div>\n\n\n                  </ion-item>\n                  <!--  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-success uk-text-small"> <ion-icon name="checkmark-circle"></ion-icon> Entreprise validé</div>\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-danger uk-text-small"> <ion-icon name="close"></ion-icon> Validation en cours</div> -->\n                </ion-col>\n                <ion-col col-3 no-padding>\n                  <div tappable (click)="openDetail(liste._id.$id)">\n                    <rating  [(ngModel)]="liste.ratecount"\n                             readOnly="true"\n                             max="5"\n                             emptyStarIconName="star-outline"\n                             halfStarIconName="star-half"\n                             starIconName="star"\n                             nullable="false"\n                             (ngModelChange)="onModelChange($event, liste._id.$id)"></rating>\n                    <div class="uk-text-right uk-h4 uk-margin-remove" >{{liste.reviewcount}} avis</div>\n                  </div>\n                  <!-- div class="uk-flex uk-flex-right uk-favoris">\n                    <ion-icon name="heart-outline" ion-text clear class="uk-text-right" color="primary"></ion-icon>\n                  </div -->\n\n\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-content>\n        </ion-card>\n        <ion-card no-margin style="width: 100% !important;" padding-top>\n          <ion-infinite-scroll (ionInfinite)="doInfinite($event)" > <!--*ngIf="page < totalPage"-->\n            <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data..."></ion-infinite-scroll-content>\n          </ion-infinite-scroll>\n        </ion-card>\n      </ion-list>\n    </div>\n    <div *ngIf="showNoItem">\n      <div class="uk-height-small uk-flex uk-flex-middle uk-flex-center uk-NoItem uk-margin-large-top">\n        <div class="uk-text-center uk-padding-large">\n          <ion-icon name="funnel" class="uk-margin-auto"></ion-icon>\n          <div ion-text color="dark" class="uk-margin-medium-top uk-h2">\n            Changer les paramètres de votre filtre pour obtenir plus d\'entreprise\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/annuaire/annuaire.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__providers_variable_variable__["a" /* VariableProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */]])
    ], AnnuairePage);
    return AnnuairePage;
}());

//# sourceMappingURL=annuaire.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginForgetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
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
 * Generated class for the LoginForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginForgetPage = (function () {
    function LoginForgetPage(navCtrl, navParams, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.validations_form = this.formBuilder.group({
            login: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });
        this.validation_messages = {
            'login': [
                { type: 'required', message: 'Adresse Email obligatoire.' },
                { type: 'pattern', message: 'Format adresse email invalid' }
            ]
        };
    }
    LoginForgetPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginForgetPage');
    };
    LoginForgetPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login-forget',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/login-forget/login-forget.html"*/'<!--\n  Generated template for the LoginForgetPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Mot de passe oublié</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="uk-padding uk-height-1-1">\n    <div class="uk-width-1-1">\n      <img src="assets/imgs/logoici.png" alt="" height="50" class="uk-display-block uk-margin-auto uk-margin-bottom">\n      <form class="form" [formGroup]="validations_form">\n\n        <ion-item no-padding>\n          <ion-label floating color="primary">Adresse Email</ion-label>\n          <ion-input type="email" formControlName="login"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.login">\n            <div class="error-message uk-text-danger" *ngIf="validations_form.get(\'login\').hasError(validation.type) && (validations_form.get(\'login\').dirty || validations_form.get(\'login\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n\n\n        <button ion-button full type="submit" [disabled]="!validations_form.valid" class="uk-margin-medium-top">Envoyez</button>\n      </form>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/login-forget/login-forget.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], LoginForgetPage);
    return LoginForgetPage;
}());

//# sourceMappingURL=login-forget.js.map

/***/ }),

/***/ 163:
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
        this.description = this.navParams.get("description");
        this.name = this.navParams.get('name');
    }
    CompanyDescriptionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CompanyDescriptionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company-description',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-description/company-description.html"*/'<!--\n  Generated template for the CompanyDescriptionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button color="primary" icon-only small (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title class="uk-title-color-red">Description : {{name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div [textContent]="description"></div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company-description/company-description.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["A" /* ViewController */]])
    ], CompanyDescriptionPage);
    return CompanyDescriptionPage;
}());

//# sourceMappingURL=company-description.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_variable_variable__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__company_company__ = __webpack_require__(79);
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
    // @Output() refresh: EventEmitter<object>;
    function MapsPage(navCtrl, navParams, menu, listingService, toastCtrl, platform, emailComposer, callNumber, variable, ngzone, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.listingService = listingService;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.emailComposer = emailComposer;
        this.callNumber = callNumber;
        this.variable = variable;
        this.ngzone = ngzone;
        this.events = events;
        this.cities = [];
        this.categories = [];
        this.listing = [];
        // public listMarker = new Array();
        this.newMarkers = [];
        // public currentMaker: any;
        this.element = {};
        menu.enable(true);
        // this.refresh = new EventEmitter<object>();
        this.events.subscribe('citiesfilter', function (cities) {
            _this.cities = cities;
        });
        this.events.subscribe('categoriesfilter', function (categories) {
            _this.categories = categories;
        });
        this.events.subscribe('searchfilter', function (keyword) {
            _this.keyword = keyword;
        });
        events.subscribe('listingMap', function () {
            _this.newMarkers = [];
            _this.platform.ready().then(function () { _this.loadMaps(); });
        });
        events.subscribe('reloadMaps', function (cities, categories, keyword) {
            _this.categories = categories;
            _this.cities = cities;
            _this.keyword = keyword;
            if (_this.variable.getInitTabMaps() === false) {
                _this.newMarkers = [];
                _this.platform.ready().then(function () { return _this.loadMaps(); });
            }
        });
        if (this.variable.getInitTabMaps() === true) {
            this.newMarkers = [];
            this.platform.ready().then(function () { return _this.loadMaps(); });
        }
    }
    MapsPage.prototype.ionViewDidLoad = function () {
    };
    MapsPage.prototype.openDetail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__company_company__["a" /* CompanyPage */], {
            idcompagnie: id
        });
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
            styles: [{
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#c6c6c6" }]
                }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{ "visibility": "off" }]
                }, {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{ "visibility": "simplified" }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{ "color": "#ffffff" }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{ "visibility": "off" }]
                }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{ "color": "#dde6e8" }, { "visibility": "on" }]
                }],
            disableDoubleClickZoom: false,
            disableDefaultUI: true,
            zoomControl: true,
            scaleControl: true,
        });
    };
    MapsPage.prototype.placeMarkers = function (markers) {
        for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
            var point = markers_1[_i];
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
        google.maps.event.addListener(marker, 'click', function () {
            _this.ngzone.run(function () {
                _this.openDetail(i._id.$id);
            });
        });
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
        this.listingService.getMarkers(this.categories, this.cities, this.keyword).subscribe(function (data) {
            _this.placeMarkers(data);
            _this.placeCluster();
        });
    };
    MapsPage.prototype.closedModal = function () {
        document.getElementById('map').style.height = '100%';
        document.getElementById('details').classList.add('uk-hidden');
        this.element = {};
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
    MapsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-maps',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/maps/maps.html"*/'<!--\n  Generated template for the MapsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar padding-horizontal>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n        <ion-icon name="menu" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openMenu(\'left\')">\n        <ion-icon name="search" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="uk-position-relative">\n\n  <div #map id="map"></div>\n\n  <ion-fab bottom center >\n    <button ion-fab ><ion-icon name="locate"></ion-icon></button>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/maps/maps.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_5__providers_variable_variable__["a" /* VariableProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */]])
    ], MapsPage);
    return MapsPage;
}());

//# sourceMappingURL=maps.js.map

/***/ }),

/***/ 177:
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
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/annuaire/annuaire.module": [
		717,
		6
	],
	"../pages/company-description/company-description.module": [
		719,
		5
	],
	"../pages/inscription/inscription.module": [
		721,
		4
	],
	"../pages/login-forget/login-forget.module": [
		718,
		3
	],
	"../pages/login/login.module": [
		720,
		2
	],
	"../pages/maps/maps.module": [
		722,
		1
	],
	"../pages/review-form/review-form.module": [
		723,
		0
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
webpackAsyncContext.id = 221;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import {AuthHttp} from 'angular2-jwt';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider(http) {
        this.http = http;
        console.log('Hello AuthProvider Provider');
    }
    AuthProvider.prototype.getUser = function (user_login, user_password) {
        var body = "email=" + user_login + "&password=" + user_password;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post('http://yoomeeonl.webfactional.com/MobileApp/login', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthProvider.prototype.getSecuredData = function () {
        var jwt = localStorage.getItem('id_token');
        var authHeader = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        if (jwt) {
            authHeader.append('Authorization', jwt);
        }
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: authHeader });
        return this.http.get('', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Extracting data.
     *
     * @param res
     * @returns {any|{}}
     */
    AuthProvider.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /**
     * Handling errors.
     *
     * @param error
     * @returns {ErrorObservable}
     */
    AuthProvider.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(errMsg);
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__annuaire_annuaire__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__maps_maps__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_variable_variable__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_companies_companies__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__inscription_inscription__ = __webpack_require__(94);
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
    function TabsPage(navCtrl, menu, events, variable, listingService, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.events = events;
        this.variable = variable;
        this.listingService = listingService;
        this.modalCtrl = modalCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__annuaire_annuaire__["a" /* AnnuairePage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__maps_maps__["a" /* MapsPage */];
        this.userconnect = false;
        this.pages = [
            { title: 'Accueil', component: __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */], index: 0 },
            { title: 'Annuaires', component: __WEBPACK_IMPORTED_MODULE_3__annuaire_annuaire__["a" /* AnnuairePage */], index: 1 },
            { title: 'Maps', component: __WEBPACK_IMPORTED_MODULE_4__maps_maps__["a" /* MapsPage */], index: 2 }
        ];
        this.events.subscribe('citiesfilter', function (cities) {
            _this.citiesfilter = cities;
        });
        this.events.subscribe('categoriesfilter', function (categories) {
            _this.categoriesfilter = categories;
        });
        this.events.subscribe('searchfilter', function (search) {
            _this.searchfilter = search;
        });
        if (localStorage.getItem("userId")) {
            this.userconnect = true;
        }
        this.disconnect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        events.subscribe('userconnect', function (user) {
            _this.userconnect = user;
            _this.disconnect.emit(_this.userconnect);
        });
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe('citiesfilter', function (cities) {
            _this.cities = cities;
        });
        this.events.subscribe('categoriesfilter', function (categories) {
            _this.categories = categories;
        });
        this.events.subscribe('searchfilter', function (search) {
            _this.searchfilter = search;
        });
    };
    TabsPage.prototype.menuToggle = function (e) {
        this.menu.enable(true, 'menu');
        if (e.index === 2) {
            this.events.publish('reloadMaps', this.cities, this.categories, this.searchfilter);
        }
        if (e.index === 1) {
            this.events.publish('reloadAnnuaire', this.cities, this.categories, this.searchfilter);
        }
    };
    TabsPage.prototype.closedFiltre = function () {
        this.menu.enable(true, 'menu');
    };
    TabsPage.prototype.filtre = function () {
        //   console.log("nn0 ");
        /*this.listingService.getListing(this.categoriesfilter, this.citiesfilter, this.searchfilter).subscribe(
          data => {
            this.events.publish('listing', data)
          }
        );*/
        this.events.publish('listing', this.categoriesfilter, this.citiesfilter, this.searchfilter);
        this.events.publish('listingMap', this.categoriesfilter, this.citiesfilter, this.searchfilter);
        /*this.listingService.getMarkers(this.categoriesfilter, this.citiesfilter, this.searchfilter).subscribe(
          data => {
            this.events.publish('listingMap', data)
          }
        );*/
        this.events.publish('citiesfilter', this.citiesfilter);
        this.events.publish('categoriesfilter', this.categoriesfilter);
        this.events.publish('searchfilter', this.searchfilter);
        if (this.citiesfilter || this.categoriesfilter || this.searchfilter) {
            this.variable.setInitTabMaps(false);
        }
        else {
            this.variable.setInitTabMaps(true);
        }
        if (this.citiesfilter || this.categoriesfilter || this.searchfilter) {
            this.variable.setInitTabAnnuaire(false);
        }
        else {
            this.variable.setInitTabAnnuaire(true);
        }
        this.menu.toggle();
        this.closedFiltre();
        this.events.publish('clearFilter', false);
    };
    TabsPage.prototype.clearfilter = function () {
        this.citiesfilter = [];
        this.categoriesfilter = [];
        this.filtre();
        this.events.publish('clearFilter', true);
    };
    TabsPage.prototype.logout = function () {
        localStorage.clear();
        this.userconnect = false;
        this.disconnect.emit(this.userconnect);
        this.events.publish('userconnect', false);
        this.menu.toggle();
    };
    TabsPage.prototype.login = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
        modal.present();
        this.menu.toggle();
    };
    TabsPage.prototype.inscription = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__inscription_inscription__["a" /* InscriptionPage */], { showDismiss: true });
        modal.present();
        this.menu.toggle();
    };
    TabsPage.prototype.openTab = function (page) {
        this.tabRef.select(page.index);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* Tabs */])
    ], TabsPage.prototype, "tabRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], TabsPage.prototype, "userconnect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
    ], TabsPage.prototype, "disconnect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* Nav */])
    ], TabsPage.prototype, "nav", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/tabs/tabs.html"*/'\n<ion-menu [content]="content" side="left" id="menu">\n  <ion-header class="uk-box-shadow-medium">\n    <div class="uk-position-relative uk-height-small">\n      <div class="uk-position-center uk-padding-small">\n        <img src="assets/imgs/logoici.png" alt="" width="40" margin>\n      </div>\n      <ion-title class="uk-position-bottom-center uk-padding-small">Connectez-vous</ion-title>\n    </div>\n  </ion-header>\n\n  <ion-content id="menuLeft">\n    <ion-list no-margin>\n      <button ion-item *ngFor="let p of pages" (click)="openTab(p)" menuClose>\n        {{ p.title }}\n      </button>\n    </ion-list>\n    <ion-item-group>\n      <ion-item-divider color="primary">Mon Compte</ion-item-divider>\n      <button ion-item *ngIf="userconnect==false" (click)="login()">\n        Connexion\n      </button>\n      <button ion-item *ngIf="userconnect==false" (click)="inscription()">\n        Inscription\n      </button>\n      <button ion-item *ngIf="userconnect==true">\n        Mes Commentaires\n      </button>\n      <button ion-item *ngIf="userconnect==true">\n        Mes Messages\n      </button>\n      <button ion-item *ngIf="userconnect==true">\n        Mes Favoris\n      </button>\n      <button ion-item *ngIf="userconnect==true" (click)="logout()">\n        Déconnexion\n      </button>\n    </ion-item-group>\n  </ion-content>\n\n</ion-menu>\n\n<ion-menu [content]="content" side="right" id="filtre" swipeEnabled="false" (ionClose)="closedFiltre()">\n  <ion-header class="uk-box-shadow-medium">\n    <div class="uk-position-relative uk-height-small">\n      <ion-title class="uk-position-center"><ion-icon name="search" icon-left></ion-icon> Recherche</ion-title>\n    </div>\n  </ion-header>\n\n  <ion-content>\n    <filtre></filtre>\n  </ion-content>\n\n  <ion-footer>\n    <div padding>\n      <button ion-button color="success" small (click)="filtre()"> Valider </button>\n      <button ion-button color="light" small (click)="clearfilter()"> Effacer </button>\n    </div>\n  </ion-footer>\n\n</ion-menu>\n\n<ion-tabs tabsHighlight="true" selectedIndex="0" tabsPlacement="bottom" (ionChange)="menuToggle($event)" #content swipeBackEnabled="false" #myTabs>\n  <ion-tab [root]="tab1Root" tabIcon="home" tabTitle="Accueil" ></ion-tab>\n  <ion-tab [root]="tab2Root" tabIcon="list" tabTitle="Annuaire"></ion-tab>\n  <ion-tab [root]="tab3Root" tabIcon="map" tabTitle="Carte"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_variable_variable__["a" /* VariableProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_companies_companies__["a" /* CompaniesProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* ModalController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_company__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_companies_companies__ = __webpack_require__(40);
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
    function HomePage(navCtrl, menu, companyprovider) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.companyprovider = companyprovider;
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
    HomePage.prototype.search = function () {
        var _this = this;
        this.navCtrl.push('ListingPage');
        var query = this.keyword;
        this.companyprovider.getResults(query).subscribe(function (data) { return _this.listing = data; });
        console.log("test  " + this.keyword);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/home/home.html"*/'<ion-header>\n  <ion-toolbar padding-horizontal>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n        <ion-icon name="menu" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only>\n        <ion-icon name="pin" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <div class="uk-height-medium uk-background-cover uk-position-relative uk-flex uk-flex-center uk-flex-middle" style="background-image: url(\'assets/imgs/back.jpg\');">\n    <div class="uk-position-cover cover"></div>\n    <div class="uk-content-cover">\n      <div class="uk-h2 uk-margin-large-bottom">Bienvenue sur ICI.CM</div>\n      <div>\n      <ng-template #withFlags let-attrs="attrs">\n              <span [innerHTML]="attrs.data.name | boldprefix:attrs.keyword"></span>\n      </ng-template>\n      <ion-auto-complete [dataProvider]="companyprovider" [options]="{ placeholder : \'Rechercher un lieu\' }"  [(ngModel)]="keyword"></ion-auto-complete>\n      </div>    \n    </div>\n  </div>\n\n  <div class="uk-card uk-card-default">\n    <div class="uk-card-header uk-text-left uk-padding-small uk-position-relative">\n      <h6 class="uk-margin-remove">Nouveaux lieux</h6>\n\n    </div>\n    <div class="uk-card-body uk-padding-remove">\n      <ion-slides slidesPerView=1.5 autoplay="5000" loop="false" speed="1000" >\n        <ion-slide>\n          <ion-card>\n            <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg"/>\n            <ion-card-content class="uk-position-relative">\n              <ion-badge item-end class="uk-margin-small">Catégorie Catégorie Catégorie</ion-badge>\n              <h2 class="uk-text-truncate uk-margin-remove" (click)="OpenDetail()">Nom de l\'entreprise</h2>\n              <small>Ville</small>\n              <div class="uk-position-bottom-right uk-padding-small">\n                <rating  [(ngModel)]="rate"\n                         readOnly="true"\n                         max="5"\n                         emptyStarIconName="star-outline"\n                         halfStarIconName="star-half"\n                         starIconName="star"\n                         nullable="false" ></rating>\n\n              </div>\n            </ion-card-content>\n          </ion-card>\n        </ion-slide>\n        <ion-slide>\n          <ion-card>\n            <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg"/>\n            <ion-card-content class="uk-position-relative">\n              <ion-badge item-end class="uk-margin-small">Catégorie Catégorie Catégorie</ion-badge>\n              <h2 class="uk-text-truncate uk-margin-remove">Nom de l\'entreprise</h2>\n              <small>Ville</small>\n              <div class="uk-position-bottom-right uk-padding-small">\n                <rating  [(ngModel)]="rate"\n                         readOnly="true"\n                         max="5"\n                         emptyStarIconName="star-outline"\n                         halfStarIconName="star-half"\n                         starIconName="star"\n                         nullable="false" ></rating>\n\n              </div>\n            </ion-card-content>\n          </ion-card>\n        </ion-slide>\n      </ion-slides>\n    </div>\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__providers_companies_companies__["a" /* CompaniesProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(372);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic2_auto_complete__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic2_rating__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_annuaire_annuaire__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_filtre_filtre__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_img_viewer__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_review_form_review_form__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_file_transfer__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_path__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_camera__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ionic_tags_input__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_maps_maps__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_email_composer__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_call_number__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_companies_companies__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_in_app_browser__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_geolocation__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_map_map__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_storage__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_auth_auth__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_variable_variable__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_maps_maps__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_login_forget_login_forget__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_inscription_inscription__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_company_company__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_company_description_company_description__ = __webpack_require__(163);
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
                __WEBPACK_IMPORTED_MODULE_10__pages_annuaire_annuaire__["a" /* AnnuairePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_company_company__["a" /* CompanyPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_company_description_company_description__["a" /* CompanyDescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_review_form_review_form__["a" /* ReviewFormPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_inscription_inscription__["a" /* InscriptionPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_login_forget_login_forget__["a" /* LoginForgetPage */],
                // components
                __WEBPACK_IMPORTED_MODULE_31__components_maps_maps__["a" /* MapsComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_filtre_filtre__["a" /* FiltreComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], { tabsHideOnSubPages: 'true' }, {
                    links: [
                        { loadChildren: '../pages/annuaire/annuaire.module#AnnuairePageModule', name: 'AnnuairePage', segment: 'annuaire', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login-forget/login-forget.module#LoginForgetPageModule', name: 'LoginForgetPage', segment: 'login-forget', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company-description/company-description.module#CompanyDescriptionPageModule', name: 'CompanyDescriptionPage', segment: 'company-description', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/inscription/inscription.module#InscriptionPageModule', name: 'InscriptionPage', segment: 'inscription', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/maps/maps.module#MapsPageModule', name: 'MapsPage', segment: 'maps', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/review-form/review-form.module#ReviewFormPageModule', name: 'ReviewFormPage', segment: 'review-form', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8_ionic2_auto_complete__["a" /* AutoCompleteModule */],
                __WEBPACK_IMPORTED_MODULE_9_ionic2_rating__["a" /* Ionic2RatingModule */],
                __WEBPACK_IMPORTED_MODULE_12_ionic_img_viewer__["a" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_19_ionic_tags_input__["a" /* IonTagsInputModule */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_21__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_annuaire_annuaire__["a" /* AnnuairePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_company_company__["a" /* CompanyPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_company_description_company_description__["a" /* CompanyDescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_review_form_review_form__["a" /* ReviewFormPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_inscription_inscription__["a" /* InscriptionPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_login_forget_login_forget__["a" /* LoginForgetPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_24__providers_companies_companies__["a" /* CompaniesProvider */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_27__providers_map_map__["a" /* MapProvider */],
                __WEBPACK_IMPORTED_MODULE_30__providers_variable_variable__["a" /* VariableProvider */],
                __WEBPACK_IMPORTED_MODULE_29__providers_auth_auth__["a" /* AuthProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompaniesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
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
    CompaniesProvider.prototype.getMarkers = function (category, city, keyword) {
        if (category === void 0) { category = []; }
        if (city === void 0) { city = []; }
        if (keyword === void 0) { keyword = ""; }
        return this.http.get('http://yoomeeonl.webfactional.com/mobileApp/allCompaniesForMap?query=' + keyword + '&category=' + category + '&city=' + city)
            .map(function (res) {
            return res.json();
        });
        //.map((res) => res.json());
    };
    CompaniesProvider.prototype.getListing = function (category, city, keyword, start) {
        if (category === void 0) { category = []; }
        if (city === void 0) { city = []; }
        if (keyword === void 0) { keyword = ""; }
        if (start === void 0) { start = 0; }
        // return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchmobile?limit='+this.perpage+'&start='+start)
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchmobile?query=' + keyword + '&category=' + category + '&city=' + city + '&limit=' + this.perpage + '&start=' + start)
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

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VariableProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import { HttpClient } from '@angular/common/http';

/*
  Generated class for the VariableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var VariableProvider = (function () {
    function VariableProvider() {
        this.InitTabMaps = true;
        this.InitTabAnnuaire = true;
        this.EMAIL_REGEX = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    }
    VariableProvider.prototype.setInitTabMaps = function (data) {
        this.InitTabMaps = data;
    };
    VariableProvider.prototype.getInitTabMaps = function () {
        return this.InitTabMaps;
    };
    VariableProvider.prototype.setInitTabAnnuaire = function (data) {
        this.InitTabAnnuaire = data;
    };
    VariableProvider.prototype.getInitTabAnnuaire = function () {
        return this.InitTabAnnuaire;
    };
    VariableProvider.prototype.getEmailRegexValidator = function () {
        return this.EMAIL_REGEX;
    };
    VariableProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], VariableProvider);
    return VariableProvider;
}());

//# sourceMappingURL=variable.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_companies_companies__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_variable_variable__ = __webpack_require__(48);
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
    function MyApp(platform, statusBar, splashScreen, menu, events, listingService, variable, modalCtrl) {
        this.menu = menu;
        this.events = events;
        this.listingService = listingService;
        this.variable = variable;
        this.modalCtrl = modalCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/app/app.html"*/'\n\n<ion-nav [root]="rootPage" ></ion-nav>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_companies_companies__["a" /* CompaniesProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_variable_variable__["a" /* VariableProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ModalController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__ = __webpack_require__(40);
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
        var _this = this;
        this.listingService = listingService;
        this.events = events;
        this.shownGroup = null;
        this.ville = true;
        this.categoriesselect = [];
        this.clear = false;
        this.itenSelect = [];
        this.itenSelect2 = [];
        this.loadCategory();
        this.getCities();
        this.events.subscribe('clearFilter', function (clear) {
            if (clear === true) {
                _this.itenSelect = [];
                _this.city = [];
                // this.keyword = "";
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
    FiltreComponent.prototype.itemAdd = function (i, event, nam) {
        var index = this.itenSelect.indexOf(i);
        var index2 = this.itenSelect2.indexOf(nam);
        console.log("nam " + nam);
        console.log("j " + i);
        //console.log("nam "+event);
        //var el={"name":name, "id":i};
        if (index > -1) {
            this.itenSelect.splice(index, 1);
            this.itenSelect2.splice(index2, 1);
        }
        else {
            this.itenSelect.push(i);
            this.itenSelect2.push(nam);
        }
        this.events.publish('categoriesfilter', this.itenSelect);
        this.events.publish('selectcategoriesid', this.itenSelect, this.itenSelect2);
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
    FiltreComponent.prototype.keyUpSearch = function (e) {
        //console.log("e");
        //console.log(e.target.value);
        this.events.publish('searchfilter', e.target.value);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('showVille'),
        __metadata("design:type", Boolean)
    ], FiltreComponent.prototype, "ville", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], FiltreComponent.prototype, "categoriesselect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('clear'),
        __metadata("design:type", Boolean)
    ], FiltreComponent.prototype, "clear", void 0);
    FiltreComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'filtre',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/components/filtre/filtre.html"*/'<!-- Generated template for the FilterComponent component -->\n<div class="uk-padding-small">\n <ion-item no-margin no-padding>\n	  <ion-label stacked>Mot clé</ion-label>\n	  <ion-input type="text" [(ngModel)]="keyword"  (keyup)="keyUpSearch($event)"></ion-input>\n</ion-item>\n</div>\n<div class="uk-padding-small" [hidden]="!ville">\n  <ion-item no-margin no-padding>\n    <ion-label stacked>Par ville</ion-label>\n    <ion-select [(ngModel)]="city" interface="action-sheet" multiple="true" (ionChange)="onTypeSelected($event)">\n      <ion-option  *ngFor="let item of cities">{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n</div>\n<ion-label padding-left [hidden]="!ville">Par catégorie</ion-label>\n\n<ion-list *ngFor="let item of cat">\n  <ion-list-header color="primary" (click)="toggleGroup(item.id)">\n    {{item.name}}\n    <ion-icon name="add" color="light" class="uk-position-center-right" padding-right *ngIf="!isGroupShown(item.id)"></ion-icon>\n    <ion-icon name="close" color="light" class="uk-position-center-right" padding-right *ngIf="isGroupShown(item.id)"></ion-icon>\n\n  </ion-list-header>\n  <ion-list no-padding no-margin [hidden]="!isGroupShown(item.id)" *ngFor="let it of item.subcat">\n    <ion-item (tap)="itemAdd(it._id.$id, $event,it.name)" id="{{ it._id.$id }}"> {{it.name}}\n      <ion-icon item-end name="checkmark" small class="icon-check" color="primary"></ion-icon>\n    </ion-item>\n  </ion-list>\n</ion-list>\n\n\n\n\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/components/filtre/filtre.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__["a" /* CompaniesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__["a" /* CompaniesProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Events */]) === "function" && _b || Object])
    ], FiltreComponent);
    return FiltreComponent;
    var _a, _b;
}());

//# sourceMappingURL=filtre.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
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
var MapProvider = (function () {
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

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsComponent; });
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
 * Generated class for the MapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MapsComponent = (function () {
    function MapsComponent(navParams) {
        //var business=this.navParams.get("business");
        this.navParams = navParams;
    }
    MapsComponent.prototype.ngAfterViewInit = function () {
        this.name = this.business.name;
        this.latitude = this.business.latitude;
        this.longitude = this.business.longitude;
        this.loadMap();
    };
    MapsComponent.prototype.loadMap = function () {
        var latLng = new google.maps.LatLng(this.latitude, this.longitude);
        var mapOptions = {
            center: latLng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
        };
        var MapEl = this.mapElement.nativeElement;
        this.map = new google.maps.Map(MapEl, mapOptions);
        console.log(this.latitude + " - " + this.longitude);
        var position = new google.maps.LatLng(this.latitude, this.longitude);
        var markerData = {
            position: position,
            map: this.map,
            title: this.name,
        };
        var marker = new google.maps.Marker(markerData);
        marker.setMap(this.map);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], MapsComponent.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], MapsComponent.prototype, "business", void 0);
    MapsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'maps',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/components/maps/maps.html"*/'<!-- Generated template for the MapsComponent component -->\n<div #map id="map"></div>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/components/maps/maps.html"*/
            // template: '<p>Hello, {{test}}!</p>'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavParams */]])
    ], MapsComponent);
    return MapsComponent;
}());

//# sourceMappingURL=maps.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__review_form_review_form__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__company_description_company_description__ = __webpack_require__(163);
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
        events.subscribe('companyInfoupdate', function (data) {
            //alert("ss la");
            var data = JSON.parse(data);
            _this.business = data;
        });
    }
    CompanyPage.prototype.loadData = function (id) {
        var _this = this;
        this.listingService.getCompanyById(id).subscribe(function (data) {
            _this.business = data;
            _this.latitude = data.latitude;
            _this.name = data.name;
            _this.longitude = data.longitude;
            _this.ville = data.ville;
            _this.quartier = data.quartier;
            _this.description = data.description;
            _this.repere = data.repere;
            _this.adresse = data.adresse;
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
    CompanyPage.prototype.onModelChange = function (val, companyId) {
        //alert(this.user);
        if (this.userconnect == true) {
            var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__review_form_review_form__["a" /* ReviewFormPage */], { vote: val, companyId: companyId });
            myModal.present();
        }
        else {
            var myModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */], { type: "review", vote: val, companyId: companyId });
            myModal.present();
        }
    };
    CompanyPage.prototype.openDescriptionEdit = function (descr, name) {
        var descriptionModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__company_description_company_description__["a" /* CompanyDescriptionPage */], { description: descr, name: name });
        descriptionModal.present();
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
    ], CompanyPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], CompanyPage.prototype, "mapElement", void 0);
    CompanyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company-details',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company/company.html"*/'<!--\n  Generated template for the CompanyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header shadow>\n\n  <ion-navbar [class.show-background]="showToolbar">\n    <ion-title [hidden]="!showToolbar" class="uk-text-truncate">{{business.name}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only small>\n        <ion-icon name="heart"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content  class="content"\n              (ionScroll)="onScroll($event)"\n              [class.transition]="transition"\n              [style.background-size]="headerImgSize"\n              [style.backgroundImage]="\'url(http://yoomeeonl.webfactional.com/media/pictures/companies/\'+ business.imageune +\')\'"><!--headerImgUrl-->\n\n  <div class="user-info uk-height-small uk-flex uk-flex-middle uk-flex-center">\n    <h2 class="uk-size" padding-horizontal>{{business.name}}</h2>\n  </div>\n\n  <div class="contents">\n\n    <button ion-button block class="uk-block-button" *ngIf="(business | json) != ({} | json)">Consultez notre vidéo</button>\n\n    <ion-card no-margin class="card-info">\n      <ion-card-content no-padding>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-9>\n              <ion-item class="item-compagny uk-padding-remove">\n                <ion-thumbnail item-start>\n                  <img  *ngIf="(business | json) == ({} | json)" src="assets/imgs/default.jpg" class="uk-responsive-height uk-border-circle">\n                  <img  *ngIf="business.logo==\'\'" [ngClass]="{\'uk-hidden\': (business | json) == ({} | json)}" src="assets/imgs/default.jpg" class="uk-responsive-height uk-border-circle" imageViewer>\n                  <img  *ngIf="business.logo!=\'\'" [ngClass]="{\'uk-hidden\': (business | json) == ({} | json)}" src="{{business.logo}}" class="uk-responsive-height uk-border-circle" imageViewer>\n                </ion-thumbnail>\n                <div>\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted" style="margin-bottom: 4px !important;">{{business.ville}} {{business.quartier}}</div>\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted" *ngIf="(business | json) == ({} | json)" style="margin-bottom: 4px !important; background-color: #eeeeee; height: 20px"></div>\n                  <!--  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-success uk-text-small"> <ion-icon name="checkmark-circle"></ion-icon> Entreprise validé</div>\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-danger uk-text-small"> <ion-icon name="close"></ion-icon> Validation en cours</div> -->\n                  <ion-badge item-end class="uk-margin-remove-top uk-margin-remove-left uk-margin-remove-right">{{business.maincategorie}}</ion-badge>\n                  <div item-end class="uk-margin-small-top uk-margin-remove-left uk-margin-remove-right" style="height: 15px; background-color: #eeeeee;" *ngIf="(business | json) == ({} | json)"></div>\n                </div>\n\n              </ion-item>\n            </ion-col>\n            <ion-col col-3 class="uk-position-relative">\n              <div class="" *ngIf="(business | json) != ({} | json)">\n                <rating  [(ngModel)]="business.ratecount"\n                         readOnly="true"\n                         max="5"\n                         emptyStarIconName="star-outline"\n                         halfStarIconName="star-half"\n                         starIconName="star"\n                         nullable="false" ></rating>\n                <div class="uk-text-right uk-h4 uk-margin-remove">{{business.reviewcount}} avis</div>\n                <!-- div class="uk-text-right uk-text-danger uk-text-bold uk-h4 uk-margin-remove">Fermé</div -->\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n    <ion-card no-margin margin-top class="card-info" *ngIf="(business | json) == ({} | json)">\n      <div class="uk-height-small uk-flex uk-flex-middle uk-flex-center">\n        <div class="uk-text-center">\n          <span class="uk-display-block uk-margin-medium-bottom">Chargement ....</span>\n          <div uk-spinner></div>\n        </div>\n      </div>\n    </ion-card>\n    <ion-card no-margin margin-top class="card-info" *ngIf="(business | json) != ({} | json)">\n      <ion-card-header no-padding>\n        <ion-segment [(ngModel)]="segmentation">\n          <ion-segment-button value="desc" (ionSelect)="activeLocation()">\n            Description\n          </ion-segment-button>\n          <ion-segment-button value="locale" (ionSelect)="activeMap()"  *ngIf="business.latitude!=\'\' && business.longitude!=\'\'">\n            Localisation\n          </ion-segment-button>\n          <ion-segment-button value="avis" (ionSelect)="activeAvis()">\n            Avis\n          </ion-segment-button>\n        </ion-segment>\n      </ion-card-header>\n      <ion-card-content [ngSwitch]="segmentation" no-padding>\n        <div *ngSwitchCase="\'desc\'" class="uk-height-1-1 uk-position-relative uk-padding-small">\n\n          <div class="uk-position-relative" *ngIf="business.gallery?.length > 0">\n            <ion-label ion-text class="uk-text-bold uk-display-block">Image</ion-label>\n          </div>\n\n          <ion-slides loop="true" slidesPerView="4" margin-top spaceBetween="3" *ngIf="business.gallery?.length > 0">\n\n\n            <ion-slide *ngFor="let item of business.gallery">\n              <img alt="city"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/{{item.url}}"  imageViewer>\n            </ion-slide>\n\n\n          </ion-slides>\n          <hr *ngIf="business.gallery?.length > 0">\n\n          <div class="uk-text-break uk-position-relative" *ngIf="business.description?.length > 0">\n            <div class="uk-height-max-small" style="overflow: hidden">\n                  {{business.description}}\n            </div>\n            <div class="show-more-end"></div>\n            <div class="uk-text-center" *ngIf="business.description != \'\'">\n              <button ion-button clear small (click)="openDescriptionEdit(business.description, business.name)">Lire la suite</button>\n            </div>\n          </div>\n          <hr *ngIf="business.description?.length > 0">\n\n          <ion-grid no-padding *ngIf="business.latitude == \'\' && business.longitude == \'\'">\n            <ion-row>\n              <ion-col col-5>\n                <ion-label class="uk-text-bold">\n                  Adresse et Localisation\n                </ion-label>\n              </ion-col>\n              <ion-col col-7>\n                <div ion-text class="uk-text-break">\n                  <p>\n                    {{ business.adresse }} {{ business.repere }}\n                  </p>\n                </div>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <hr *ngIf="business.latitude == \'\' && business.longitude == \'\'">\n\n          <ion-grid no-padding *ngIf="business.tags?.length > 0">\n            <ion-row>\n              <ion-col col-5>\n                <ion-label class="uk-text-bold">\n                  Autres catégories :\n                </ion-label>\n              </ion-col>\n              <ion-col col-7>\n                <div ion-text class="uk-text-break">\n                  <p *ngFor="let item of business.tags">\n                    <span *ngIf="item.cat==1">{{item.key}} </span>\n                  </p>\n                </div>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <hr *ngIf="business.tags?.length > 0">\n\n          <!-- ion-grid no-padding>\n            <ion-row>\n              <ion-col col-12 class="uk-position-relative">\n                <ion-label class="uk-text-bold">\n                  Horaire :\n                </ion-label>\n                <span class="uk-text-success">Ouvert</span> aujourd\'hui de 08h à 15h\n              </ion-col>\n            </ion-row>\n          </ion-grid -->\n        </div>\n        <div *ngSwitchCase="\'locale\'" class="uk-height-1-1"  >\n          <maps [business]="business"></maps>\n        </div>\n        <div *ngSwitchCase="\'avis\'" class="uk-height-1-1">\n          <div class="uk-padding-small rating-block uk-text-center">\n\n            <div ion-text class="uk-h1 uk-text-center uk-margin-remove-bottom" color="dark">Noté ce professionnel</div>\n            <div ion-text class="uk-h3 uk-text-center uk-margin-small-top">Cliquez sur les etoiles pour noter ce professionnel</div>\n            <rating  [(ngModel)]="valiRate"\n                     readOnly="false"\n                     max="5"\n                     emptyStarIconName="star-outline"\n                     halfStarIconName="star-half"\n                     starIconName="star"\n                     nullable="false" (ngModelChange)="onModelChange($event, business._id.$id)"></rating>\n\n            <button ion-button clear class="uk-text-center" (click)="onModelChange(valiRate,business._id.$id)">Ecrire un avis</button>\n\n          </div>\n\n          <hr>\n\n          <ion-list>\n            <ion-item *ngFor="let item of business.reviews">\n              <ion-avatar item-start>\n                <img src="http://yoomeeonl.webfactional.com/{{item.picture}}">\n\n              </ion-avatar>\n              <div class="uk-position-relative uk-comments">\n                <h2>{{item.username}}</h2>\n                <rating  [(ngModel)]="item.rate"\n                         readOnly="true"\n                         max="5"\n                         emptyStarIconName="star-outline"\n                         halfStarIconName="star-half"\n                         starIconName="star"\n                         nullable="false" ></rating>\n                <ion-note class="uk-position-center-right">{{item.date}}</ion-note>\n              </div>\n              <p>{{item.review}}</p>\n              <hr>\n            </ion-item>\n\n\n\n          </ion-list>\n\n\n        </div>\n      </ion-card-content>\n    </ion-card>\n\n  </div>\n\n</ion-content>\n\n<ion-footer [class.bgFooter]="dark">\n  <ion-grid>\n\n\n\n    <ion-row [hidden]="!dark">\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center" style="height: 56px">\n        <button ion-button clear color="white" (click)="callCompany(business.phone)"><ion-icon name="call"></ion-icon></button>\n      </ion-col>\n\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center" style="height: 56px">\n        <button ion-button clear color="white" (click)="emailCompany(business.email)"><ion-icon name="mail"></ion-icon></button>\n\n      </ion-col>\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center" style="height: 56px">\n        <button ion-button clear color="white"><ion-icon name="globe"></ion-icon></button>\n      </ion-col>\n    </ion-row>\n    <ion-row [hidden]="dark">\n      <ion-col col-12 padding-horizontal class="uk-text-center uk-flex uk-flex-middle uk-flex-center" style="height: 56px">\n        <span ion-text color="primary">{{business.adresse}} {{business.repere}}</span>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/company/company.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */]])
    ], CompanyPage);
    return CompanyPage;
}());

//# sourceMappingURL=company.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(47);
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
var ReviewFormPage = (function () {
    function ReviewFormPage(events, viewCtrl, navCtrl, navParams, formBuilder, http, toastCtrl) {
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.userexist = false;
        this.validations_form = this.formBuilder.group({
            titre: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            message: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
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
        console.log(" id " + this.companyId);
        // alert(value.titre+"  "+this.note+"  "+value.message+" "+this.companyId);
        this.http.post("http://yoomeeonl.webfactional.com/MobileApp/saveReview", myData)
            .subscribe(function (data) {
            //  console.log(data["_body"]);
            _this.events.publish('companyInfoupdate', data["_body"]);
            _this.viewCtrl.dismiss();
            _this.toastCtrl.create({ message: "Votre commentaire a été enregistré", position: "top" });
        }, function (error) {
            //console.log("Oooops!");
        });
    };
    ReviewFormPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ReviewFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-review-form',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/review-form/review-form.html"*/'<!--\n  Generated template for the ReviewFormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button color="primary" icon-only small (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title class="uk-title-color-red">Laissez un commentaire</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="uk-padding uk-height-1-1">\n    <div class="uk-padding-small uk-margin-large-top rating-block uk-text-center">\n      <div ion-text class="uk-h2 uk-text-center" color="dark">Laissez un commentaire à votre note</div>\n      <rating  [(ngModel)]="note"\n               readOnly="false"\n               max="5"\n               emptyStarIconName="star-outline"\n               halfStarIconName="star-half"\n               starIconName="star"\n               nullable="false" ></rating>\n\n    </div>\n    <form class="form uk-padding-small" [formGroup]="validations_form">\n\n\n\n      <ion-item no-padding>\n        <ion-label floating color="primary">Titre</ion-label>\n        <ion-input type="text" formControlName="titre"></ion-input>\n      </ion-item>\n      <div class="validation-errors">\n        <ng-container *ngFor="let validation of validation_messages.titre">\n          <div class="error-message" *ngIf="validations_form.get(\'titre\').hasError(validation.type) && (validations_form.get(\'titre\').dirty || validations_form.get(\'titre\').touched)">\n            {{ validation.message }}\n          </div>\n        </ng-container>\n      </div>\n\n      <ion-item no-padding>\n        <ion-label floating color="primary">Message</ion-label>\n        <ion-textarea type="message" formControlName="message"></ion-textarea>\n      </ion-item>\n      <div class="validation-errors">\n        <ng-container *ngFor="let validation of validation_messages.message">\n          <div class="error-message" *ngIf="validations_form.get(\'message\').hasError(validation.type) && (validations_form.get(\'message\').dirty || validations_form.get(\'message\').touched)">\n            {{ validation.message }}\n          </div>\n        </ng-container>\n      </div>\n\n      <button ion-button full type="submit" [disabled]="!validations_form.valid" (click)="addreview(validations_form.value)" class="uk-margin-small-top">Save</button>\n\n    </form>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/review-form/review-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["A" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ToastController */]])
    ], ReviewFormPage);
    return ReviewFormPage;
}());

//# sourceMappingURL=review-form.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_variable_variable__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_forget_login_forget__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__inscription_inscription__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__review_form_review_form__ = __webpack_require__(92);
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
var LoginPage = (function () {
    function LoginPage(events, app, navCtrl, http, toastCtrl, navParams, formBuilder, viewCtrl, users, variable, alertCtrl, modalCtrl) {
        this.events = events;
        this.app = app;
        this.navCtrl = navCtrl;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.users = users;
        this.variable = variable;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.type = "";
        // When the page loads, we want the Login segment to be selected
        this.authType = "login";
        // We need to set the content type for the server
        this.contentHeader = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({ "Content-Type": "application/json" });
        this.validations_form = this.formBuilder.group({
            login: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ]))
        });
        this.validation_messages = {
            'login': [
                { type: 'required', message: 'Email obligatoire' },
                { type: 'pattern', message: 'Email invalid' }
            ],
            'password': [
                { type: 'required', message: 'Mot de passe obligatoire' },
                { type: 'minLength', message: 'Le mot de passe doit etre superieur ou egale à 6 caracteres' }
            ]
        };
        this.type = navParams.get("type");
    }
    LoginPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    // openModal() {
    /*  let myModal = this.modalCtrl.create(ModalPage); //ModalPage
      myModal.present();*/
    // }
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
                var alert_1 = _this.alertCtrl.create({
                    title: 'Information Incorrecte',
                    subTitle: 'Votre mot de passe ou login est incorrect',
                    buttons: ['OK']
                });
                alert_1.present();
            }
            else {
                if (data["id"] == 1) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Compte inexistant',
                        subTitle: 'Aucun compte enregistré avec cet email.',
                        buttons: ['OK']
                    });
                    alert_2.present();
                }
                else {
                    // console.log(data["_body"]);
                    localStorage.setItem('userId', JSON.stringify({ id: data["id"], lastName: data["last_name"], firstName: data["first_name"], email: data["email"] }));
                    // this.navCtrl.push('CpanelPage');
                    // let nav = this.app.getRootNav();
                    // nav.setRoot('CpanelPage');
                    _this.events.publish('userconnect', true);
                    _this.dismiss();
                    if (_this.type == "review") {
                        var myModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__review_form_review_form__["a" /* ReviewFormPage */], { vote: _this.navParams.get("vote"), companyId: _this.navParams.get("companyId") });
                        myModal.present();
                    }
                }
            }
        });
    };
    LoginPage.prototype.loginForget = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_forget_login_forget__["a" /* LoginForgetPage */]);
    };
    LoginPage.prototype.inscription = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__inscription_inscription__["a" /* InscriptionPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button color="primary" icon-only small (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title class="uk-title-color-red">Connexion</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n  <div class="uk-padding uk-height-1-1">\n    <div class="uk-width-1-1">\n      <img src="assets/imgs/logoici.png" alt="" height="50" class="uk-display-block uk-margin-auto uk-margin-bottom">\n      <form class="form" [formGroup]="validations_form"  (ngSubmit)="connexion(validations_form.value)">\n\n        <ion-item no-padding>\n          <ion-label floating color="primary">Adresse Email</ion-label>\n          <ion-input type="email" formControlName="login"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.login">\n            <div class="error-message uk-text-danger" *ngIf="validations_form.get(\'login\').hasError(validation.type) && (validations_form.get(\'login\').dirty || validations_form.get(\'login\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n\n        <ion-item no-padding>\n          <ion-label floating color="primary">Mot de passe</ion-label>\n          <ion-input type="password" formControlName="password"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.password">\n            <div class="error-message uk-text-danger" *ngIf="validations_form.get(\'password\').hasError(validation.type) && (validations_form.get(\'password\').dirty || validations_form.get(\'password\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n\n\n        <button ion-button full type="submit" [disabled]="!validations_form.valid" class="uk-margin-medium-top">Connexion</button>\n      </form>\n      <div class="uk-grid uk-child-width-1-2">\n        <div class="uk-text-left uk-text-small"><button ion-button clear (tap)="loginForget()" small>Mot de passe oublié?</button></div>\n        <div class="uk-text-right uk-text-small"><button ion-button clear (tap)="inscription()" small>Inscrivez vous.</button></div>\n      </div>\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["A" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_variable_variable__["a" /* VariableProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ModalController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InscriptionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
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
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InscriptionPage = (function () {
    function InscriptionPage(navCtrl, navParams, formBuilder, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.dismissed = false;
        this.dismissed = this.navParams.get('showDismiss');
        this.validations_form = this.formBuilder.group({
            nom: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            prenom: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
            ])),
            confirm_password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5),
                this.equalto('password')
            ]))
        });
        this.validation_messages = {
            'nom': [
                { type: 'required', message: 'Information obligatoire' }
            ],
            'prenom': [
                { type: 'required', message: 'Information obligatoire' }
            ],
            'email': [
                { type: 'required', message: 'Information obligatoire' },
                { type: 'pattern', message: 'Email Invalide' }
            ],
            'password': [
                { type: 'required', message: 'Mot de passe obligatoire' },
                { type: 'minLength', message: 'Le mot de passe doit etre superieur ou egale à 6 caracteres' }
            ],
            'confirm_password': [
                { type: 'required', message: 'Inserer votre confirmation de mot passe' },
                { type: 'minLength', message: 'Le mot de passe doit etre superieur ou egale à 6 caracteres' },
                { type: 'equalTo', message: 'La confirmation n\'est pas correcte.' },
            ]
        };
    }
    InscriptionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InscriptionPage');
    };
    InscriptionPage.prototype.equalto = function (field_name) {
        return function (control) {
            var input = control.value;
            console.log(control);
            var isValid = control.root.value[field_name] == input;
            if (!isValid)
                return { 'equalTo': { isValid: isValid } };
            else
                return null;
        };
    };
    InscriptionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    InscriptionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-inscription',template:/*ion-inline-start:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/inscription/inscription.html"*/'<!--\n  Generated template for the InscriptionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start *ngIf="dismissed">\n      <button ion-button color="primary" icon-only small (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Inscrivez-vous !</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="uk-padding uk-height-1-1">\n    <div class="uk-width-1-1">\n      <img src="assets/imgs/logoici.png" alt="" height="50" class="uk-display-block uk-margin-auto uk-margin-bottom">\n      <form class="form" [formGroup]="validations_form"  (ngSubmit)="connexion(validations_form.value)">\n\n        <ion-item no-padding>\n          <ion-label floating color="primary">Nom</ion-label>\n          <ion-input type="text" formControlName="nom"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.name">\n            <div class="error-message uk-text-danger" *ngIf="validations_form.get(\'nom\').hasError(validation.type) && (validations_form.get(\'nom\').dirty || validations_form.get(\'nom\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n\n        <ion-item no-padding>\n          <ion-label floating color="primary">Prénom</ion-label>\n          <ion-input type="text" formControlName="prenom"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.prenom">\n            <div class="error-message uk-text-danger" *ngIf="validations_form.get(\'prenom\').hasError(validation.type) && (validations_form.get(\'prenom\').dirty || validations_form.get(\'prenom\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n\n        <ion-item no-padding>\n          <ion-label floating color="primary">Adresse Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.login">\n            <div class="error-message uk-text-danger" *ngIf="validations_form.get(\'email\').hasError(validation.type) && (validations_form.get(\'email\').dirty || validations_form.get(\'email\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n\n        <ion-item no-padding>\n          <ion-label floating color="primary">Mot de passe</ion-label>\n          <ion-input type="password" formControlName="password"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.password">\n            <div class="error-message uk-text-danger" *ngIf="validations_form.get(\'password\').hasError(validation.type) && (validations_form.get(\'password\').dirty || validations_form.get(\'password\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n\n        <ion-item no-padding>\n          <ion-label floating color="primary">Confirmation Mot de passe</ion-label>\n          <ion-input type="password" formControlName="confirm_password"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.confirm_password">\n            <div class="error-message uk-text-danger" *ngIf="validations_form.get(\'confirm_password\').hasError(validation.type) && (validations_form.get(\'confirm_password\').dirty || validations_form.get(\'confirm_password\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n\n\n        <button ion-button full type="submit" [disabled]="!validations_form.valid" class="uk-margin-medium-top">Enregistre</button>\n      </form>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/online2/Documents/projets/mobile/ici-tab.v1/src/pages/inscription/inscription.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["A" /* ViewController */]])
    ], InscriptionPage);
    return InscriptionPage;
}());

//# sourceMappingURL=inscription.js.map

/***/ })

},[367]);
//# sourceMappingURL=main.js.map