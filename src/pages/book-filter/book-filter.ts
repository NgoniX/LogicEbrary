import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { BookData } from '../../providers/book-data';


@Component({
  selector: 'page-book-filter',
  templateUrl: 'book-filter.html'
})
export class BookFilterPage {
  tracks: Array<{name: string, isChecked: boolean}> = [];

  constructor(
    public bookData: BookData,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    // passed in array of track names that should be excluded (unchecked)
   
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
