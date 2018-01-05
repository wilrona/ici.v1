import {Component, Renderer} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {ImageViewerController} from "ionic-img-viewer";

// DONT FORGET THIS DECLARATION TO AVOID TYPESCRIPT ERROR
declare var VideoPicturePreviewPickerV2: any;

/**
 * Generated class for the CompanyImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-images',
  templateUrl: 'company-images.html',
})
export class CompanyImagesPage {

  images:Array<any> = [];
  deletedActive:Boolean = false;
  _imageViewerCtrl: ImageViewerController;
  itemToDelete:Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    imageViewerCtrl: ImageViewerController,
    public renderer: Renderer
  ) {

    this.images = [
      { id: 1, image: 'assets/imgs/default.jpg'},
      { id: 2, image: 'assets/imgs/default.jpg'},
      { id: 3, image: 'assets/imgs/default.jpg'},
      { id: 4, image: 'assets/imgs/default.jpg'},
      { id: 5, image: 'assets/imgs/default.jpg'},
      { id: 6, image: 'assets/imgs/default.jpg'},
      { id: 7, image: 'assets/imgs/default.jpg'},
      { id: 8, image: 'assets/imgs/default.jpg'},
      { id: 9, image: 'assets/imgs/default.jpg'},
    ];

    this._imageViewerCtrl = imageViewerCtrl;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyImagesPage');
  }

  uploadPicture()
  {

    this.platform.ready().then(() =>
    {
      VideoPicturePreviewPickerV2.openPicker(
        function(results) {
          console.log(results);
        }, function (error) {
          console.log(error);
        }, {
          limit_Select: 10,
          Is_multiSelect: true,
          picture_selector:  true,
          video_selector:  false,
          display_video_time: false,
          display_preview: true
        });
    });
  }

  zoomeImage(myImage, e:any, image){
    if(!this.deletedActive){

      // Affiche le detail de la page
      const imageViewer = this._imageViewerCtrl.create(myImage);
      imageViewer.present();

    }else{

      if(this.itemToDelete.indexOf(image) > -1){

        const index = this.itemToDelete.indexOf(image);
        this.itemToDelete.splice(index, 1);
        this.renderer.setElementStyle(e.target.parentElement, 'border', 'none');

        if(this.itemToDelete.length === 0){
          this.deletedActive = false;
        }

      }else{
        this.itemToDelete.push(image);
        this.renderer.setElementStyle(e.target.parentElement, 'border', '4px solid red');
      }

    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  deleteItem(e:any, image){
     this.deletedActive = true;
     this.renderer.setElementStyle(e.target.parentElement, 'border', '4px solid red');
     this.itemToDelete.push(image)
  }

  removeDeteletedItem(){

    this.itemToDelete.map(function (x) {
      document.getElementById(x).parentElement.style.border = 'none';
    });
    this.itemToDelete.splice(0, this.itemToDelete.length);
    this.deletedActive = false;
  }

}
