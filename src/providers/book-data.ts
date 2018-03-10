import { Injectable } from '@angular/core';

import { Http} from '@angular/http';

import { CacheService } from 'ionic-cache';

import { UserData } from './user-data';

import { AuthServiceProvider } from './auth-service/auth-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class BookData {
  data: any;
  books: Observable<any>;
  booksKey = 'books';

  // get url of api for books
  url: string = this.authService.apiUrl + 'books';

  // Specify custom TTL if you want
  ttl: number = 5;

  constructor(public http: Http, 
    public user: UserData, 
    private cache: CacheService,
    private authService: AuthServiceProvider) { 
   
  }

  load(): any {

  if (this.data) {
      // already loaded data
      return Observable.of(this.data);
    }

    else {

    let delayType = 'all';

    let req = this.http.get(this.url)
        .map(this.processData, this);

     return this.cache.loadFromDelayedObservable(this.url, req, this.booksKey, this.ttl, delayType);   

  }

}

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to books
    this.data = data.json();

    // loop through each book in the book
    this.data.books.forEach((book: any) => {
      // loop through each timeline group in the book
      book.groups.forEach((group: any) => {
        // loop through each book in the timeline group
        group.covers.forEach((cover: any) => {
        });
      });
    });

    return this.data;
  }

getTimeline(bookIndex: number, queryText = '', segment = 'all') {

    return this.load().map((data: any) => {
      let book = data.books[bookIndex];
      book.shownBooks = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      book.groups.forEach((group: any) => {
        group.hide = true;

        group.covers.forEach((cover: any) => {
          // check if this book should show or not
          this.filterBook(cover, queryWords, segment);

          if (!cover.hide) {
            // if this book is not hidden then this group should show
            group.hide = false;
            book.shownBooks++;
          }
        });

      });

      return book;

    })

  }

  filterBook(book: any, queryWords: string[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the book name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (book.title.toLowerCase().indexOf(queryWord) > -1 || 
          book.author.toLowerCase().indexOf(queryWord) > -1 || 
          book.genre.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this book passes the query test
      matchesQueryText = true;
    }

    // if any of the books tracks are not in the
    // exclude tracks then this book passes the track test
    

    // if the segement is 'favorites', but book is not a user favorite
    // then this book does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(book.title)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    book.hide = !(matchesQueryText && matchesSegment);
  }



}
