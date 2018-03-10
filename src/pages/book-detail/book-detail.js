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
import { NavParams, NavController } from 'ionic-angular';
import { ViewBookPage } from '../view-book/view-book';
var BookDetailPage = /** @class */ (function () {
    function BookDetailPage(navParams, navCtrl) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.book = navParams.data.book;
    }
    BookDetailPage.prototype.readBook = function (bookFile) {
        this.navCtrl.push(ViewBookPage, {
            book: bookFile
        });
    };
    BookDetailPage = __decorate([
        Component({
            selector: 'page-book-detail',
            templateUrl: 'book-detail.html'
        }),
        __metadata("design:paramtypes", [NavParams, NavController])
    ], BookDetailPage);
    return BookDetailPage;
}());
export { BookDetailPage };
//# sourceMappingURL=book-detail.js.map