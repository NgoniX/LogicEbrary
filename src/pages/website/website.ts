import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'page-website',
  templateUrl: 'website.html',
})

export class WebsitePage {

  constructor(public navCtrl: NavController, private iab: InAppBrowser,
   public platform: Platform) {

  	this.platform.ready().then(() => {
      this.iab.create("http://www.logicebrary.co.zw",'_blank');
    });

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad WebsitePage');
  // }

}
