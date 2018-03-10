var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CacheService } from 'ionic-cache';
import { UserData } from './user-data';
import { AuthServiceProvider } from './auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
var BookData = /** @class */ (function () {
    function BookData(http, user, cache, authService) {
        this.http = http;
        this.user = user;
        this.cache = cache;
        this.authService = authService;
        this.booksKey = 'books';
        // get url of api for books
        this.url = this.authService.apiUrl + 'books';
        // Specify custom TTL if you want
        this.ttl = 5;
    }
    BookData.prototype.load = function () {
        if (this.data) {
            // already loaded data
            return Observable.of(this.data);
        }
        else {
            var delayType = 'all';
            var req = this.http.get(this.url)
                .map(this.processData, this);
            return this.cache.loadFromDelayedObservable(this.url, req, this.booksKey, this.ttl, delayType);
        }
    };
    BookData.prototype.processData = function (data) {
        // just some good 'ol JS fun with objects and arrays
        // build up the data by linking speakers to books
        this.data = data.json();
        // loop through each book in the book
        this.data.books.forEach(function (book) {
            // loop through each timeline group in the book
            book.groups.forEach(function (group) {
                // loop through each book in the timeline group
                group.covers.forEach(function (cover) {
                });
            });
        });
        return this.data;
    };
    BookData.prototype.getTimeline = function (bookIndex, queryText, segment) {
        var _this = this;
        if (queryText === void 0) { queryText = ''; }
        if (segment === void 0) { segment = 'all'; }
        return this.load().map(function (data) {
            var book = data.books[bookIndex];
            book.shownBooks = 0;
            queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
            var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
            book.groups.forEach(function (group) {
                group.hide = true;
                group.covers.forEach(function (cover) {
                    // check if this book should show or not
                    _this.filterBook(cover, queryWords, segment);
                    if (!cover.hide) {
                        // if this book is not hidden then this group should show
                        group.hide = false;
                        book.shownBooks++;
                    }
                });
            });
            return book;
        });
    };
    BookData.prototype.filterBook = function (book, queryWords, segment) {
        var matchesQueryText = false;
        if (queryWords.length) {
            // of any query word is in the book name than it passes the query test
            queryWords.forEach(function (queryWord) {
                if (book.title.toLowerCase().indexOf(queryWord) > -1 ||
                    book.author.toLowerCase().indexOf(queryWord) > -1 ||
                    book.genre.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        }
        else {
            // if there are no query words then this book passes the query test
            matchesQueryText = true;
        }
        // if any of the books tracks are not in the
        // exclude tracks then this book passes the track test
        // if the segement is 'favorites', but book is not a user favorite
        // then this book does not pass the segment test
        var matchesSegment = false;
        if (segment === 'favorites') {
            if (this.user.hasFavorite(book.title)) {
                matchesSegment = true;
            }
        }
        else {
            matchesSegment = true;
        }
        // all tests must be true if it should not be hidden
        book.hide = !(matchesQueryText && matchesSegment);
    };
    BookData = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            UserData,
            CacheService,
            AuthServiceProvider])
    ], BookData);
    return BookData;
}());
export { BookData };
//# sourceMappingURL=book-data.js.map