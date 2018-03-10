import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  private storeData(){
    localStorage.setItem("favorites", JSON.stringify(this._favorites));
  }

  private loadData(){
    var favorites = localStorage.getItem("favorites");
    if (favorites == null) {
      return false;
    } 
    this._favorites = JSON.parse(favorites);
  }

  hasFavorite(bookName: string): boolean {
    this.loadData();
    return (this._favorites.indexOf(bookName) > -1);
  };

  addFavorite(bookName: string): void {
    this._favorites.push(bookName);
    this.storeData();
  };

  removeFavorite(bookName: string): void {
    let index = this._favorites.indexOf(bookName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
    this.storeData();
  };

  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(username: any): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('userData');
    this.events.publish('user:logout');
  };


  setUsername(username: string): void {
    this.storage.set('userData', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('userData').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
