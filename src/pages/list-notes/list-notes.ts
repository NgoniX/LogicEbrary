import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoteServiceProvider } from '../../providers/note-service/note-service';
import { Note } from '../../models/note.model';
import { ViewNotePage } from '../view-note/view-note';

@Component({
  selector: 'page-list-notes',
  templateUrl: 'list-notes.html',
})
export class ListNotesPage {

  private notes : Promise<Note[]>;
  private note: Note;

  constructor(public navCtrl: NavController, private noteService: NoteServiceProvider) {
  }

  ionViewWillEnter() {
    this.notes = this.getAllNotes();
  }

  getNote(createDate: number) {
    this.noteService.getNote(createDate).then((n) => {
      this.note = n;
      this.navCtrl.push(ViewNotePage, { note: this.note })
    })
  }

  getAllNotes() {
    return this.noteService.getAllNotes();
  }

}
