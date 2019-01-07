import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddNotePage } from '../add-note/add-note';
import { ListNotesPage } from '../list-notes/list-notes';

@Component({
  selector: 'page-notes-menu',
  templateUrl: 'notes-menu.html',
})
export class NotesMenuPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesMenuPage');
  }

   // add note
  addNote(){
    this.navCtrl.push(AddNotePage);
  }

  showList(){
      this.navCtrl.push(ListNotesPage);
  }

}
