import { Component } from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { ViewBookPage } from '../view-book/view-book';


@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html'
})
export class BookDetailPage {
  book: any;

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    this.book = navParams.data.book;
  }


readBook(bookFile:any){

this.navCtrl.push(ViewBookPage, {

 book: bookFile

})

}


}
