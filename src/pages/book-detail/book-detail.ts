import { Component } from '@angular/core';

import { NavParams, NavController, Platform } from 'ionic-angular';

import { ViewBookPage } from '../view-book/view-book';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html'
})
export class BookDetailPage {
  book: any;

  constructor(public navParams: NavParams, 
              public navCtrl: NavController,
              private iab: InAppBrowser,
              public platform: Platform) {

    this.book = navParams.data.book;
  }


readBook(bookFile:any){

  this.navCtrl.push(ViewBookPage, {

  book: bookFile

  })

}

buyBook(price:any) {
  let pstring = btoa('search=hillaryshoniwa@gmail.com&amount='+price+'&reference=LG10001&l=1');
  this.iab.create('https://www.paynow.co.zw/payment/link/?q='+pstring,'_blank');
}


}
