import { Injectable } from '@angular/core';

import { Http} from '@angular/http';

import { UserData } from './user-data';

import { AuthServiceProvider } from './auth-service/auth-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class AcademicData {
  data: any;

  constructor(public http: Http, public user: UserData, private authService: AuthServiceProvider) { 
   
  }


  load(): any {
    
   // get url of api for audio books
   let url = this.authService.apiUrl + 'academicBooks';

  if (this.data) {
      // already loaded data
      return Observable.of(this.data);
    }

    else {

     return this.http.get(url)
        .map(this.processData, this);

  }

}

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to books
    this.data = data.json();

    this.data.tracks = [];

    // loop through each day in the book
    this.data.books.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each book in the timeline group
        group.covers.forEach((cover: any) => {
        });
      });
    });

    return this.data;
  }

getTimeline(dayIndex: number, queryText = '', segment = 'all') {

    return this.load().map((data: any) => {
      let day = data.books[dayIndex];
      day.shownBooks = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      day.groups.forEach((group: any) => {
        group.hide = true;

        group.covers.forEach((cover: any) => {
          // check if this book should show or not
          this.filterBook(cover, queryWords, segment);

          if (!cover.hide) {
            // if this book is not hidden then this group should show
            group.hide = false;
            day.shownBooks++;
          }
        });

      });

      return day;

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
