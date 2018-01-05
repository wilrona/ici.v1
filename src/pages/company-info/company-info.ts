import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';

// DONT FORGET THIS DECLARATION TO AVOID TYPESCRIPT ERROR
declare var VideoPicturePreviewPickerV2: any;

/**
 * Generated class for the CompanyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-info',
  templateUrl: 'company-info.html',
})
export class CompanyInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInfoPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
          limit_Select: 1,
          Is_multiSelect: false,
          picture_selector:  false,
          video_selector:  false,
          display_video_time: false,
          display_preview: true
        });
    });
  }

}
