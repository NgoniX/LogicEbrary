var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { BookData } from '../../providers/book-data';
var BookFilterPage = /** @class */ (function () {
    function BookFilterPage(bookData, navParams, viewCtrl) {
        // passed in array of track names that should be excluded (unchecked)
        this.bookData = bookData;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.tracks = [];
    }
    BookFilterPage.prototype.dismiss = function (data) {
        // using the injected ViewController this page
        // can "dismiss" itself and pass back data
        this.viewCtrl.dismiss(data);
    };
    BookFilterPage = __decorate([
        Component({
            selector: 'page-book-filter',
            templateUrl: 'book-filter.html'
        }),
        __metadata("design:paramtypes", [BookData,
            NavParams,
            ViewController])
    ], BookFilterPage);
    return BookFilterPage;
}());
export { BookFilterPage };
//# sourceMappingURL=book-filter.js.map