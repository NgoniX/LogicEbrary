import { Component } from '@angular/core';

import {Platform, ActionSheet, ActionSheetController, Config } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

	actionSheet : ActionSheet;

  constructor(
  	public platform: Platform, 
  	public config : Config,
  	public actionSheetCtrl : ActionSheetController,
  	public inAppBrowser: InAppBrowser
  	) {
  }

  goToWebsite() {
    this.inAppBrowser.create(`https://logicebrary.co.zw/`, '_blank');
  }

  goToFB() {
    this.inAppBrowser.create(`https://facebook.com/`, '_blank');
  }

  goToTwitter() {
    this.inAppBrowser.create(`https://twitter.com/`, '_blank');
  }

  openContact(contact: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact Hilary Shoniwa',
      buttons: [
        {
          text: `Email: info@logicebrary.co.zw`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto: info@logicebrary.co.zw');
          }
        },
        {
          text: `Phone: +263 4 781 748`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel: 263 4 781 748');
          }
        },
        {
          text: `Cell: +263 783 790 230`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel: +263 783 790 230');
          }
        }

      ]
    });

    actionSheet.present();
  }

  
  }

