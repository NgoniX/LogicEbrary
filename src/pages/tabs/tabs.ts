import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { StorePage } from '../store/store';
import { AcademicPage } from '../academic/academic';
import { AudioPage } from '../audio/audio';
import { BookPage } from '../books/book';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = BookPage;
  tab5Root: any = AudioPage;
  tab6Root: any = AcademicPage;
  tab7Root: any = StorePage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
