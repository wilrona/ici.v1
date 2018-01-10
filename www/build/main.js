webpackJsonp([5],{

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnuairePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__ = __webpack_require__(116);
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
    function AnnuairePage(navCtrl, loadingCtrl, emailComposer, navParams, menu, listingService, callNumber) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.emailComposer = emailComposer;
        this.navParams = navParams;
        this.menu = menu;
        this.listingService = listingService;
        this.callNumber = callNumber;
        this.listlength = 20;
        this.start = 0;
        this.keyword = "";
        this.perpage = 20;
        this.totalPage = 0;
        this.userexist = false;
        menu.enable(true);
        this.getCities();
        var currentUser = JSON.parse(localStorage.getItem('userId'));
        this.user = currentUser;
        if (localStorage.getItem("userId")) {
            this.userexist = true;
        }
        this.loadData();
    }
    AnnuairePage.prototype.getCities = function () {
        var _this = this;
        this.listingService.getCities().subscribe(function (data) { return _this.cities = data; });
    };
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
        var query = this.keyword;
        var ville = new Array();
        var i = 0;
        for (var _i = 0, _a = this.cities; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.checked == true) {
                ville[i] = c.name;
                i++;
            }
        }
        setTimeout(function () {
            _this.listingService.getListing(query, ville, _this.start * _this.perpage)
                .subscribe(function (res) {
                _this.companies = res;
                /* this.perPage = this.data.per_page;
                 this.totalData = this.data.total;*/
                //  this.totalPage = 1745;//this.companies.total_pages;
                for (var i_1 = 0; i_1 < _this.companies.length; i_1++) {
                    _this.listing.push(_this.companies[i_1]);
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
        var query = this.keyword;
        this.listingService.getListing(query).subscribe(function (data) { return _this.listing = data; });
        //this.loading.dismiss();
    };
    AnnuairePage.prototype.changed = function (e) {
        var _this = this;
        var city = "";
        var ville = new Array();
        var i = 0;
        for (var _i = 0, _a = this.cities; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.checked == true) {
                city = city + "city=" + c.name + "&";
                ville[i] = c.name;
                i++;
            }
        }
        //console.log(ville);
        var query = this.keyword;
        this.listingService.getListing(query, ville).subscribe(function (data) { return _this.listing = data; });
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
    AnnuairePage.prototype.search = function () {
        var _this = this;
        var query = this.keyword;
        var ville = new Array();
        var i = 0;
        for (var _i = 0, _a = this.cities; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.checked == true) {
                ville[i] = c.name;
                i++;
            }
        }
        this.listingService.getListing(query, ville).subscribe(function (data) { return _this.listing = data; });
    };
    AnnuairePage.prototype.arrayLength = function (liste) {
        var value;
        value = liste;
        var taille = 0;
        if (liste != null) {
            taille = value.length;
        }
        return taille;
    };
    AnnuairePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-annuaire',template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\pages\annuaire\annuaire.html"*/'<!--\n\n  Generated template for the AnnuairePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-toolbar padding-horizontal>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n\n        <ion-icon name="menu" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n\n    </ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="openMenu(\'left\')">\n\n        <ion-icon name="funnel" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <ion-list>\n\n    <ion-item-divider color="light">3500 resultats d\'entreprise</ion-item-divider>\n\n\n\n    <ion-card *ngFor="let liste of listing ">\n\n      <ion-card-content>\n\n        <ion-grid>\n\n          <ion-row>\n\n            <ion-col col-9>\n\n              <h2 class="uk-text-truncate uk-margin-remove" (click)="openDetail(liste._id.$id)">{{liste.name}}</h2>\n\n              <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted" style="margin-bottom: 4px !important;">{{liste.ville}} {{liste.quartier}}</div>\n\n              <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-success uk-text-small"> <ion-icon name="checkmark-circle"></ion-icon> Entreprise validé</div>\n\n              <!-- <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-danger uk-text-small"> <ion-icon name="close"></ion-icon> Validation en cours</div> -->\n\n            </ion-col>\n\n            <ion-col col-3>\n\n              <rating  [(ngModel)]="liste.ratecount"\n\n                       readOnly="true"\n\n                       max="5"\n\n                       emptyStarIconName="star-outline"\n\n                       halfStarIconName="star-half"\n\n                       starIconName="star"\n\n                       nullable="false" \n\n                       (ngModelChange)="onModelChange($event, liste._id.$id)"></rating>\n\n              <div class="uk-text-right uk-h4 uk-margin-remove">{{liste.reviewcount}} avis</div>\n\n              <div class="uk-text-right uk-text-success uk-h4 uk-margin-remove uk-text-bold">8h à 18h30</div>\n\n            </ion-col>\n\n            <ion-col col class="uk-padding-remove-vertical">\n\n              <hr no-margin="">\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row>\n\n            <ion-col col-9>\n\n              <ion-item class="item-compagny">\n\n                <ion-thumbnail item-start>\n\n                  <img  *ngIf="liste.imageune==null"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg" class="uk-responsive-height">\n\n			            <img  *ngIf="liste.imageune!=null"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/{{liste.imageune}}" class="uk-responsive-height">\n\n                </ion-thumbnail>\n\n                <div>\n\n                  <ion-badge item-end class="uk-margin-remove-top uk-margin-remove-left uk-margin-remove-right">{{liste.maincategorie}}</ion-badge>\n\n                </div>\n\n\n\n                <div class="uk-h4 uk-margin-remove">\n\n                  <ul class="uk-text-small uk-padding-small uk-padding-remove-vertical uk-padding-remove-right" no-margin>\n\n                    <li *ngIf="liste.adresse!=\'\'">{{liste.adresse}}</li>\n\n                    <li *ngIf="liste.repere!=\'\'">{{liste.repere}}</li>\n\n                    <!--li>Localisation</li-->\n\n                  </ul>\n\n                </div>\n\n\n\n              </ion-item>\n\n            </ion-col>\n\n            <ion-col col-3 class="uk-position-relative">\n\n              <div class="uk-position-bottom-right">\n\n                <ion-icon name="call" class="icon-m" (click)="callCompany(liste.phone)"></ion-icon>\n\n                <ion-icon name="mail" class="icon-m" (click)="emailCompany(liste.email)"></ion-icon>\n\n              </div>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card-content>\n\n    </ion-card>\n\n    \n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)" > <!--*ngIf="page < totalPage"-->\n\n      <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n\n\n  </ion-list>\n\n\n\n\n\n\n\n</ion-content>\n\n\n\n\n\n\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\pages\annuaire\annuaire.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_email_composer__["a" /* EmailComposer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* MenuController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_companies_companies__["a" /* CompaniesProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */]) === "function" && _g || Object])
    ], AnnuairePage);
    return AnnuairePage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=annuaire.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyImagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_img_viewer__ = __webpack_require__(220);
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
            selector: 'page-company-images',template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\pages\company-images\company-images.html"*/'<!--\n\n  Generated template for the CompanyImagesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button icon-only small (click)="dismiss()" [hidden]="deletedActive">\n\n        <ion-icon name="close" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title class="uk-title-color-red">Image de Compagny</ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only small (click)="removeDeteletedItem()" [hidden]="!deletedActive">\n\n        <span ion-text color="primary">Annuler</span>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-4 *ngFor="let image of images">\n\n          <div class="one-image uk-background-cover"   tappable>\n\n            <img cover src="{{ image.image }}" #myImage (tap)="zoomeImage(myImage, $event, image.id)" (press)="deleteItem($event, image.id)" id="{{ image.id }}">\n\n          </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n</ion-content>\n\n\n\n<ion-footer>\n\n    <div class="uk-flex uk-flex-center">\n\n      <button ion-button clear color="primary" (click)="uploadPicture()" block [hidden]="deletedActive" no-margin large class="no-border-radius"><ion-icon icon-left name="image" margin-right></ion-icon>  Ajouter des images</button>\n\n      <button ion-button color="success" [hidden]="!deletedActive" block  no-margin large class="no-border-radius"><ion-icon name="trash"></ion-icon></button>\n\n    </div>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\pages\company-images\company-images.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_img_viewer__["a" /* ImageViewerController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer */]])
    ], CompanyImagesPage);
    return CompanyImagesPage;
}());

//# sourceMappingURL=company-images.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
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
            selector: 'page-company-info',template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\pages\company-info\company-info.html"*/'<!--\n\n  Generated template for the CompanyInfoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button icon-only small (click)="dismiss()">\n\n        <ion-icon name="close" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title class="uk-title-color-red">Information</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n<ion-card class="uk-background-default card-info no-border-radius" margin-bottom>\n\n  <ion-card-content class="uk-flex uk-flex-middle uk-flex-center">\n\n    <div class="uk-text-center">\n\n      <img src="assets/imgs/default.jpg" alt="" class="logo uk-border-circle uk-margin-auto uk-display-block" margin-bottom>\n\n      <button ion-button clear small class="button-custom-size" (click)="uploadPicture()">Modifier le logo</button>\n\n    </div>\n\n\n\n  </ion-card-content>\n\n</ion-card>\n\n\n\n<div class="uk-background-default uk-padding uk-padding-remove-bottom uk-padding-remove-top">\n\n  <ion-list no-margin>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Nom de l\'entreprise</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Recherchez votre adresse</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Ville</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Quartier</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Rue</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Boite Postale</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <input type="hidden"  value="longitude">\n\n    <input type="hidden"  value="latitude">\n\n    <ion-item no-padding>\n\n      <ion-label floating>Repère de la position de votre entreprise</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Téléphone</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Adresse Email</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n    <ion-item no-padding>\n\n      <ion-label floating>Site Web</ion-label>\n\n      <ion-input type="text" value=""></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item no-padding no-border>\n\n    </ion-item>\n\n  </ion-list>\n\n</div>\n\n\n\n</ion-content>\n\n<ion-footer>\n\n  <div class="uk-flex uk-flex-center">\n\n    <button ion-button color="success" block  no-margin large class="no-border-radius"><ion-icon name="checkmark"></ion-icon></button>\n\n  </div>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\pages\company-info\company-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */]])
    ], CompanyInfoPage);
    return CompanyInfoPage;
}());

//# sourceMappingURL=company-info.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyDescriptionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
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
    }
    CompanyDescriptionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompanyDescriptionPage');
    };
    CompanyDescriptionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CompanyDescriptionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company-description',template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\pages\company-description\company-description.html"*/'<!--\n\n  Generated template for the CompanyDescriptionPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button color="primary" icon-only small (click)="dismiss()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title class="uk-title-color-red">Nom de l\'entreprise, Nom de l\'entreprise</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n\n  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n\n  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n\n  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n\n</ion-content>\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\pages\company-description\company-description.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ViewController */]])
    ], CompanyDescriptionPage);
    return CompanyDescriptionPage;
}());

//# sourceMappingURL=company-description.js.map

/***/ }),

/***/ 170:
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
webpackEmptyAsyncContext.id = 170;

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/annuaire/annuaire.module": [
		698,
		4
	],
	"../pages/company-description/company-description.module": [
		701,
		3
	],
	"../pages/company-images/company-images.module": [
		699,
		2
	],
	"../pages/company-info/company-info.module": [
		700,
		1
	],
	"../pages/company/company.module": [
		702,
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
webpackAsyncContext.id = 214;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_contact__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__annuaire_annuaire__ = __webpack_require__(154);
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
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__contact_contact__["a" /* ContactPage */];
    }
    TabsPage.prototype.menuToggle = function () {
        this.menu.enable(true, 'menu');
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\pages\tabs\tabs.html"*/'\n\n<ion-tabs tabsHighlight="true" selectedIndex="0" tabsPlacement="bottom"  (ionChange)="menuToggle()">\n\n  <ion-tab [root]="tab1Root" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabIcon="list"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabIcon="locate"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabIcon="person"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* MenuController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
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
            selector: 'page-contact',template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\pages\contact\contact.html"*/'<ion-header no-border="">\n\n  <ion-toolbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n\n\n    <ion-title>\n\n      <img alt="logo" height="40"  src="/assets/imgs/logoici.png" ><!--icicm1-->\n\n    </ion-title>\n\n\n\n    <ion-buttons end >\n\n      <button ion-button icon-only>\n\n        <ion-icon name="pin" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n\n    <ion-item>\n\n      <ion-icon name="ionic" item-start></ion-icon>\n\n      @ionicframework\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_company__ = __webpack_require__(360);
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
            selector: 'page-home',template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-toolbar padding-horizontal>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="openMenu(\'right\')">\n\n        <ion-icon name="menu" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      <img alt="logo" height="40"  src="assets/imgs/logoici.png" ><!--icicm1-->\n\n    </ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only>\n\n        <ion-icon name="pin" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n  <div class="uk-height-medium uk-background-cover uk-position-relative uk-flex uk-flex-center uk-flex-middle" style="background-image: url(\'assets/imgs/back.jpg\');">\n\n    <div class="uk-position-cover cover"></div>\n\n    <div class="uk-content-cover">\n\n      <div class="uk-h2 uk-margin-large-bottom">Bienvenue sur ICI.CM</div>\n\n      <ion-auto-complete [options]="{ placeholder : \'Rechercher un lieu\' }" [(ngModel)]="keyword"></ion-auto-complete>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="uk-card uk-card-default">\n\n    <div class="uk-card-header uk-text-left uk-padding-small uk-position-relative">\n\n      <h6 class="uk-margin-remove">Nouveaux lieux</h6>\n\n      <div class="uk-position-center-right">\n\n        <button ion-button clear>Voir plus</button>\n\n      </div>\n\n    </div>\n\n    <div class="uk-card-body uk-padding-remove">\n\n      <ion-slides slidesPerView=1.5 autoplay="5000" loop="false" speed="1000" >\n\n        <ion-slide>\n\n          <ion-card>\n\n            <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg"/>\n\n            <ion-card-content class="uk-position-relative">\n\n              <ion-badge item-end class="uk-margin-small">Catégorie Catégorie Catégorie</ion-badge>\n\n              <h2 class="uk-text-truncate uk-margin-remove" (click)="OpenDetail()">Nom de l\'entreprise</h2>\n\n              <small>Ville</small>\n\n              <div class="uk-position-bottom-right uk-padding-small">\n\n                <rating  [(ngModel)]="rate"\n\n                         readOnly="true"\n\n                         max="5"\n\n                         emptyStarIconName="star-outline"\n\n                         halfStarIconName="star-half"\n\n                         starIconName="star"\n\n                         nullable="false" ></rating>\n\n\n\n              </div>\n\n            </ion-card-content>\n\n          </ion-card>\n\n        </ion-slide>\n\n        <ion-slide>\n\n          <ion-card>\n\n            <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg"/>\n\n            <ion-card-content class="uk-position-relative">\n\n              <ion-badge item-end class="uk-margin-small">Catégorie Catégorie Catégorie</ion-badge>\n\n              <h2 class="uk-text-truncate uk-margin-remove">Nom de l\'entreprise</h2>\n\n              <small>Ville</small>\n\n              <div class="uk-position-bottom-right uk-padding-small">\n\n                <rating  [(ngModel)]="rate"\n\n                         readOnly="true"\n\n                         max="5"\n\n                         emptyStarIconName="star-outline"\n\n                         halfStarIconName="star-half"\n\n                         starIconName="star"\n\n                         nullable="false" ></rating>\n\n\n\n              </div>\n\n            </ion-card-content>\n\n          </ion-card>\n\n        </ion-slide>\n\n      </ion-slides>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_description_company_description__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__company_images_company_images__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__company_info_company_info__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_companies_companies__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__ = __webpack_require__(114);
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
    function CompanyPage(navCtrl, navParams, ref, renderer, modalCtrl, emailComposer, listingService, platform, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ref = ref;
        this.renderer = renderer;
        this.modalCtrl = modalCtrl;
        this.emailComposer = emailComposer;
        this.listingService = listingService;
        this.platform = platform;
        this.callNumber = callNumber;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.business = {};
        this.dark = true;
        this.idcompagnie = navParams.get("idcompagnie");
        this.loadData(this.idcompagnie);
    }
    CompanyPage.prototype.ionViewWillEnter = function () {
        this.segmentation = 'desc';
    };
    CompanyPage.prototype.ionViewDidLoad = function () {
        this.headerImgUrl = 'assets/imgs/back.jpg';
        // this.content.enableScrollListener();
    };
    CompanyPage.prototype.loadData = function (id) {
        var _this = this;
        this.listingService.getCompanyById(id).subscribe(function (data) { return _this.business = data; });
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], CompanyPage.prototype, "content", void 0);
    CompanyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-company',template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\pages\company\company.html"*/'<!--\n\n  Generated template for the CompanyPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-header shadow>\n\n\n\n  <ion-navbar [class.show-background]="showToolbar">\n\n    <ion-title [hidden]="!showToolbar" class="uk-text-truncate">{{business.name}}</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only small (click)="openInfoEdit()">\n\n        <ion-icon name="create"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content  class="content"\n\n              (ionScroll)="onScroll($event)"\n\n              [class.transition]="transition"\n\n              [style.background-size]="headerImgSize"\n\n              [style.backgroundImage]="\'url(http://yoomeeonl.webfactional.com/media/pictures/companies/\'+ business.imageune +\')\'"><!--headerImgUrl-->\n\n\n\n  <div class="user-info uk-height-small uk-flex uk-flex-middle uk-flex-center">\n\n    <h2 class="uk-size" padding-horizontal>{{business.name}} </h2>\n\n  </div>\n\n\n\n  <div class="contents">\n\n\n\n    <button ion-button block class="uk-block-button">Consultez notre vidéo</button>\n\n\n\n    <ion-card no-margin class="card-info">\n\n      <ion-card-content no-padding>\n\n        <ion-grid>\n\n          <ion-row>\n\n            <ion-col col-9>\n\n              <ion-item class="item-compagny uk-padding-remove">\n\n                <ion-thumbnail item-start>\n\n                  <img src="http://yoomeeonl.webfactional.com/media/pictures/companies/default.jpg" class="uk-responsive-height uk-border-circle">\n\n                </ion-thumbnail>\n\n                <div>\n\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-muted" style="margin-bottom: 4px !important;">{{business.ville}} {{business.quartier}}</div>\n\n                  <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-success uk-text-small"> <ion-icon name="checkmark-circle"></ion-icon> Entreprise validé</div>\n\n                  <!-- <div class="uk-h4 uk-margin-remove uk-text-truncate uk-text-danger uk-text-small"> <ion-icon name="close"></ion-icon> Validation en cours</div> -->\n\n                  <ion-badge item-end class="uk-margin-remove-top uk-margin-remove-left uk-margin-remove-right">{{business.categorie}}</ion-badge>\n\n                </div>\n\n\n\n              </ion-item>\n\n            </ion-col>\n\n            <ion-col col-3 class="uk-position-relative">\n\n              <div class="">\n\n                <rating  [(ngModel)]="business.ratecount"\n\n                         readOnly="true"\n\n                         max="5"\n\n                         emptyStarIconName="star-outline"\n\n                         halfStarIconName="star-half"\n\n                         starIconName="star"\n\n                         nullable="false" ></rating>\n\n                <div class="uk-text-right uk-h4 uk-margin-remove">{{business.reviewcount}} avis</div>\n\n                <div class="uk-text-right uk-text-danger uk-text-bold uk-h4 uk-margin-remove">Fermé</div>\n\n              </div>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-grid>\n\n      </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card no-margin margin-top class="card-info">\n\n      <ion-card-header no-padding>\n\n        <ion-segment [(ngModel)]="segmentation">\n\n          <ion-segment-button value="desc">\n\n            Description\n\n          </ion-segment-button>\n\n          <ion-segment-button value="locale">\n\n            Localisation\n\n          </ion-segment-button>\n\n          <ion-segment-button value="avis">\n\n            Avis\n\n          </ion-segment-button>\n\n        </ion-segment>\n\n      </ion-card-header>\n\n      <ion-card-content [ngSwitch]="segmentation" padding-top padding-bottom>\n\n        <div *ngSwitchCase="\'desc\'" class="uk-height-1-1 uk-position-relative">\n\n\n\n          <div class="uk-position-top-right">\n\n            <button ion-button clear small class="button-custom-size" (click)="openImageEdit()">Gérer</button>\n\n          </div>\n\n\n\n          <ion-label ion-text class="uk-text-bold uk-display-block">Image</ion-label>\n\n\n\n          <ion-slides loop="true" slidesPerView="4" margin-top spaceBetween="3">\n\n\n\n            <ion-slide>\n\n              <img src="assets/imgs/default.jpg" alt="" imageViewer>\n\n            </ion-slide>\n\n\n\n             \n\n\n\n              <ion-slide *ngFor="let item of business.gallery">\n\n                <img alt="city"  src="http://yoomeeonl.webfactional.com/media/pictures/companies/{{item.url}}"  imageViewer >\n\n              </ion-slide>\n\n              \n\n\n\n\n\n          </ion-slides>\n\n          <hr>\n\n          <div class="uk-text-break uk-position-relative">\n\n            <div class="uk-height-max-small" style="overflow: hidden">\n\n              {{business.gallery}}\n\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque earum fugiat fugit id maiores quia saepe. Accusamus beatae deserunt dicta dolor facere fugiat maiores nam sequi voluptatibus, voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto fuga labore odio odit quis sequi sit suscipit voluptate voluptatibus. Delectus, id quo! Animi beatae delectus quam, quas sit ullam!\n\n            </div>\n\n            <div class="show-more-end"></div>\n\n\n\n            <div class="uk-text-center">\n\n              <button ion-button clear small (click)="openDescriptionEdit()">Lire la suite</button>\n\n            </div>\n\n          </div>\n\n          <hr>\n\n          <ion-grid no-padding>\n\n            <ion-row>\n\n              <ion-col col-5>\n\n                <ion-label class="uk-text-bold">\n\n                  Autres catégories :\n\n                </ion-label>\n\n              </ion-col>\n\n              <ion-col col-7>\n\n                <div ion-text class="uk-text-break">\n\n                   <p *ngFor="let item of business.tags"> <span *ngIf="item.cat==1">{{item.key}}</span></p>\n\n                    <div>\n\n                      <button ion-button clear small class="button-custom-size">Gérer vos categories</button>\n\n                    </div>\n\n                </div>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n          <hr>\n\n          <ion-grid no-padding>\n\n            <ion-row>\n\n              <ion-col col-12 class="uk-position-relative">\n\n                <ion-label class="uk-text-bold">\n\n                  Horaire : <button ion-button clear small class="button-custom-size">Modifier</button>\n\n                </ion-label>\n\n                <span class="uk-text-success">Ouvert</span> aujourd\'hui de 08h à 15h\n\n                <div class="uk-position-bottom-right">\n\n                  <button ion-button clear small>Voir plus</button>\n\n                </div>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n        </div>\n\n        <div *ngSwitchCase="\'locale\'" class="uk-height-1-1">\n\n          <ion-title>localisation</ion-title>\n\n        </div>\n\n        <div *ngSwitchCase="\'avis\'" class="uk-height-1-1">\n\n          <ion-title>Avis</ion-title>\n\n          <ion-list>\n\n            <ion-item class="border-gray"  *ngFor="let item of business.reviews"> \n\n              <ion-thumbnail item-left class="round img-sm">\n\n              <img src="http://yoomeeonl.webfactional.com/{{item.picture}}">\n\n             \n\n              </ion-thumbnail>\n\n               <p class="name">{{item.username}} <span class="right" style="font-size: 11px;">{{item.date}}</span></p>\n\n               \n\n              <!--rating  [(ngModel)]="item.rate" \n\n              readOnly="true" \n\n              max="5" \n\n              emptyStarIconName="star-outline" \n\n              halfStarIconName="star-half" \n\n              starIconName="star" \n\n              nullable="false" ></rating-->\n\n              <p>{{item.review}}</p>\n\n              \n\n            </ion-item>\n\n             \n\n          </ion-list>\n\n        </div>\n\n      </ion-card-content>\n\n    </ion-card>\n\n\n\n  </div>\n\n</ion-content>\n\n\n\n<ion-footer [class.bgFooter]="dark">\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center">\n\n        <button ion-button clear color="white" (click)="callCompany(business.phone)"><ion-icon name="call" ></ion-icon></button>\n\n      </ion-col>\n\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center">\n\n        <button ion-button clear color="white" (click)="emailCompany(business.email)"><ion-icon name="mail" ></ion-icon></button>\n\n      </ion-col>\n\n      <ion-col col-4 padding-horizontal class="uk-flex uk-flex-center">\n\n        <button ion-button clear color="white"><ion-icon name="globe"></ion-icon></button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\pages\company\company.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_5__providers_companies_companies__["a" /* CompaniesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__["a" /* CallNumber */]])
    ], CompanyPage);
    return CompanyPage;
}());

//# sourceMappingURL=company.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(367);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic2_auto_complete__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic2_rating__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_annuaire_annuaire__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_filtre_filtre__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_img_viewer__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_company_description_company_description__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_company_images_company_images__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_company_info_company_info__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_companies_companies__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_email_composer__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_call_number__ = __webpack_require__(114);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_annuaire_annuaire__["a" /* AnnuairePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                // CompanyPage,
                __WEBPACK_IMPORTED_MODULE_15__pages_company_description_company_description__["a" /* CompanyDescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_company_images_company_images__["a" /* CompanyImagesPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_company_info_company_info__["a" /* CompanyInfoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                // components
                __WEBPACK_IMPORTED_MODULE_13__components_filtre_filtre__["a" /* FiltreComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], { tabsHideOnSubPages: 'true' }, {
                    links: [
                        { loadChildren: '../pages/annuaire/annuaire.module#AnnuairePageModule', name: 'AnnuairePage', segment: 'annuaire', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company-images/company-images.module#CompanyImagesPageModule', name: 'CompanyImagesPage', segment: 'company-images', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company-info/company-info.module#CompanyInfoPageModule', name: 'CompanyInfoPage', segment: 'company-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company-description/company-description.module#CompanyDescriptionPageModule', name: 'CompanyDescriptionPage', segment: 'company-description', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/company/company.module#CompanyPageModule', name: 'CompanyPage', segment: 'company', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10_ionic2_auto_complete__["a" /* AutoCompleteModule */],
                __WEBPACK_IMPORTED_MODULE_11_ionic2_rating__["a" /* Ionic2RatingModule */],
                __WEBPACK_IMPORTED_MODULE_14_ionic_img_viewer__["b" /* IonicImageViewerModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_annuaire_annuaire__["a" /* AnnuairePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                //CompanyPage,
                __WEBPACK_IMPORTED_MODULE_15__pages_company_description_company_description__["a" /* CompanyDescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_company_images_company_images__["a" /* CompanyImagesPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_company_info_company_info__["a" /* CompanyInfoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_18__providers_companies_companies__["a" /* CompaniesProvider */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_call_number__["a" /* CallNumber */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(349);
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
    function MyApp(platform, statusBar, splashScreen, menu) {
        this.menu = menu;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.closedFiltre = function () {
        this.menu.enable(true, 'menu');
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\app\app.html"*/'\n\n<ion-menu [content]="content" side="left" id="menu">\n\n  <ion-header>\n\n    <div class="uk-position-relative uk-height-small">\n\n      <div class="uk-position-center uk-padding-small">\n\n        <img src="assets/imgs/logoici.png" alt="" width="40" margin>\n\n      </div>\n\n      <ion-title class="uk-position-bottom-center uk-padding-small">Connectez-vous</ion-title>\n\n    </div>\n\n  </ion-header>\n\n\n\n  <ion-content id="menuLeft">\n\n    <ion-list no-margin>\n\n      <button ion-item>\n\n        Accueil\n\n      </button>\n\n      <button ion-item >\n\n        Annuaire\n\n      </button>\n\n      <button ion-item >\n\n        Maps\n\n      </button>\n\n    </ion-list>\n\n    <ion-item-group>\n\n      <ion-item-divider color="light">Mon Compte</ion-item-divider>\n\n      <button ion-item >\n\n        Connexion\n\n      </button>\n\n      <button ion-item >\n\n        Ajouter une entreprise\n\n      </button>\n\n    </ion-item-group>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<ion-menu [content]="content" side="right" id="filtre" swipeEnabled="false" (ionClose)="closedFiltre()">\n\n  <ion-header>\n\n    <div class="uk-position-relative uk-height-small">\n\n      <ion-title class="uk-position-center"><ion-icon name="funnel" icon-left></ion-icon> Filtre</ion-title>\n\n    </div>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <filtre></filtre>\n\n  </ion-content>\n\n\n\n  <ion-footer>\n\n    <div padding>\n\n      <button ion-button color="success" small> Valider </button>\n\n      <button ion-button color="light" small> Effacer </button>\n\n    </div>\n\n  </ion-footer>\n\n\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* MenuController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__ = __webpack_require__(71);
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
    function FiltreComponent(listingService) {
        this.listingService = listingService;
        this.shownGroup = null;
        this.getCities();
        this.loadCategory();
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
    FiltreComponent.prototype.getCities = function () {
        var _this = this;
        this.listingService.getCities().subscribe(function (data) { return _this.cities = data; });
    };
    FiltreComponent.prototype.loadCategory = function () {
        var _this = this;
        this.listingService.getSubcats().subscribe(function (data) { return _this.cat = data; });
    };
    FiltreComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'filtre',template:/*ion-inline-start:"D:\lab\ici-tab.v1\src\components\filtre\filtre.html"*/'<!-- Generated template for the FilterComponent component -->\n\n\n\n\n\n      <div class="uk-padding-small">\n\n        <ion-item no-margin no-padding>\n\n          <ion-label stacked>Par ville</ion-label>\n\n          <ion-select [(ngModel)]="cities" interface="action-sheet" multiple="true">\n\n            <ion-option  *ngFor="let item of cities">{{item.name}}</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n      </div>\n\n      <ion-label padding-left>Par catégorie </ion-label>\n\n\n\n      <ion-list *ngFor="let item of cat" >\n\n        <ion-list-header color="primary" (click)="toggleGroup(item.id)" >\n\n          <div>\n\n          {{item.name}} \n\n          <ion-icon name="add" color="light" class="uk-position-center-right" padding-right *ngIf="!isGroupShown(item.id)"></ion-icon>\n\n          <ion-icon name="close" color="light" class="uk-position-center-right" padding-right *ngIf="isGroupShown(item.id)"></ion-icon>\n\n          </div>\n\n        </ion-list-header>\n\n        <ion-list no-padding no-margin *ngIf="isGroupShown(item.id)">\n\n          <ion-item *ngFor="let it of item.subcat" >\n\n            <ion-label>{{it.name}}</ion-label>\n\n	          <ion-checkbox item-right color="primary" checked="true" [(ngModel)]="categories"></ion-checkbox>\n\n          </ion-item>\n\n        </ion-list>\n\n      </ion-list>\n\n\n\n      \n\n\n\n\n\n\n\n'/*ion-inline-end:"D:\lab\ici-tab.v1\src\components\filtre\filtre.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__["a" /* CompaniesProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__providers_companies_companies__["a" /* CompaniesProvider */]) === "function" && _a || Object])
    ], FiltreComponent);
    return FiltreComponent;
    var _a;
}());

//# sourceMappingURL=filtre.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompaniesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(216);
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
    CompaniesProvider.prototype.getListing = function (query, city, start) {
        if (query === void 0) { query = null; }
        if (city === void 0) { city = []; }
        if (start === void 0) { start = 0; }
        // return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchmobile?limit='+this.perpage+'&start='+start)
        return this.http.get('http://yoomeeonl.webfactional.com/MobileApp/searchmobile?query=' + query + '&city=' + city + '&limit=' + this.perpage + '&start=' + start)
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
    ], CompaniesProvider);
    return CompaniesProvider;
    var _a;
}());

//# sourceMappingURL=companies.js.map

/***/ })

},[362]);
//# sourceMappingURL=main.js.map