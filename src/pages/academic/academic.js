var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { AlertController, App, List, ModalController, NavController, ToastController, LoadingController } from 'ionic-angular';
import { AcademicData } from '../../providers/academic-data';
import { UserData } from '../../providers/user-data';
import { BookDetailPage } from '../book-detail/book-detail';
import { BookFilterPage } from '../book-filter/book-filter';
import { Storage } from '@ionic/storage';
import { NetworkConnProvider } from '../../providers/network-conn/network-conn';
var AcademicPage = /** @class */ (function () {
    function AcademicPage(alertCtrl, app, loadingCtrl, modalCtrl, navCtrl, toastCtrl, confData, storage, networkConn, user) {
        // this.storage.clear().then(()=>{
        // console.log('all keys are cleared');
        // });
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.confData = confData;
        this.storage = storage;
        this.networkConn = networkConn;
        this.user = user;
        this.dayIndex = 0;
        this.queryText = '';
        this.segment = 'all';
        this.excludeTracks = [];
        this.shownBooks = [];
        this.groups = [];
        //last created variable
        this.postData = {
            lastCreated: ''
        };
        this.postData.lastCreated = '';
        this.getBooks();
        console.log(this.getBooks());
    }
    // show network connection message
    AcademicPage.prototype.ionViewDidEnter = function () {
        this.networkConn.networkConnect();
    };
    AcademicPage.prototype.ionViewWillLeave = function () {
        this.networkConn.networkDisconnect();
    };
    AcademicPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.app.setTitle('Book');
        this.presentLoading();
        this.loader.present().then(function () {
            _this.updateBook();
            _this.loader.dismiss();
        });
    };
    // saveBooks(book:any){
    //   this.groups.push(book);
    //   this.storeBooks.save(this.groups);
    // }
    AcademicPage.prototype.setBooks = function (books) {
        return this.storage.set('books', books);
    };
    ;
    AcademicPage.prototype.getBooks = function () {
        var _this = this;
        return this.storage.get('books').then(function (value) {
            if (value) {
                return _this.groups = value;
            }
        });
    };
    ;
    AcademicPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
        });
    };
    AcademicPage.prototype.updateBook = function () {
        var _this = this;
        // Close any open sliding items when the Book updates
        this.bookList && this.bookList.closeSlidingItems();
        this.confData.getTimeline(this.dayIndex, this.queryText, this.segment)
            .subscribe(function (data) {
            _this.shownBooks = data.shownBooks;
            _this.groups = data.groups;
            _this.setBooks(data.groups);
            // console.log(this.setBooks(data.groups));
            /////////////////////////
        });
    };
    AcademicPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            _this.confData.getTimeline(_this.dayIndex, _this.queryText, _this.segment)
                .subscribe(function (res) {
                _this.data = res;
                for (var i = 0; i < _this.data.data.length; i++) {
                    _this.groups.push(_this.data.data[i]);
                }
            }, function (error) { return _this.errorMessage = error; });
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 1000);
    };
    AcademicPage.prototype.presentFilter = function () {
        var _this = this;
        var modal = this.modalCtrl.create(BookFilterPage, this.excludeTracks);
        modal.present();
        modal.onWillDismiss(function (data) {
            if (data) {
                _this.excludeTracks = data;
                _this.updateBook();
            }
        });
    };
    AcademicPage.prototype.goToBookDetail = function (bookData) {
        // go to the book detail page
        // and pass in the book data
        this.navCtrl.push(BookDetailPage, {
            title: bookData.title,
            book: bookData
        });
    };
    AcademicPage.prototype.addFavorite = function (slidingItem, bookData) {
        if (this.user.hasFavorite(bookData.title)) {
            // woops, they already favorited it! What shall we do!?
            // prompt them to remove it
            this.removeFavorite(slidingItem, bookData, 'Book already shelved');
        }
        else {
            // remember this book as a user favorite
            this.user.addFavorite(bookData.title);
            // create an alert instance
            var alert_1 = this.alertCtrl.create({
                title: 'Book Shelved',
                buttons: [{
                        text: 'OK',
                        handler: function () {
                            // close the sliding item
                            slidingItem.close();
                        }
                    }]
            });
            // now present the alert on top of all other content
            alert_1.present();
        }
    };
    AcademicPage.prototype.removeFavorite = function (slidingItem, bookData, title) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: title,
            message: 'Would you like to remove this book from your book shelf?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        // they clicked the cancel button, do not remove the book
                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    }
                },
                {
                    text: 'Remove',
                    handler: function () {
                        // they want to remove this book from their favorites
                        _this.user.removeFavorite(bookData.title);
                        _this.updateBook();
                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    }
                }
            ]
        });
        // now present the alert on top of all other content
        alert.present();
    };
    AcademicPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.confData.getTimeline(this.dayIndex, this.queryText, this.segment).subscribe(function (data) {
            _this.shownBooks = data.shownBooks;
            _this.groups = data.groups;
            // simulate a network request that would take longer
            // than just pulling from out local json file
            setTimeout(function () {
                refresher.complete();
                var toast = _this.toastCtrl.create({
                    message: 'Books have been updated.',
                    duration: 3000
                });
                toast.present();
            }, 1000);
        });
    };
    __decorate([
        ViewChild('bookList', { read: List }),
        __metadata("design:type", List)
    ], AcademicPage.prototype, "bookList", void 0);
    AcademicPage = __decorate([
        Component({
            selector: 'page-academic',
            templateUrl: 'academic.html'
        }),
        __metadata("design:paramtypes", [AlertController,
            App,
            LoadingController,
            ModalController,
            NavController,
            ToastController,
            AcademicData,
            Storage,
            NetworkConnProvider,
            UserData])
    ], AcademicPage);
    return AcademicPage;
}());
export { AcademicPage };
//# sourceMappingURL=academic.js.map