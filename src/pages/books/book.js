var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ViewChild } from '@angular/core';
import { AlertController, App, List, ModalController, NavController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree } from '@ionic-native/admob-free';
import { BookData } from '../../providers/book-data';
import { UserData } from '../../providers/user-data';
import { BookDetailPage } from '../book-detail/book-detail';
import { BookFilterPage } from '../book-filter/book-filter';
import { Storage } from '@ionic/storage';
import { NetworkConnProvider } from '../../providers/network-conn/network-conn';
var BookPage = /** @class */ (function () {
    function BookPage(alertCtrl, app, loadingCtrl, modalCtrl, navCtrl, toastCtrl, bookData, storage, socialSharing, networkConn, platform, adMobFree, user) {
        // this.storage.clear().then(()=>{
        // console.log('all keys are cleared');
        // });
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.bookData = bookData;
        this.storage = storage;
        this.socialSharing = socialSharing;
        this.networkConn = networkConn;
        this.platform = platform;
        this.adMobFree = adMobFree;
        this.user = user;
        this.dayIndex = 0;
        this.queryText = '';
        this.segment = 'all';
        this.excludeTracks = [];
        this.shownBooks = [];
        this.groups = [];
        //this.getBooks();
    }
    // show network connection message
    BookPage.prototype.ionViewDidEnter = function () {
        this.networkConn.networkConnect();
    };
    BookPage.prototype.ionViewWillLeave = function () {
        this.networkConn.networkDisconnect();
    };
    BookPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.app.setTitle('Book');
        this.presentLoading();
        this.loader.present().then(function () {
            _this.updateBook();
            _this.loader.dismiss();
        });
        //show ads here
        this.showBannerAd();
    };
    // saveBooks(book:any){
    //   this.groups.push(book);
    //   this.storeBooks.save(this.groups);
    // }
    BookPage.prototype.setBooks = function (books) {
        return this.storage.set('books', books);
    };
    ;
    BookPage.prototype.getBooks = function () {
        var _this = this;
        return this.storage.get('books').then(function (value) {
            if (value) {
                return _this.groups = value;
            }
        });
    };
    ;
    BookPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...',
        });
    };
    BookPage.prototype.updateBook = function () {
        var _this = this;
        // Close any open sliding items when the Book updates
        this.bookList && this.bookList.closeSlidingItems();
        this.bookData.getTimeline(this.dayIndex, this.queryText, this.segment)
            .subscribe(function (data) {
            _this.shownBooks = data.shownBooks;
            _this.groups = data.groups;
            //this.setBooks(data.groups)
            /////////////////////////
        });
    };
    // infinite scroll
    // doInfinite(e:any): Promise<any> {
    //   console.log("Begin async operation");
    //  return new Promise(resolve => {
    //     setTimeout(() => {
    //        // API Connection for more updates
    //        //this.loadMoreBooks();
    //        resolve();
    //      }, 500);
    //     });
    // }
    BookPage.prototype.presentFilter = function () {
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
    BookPage.prototype.goToBookDetail = function (bookData) {
        // go to the book detail page
        // and pass in the book data
        this.navCtrl.push(BookDetailPage, {
            title: bookData.title,
            book: bookData
        });
    };
    BookPage.prototype.addFavorite = function (slidingItem, bookData) {
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
    BookPage.prototype.removeFavorite = function (slidingItem, bookData, title) {
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
    BookPage.prototype.openSocial = function (network, fab) {
        if (network === "Whatsapp") {
            this.socialSharing.shareViaWhatsApp("Share Via WhatsApp", null, "https://play.google.com/store/apps/details?id=io.ionic.logicebraryapp").then(function () {
                console.log("shareViaWhatsApp: Success");
            }).catch(function (err) {
                console.error("shareViaWhatsApp: failed- " + err);
            });
        }
        else if (network === "Twitter") {
            this.socialSharing.shareViaTwitter("shareViaTwitter", "assets/img/logo.jpg", "Logic Url").then(function () {
                console.log("shareViaTwitter: Success");
            }).catch(function (err) {
                console.error("shareViaTwitter: failed- " + err);
            });
        }
        else if (network === "Facebook") {
            this.socialSharing.shareViaFacebook("shareViaFacebook", "assets/img/logo.jpg", "Logic Url").then(function () {
                console.log("shareViaFacebook: Success");
            }).catch(function (err) {
                console.error("shareViaFacebook: failed- " + err);
            });
        }
        else if (network === "Mail") {
            this.socialSharing.shareViaSMS("shareViaSMS", "mobile-no").then(function () {
                console.log("shareViaSMS: Success");
            }).catch(function (err) {
                console.error("shareViaSMS: failed- " + err);
            });
        }
    };
    BookPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.bookData.getTimeline(this.dayIndex, this.queryText, this.segment).
            subscribe(function (data) {
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
    //show banner ads
    BookPage.prototype.showBannerAd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bannerConfig, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('cordova')) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        bannerConfig = {
                            id: 'ca-app-pub-4322995895522806/5333338225',
                            autoShow: true
                        };
                        this.adMobFree.banner.config(bannerConfig);
                        return [4 /*yield*/, this.adMobFree.banner.prepare()];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        ViewChild('bookList', { read: List }),
        __metadata("design:type", List)
    ], BookPage.prototype, "bookList", void 0);
    BookPage = __decorate([
        Component({
            selector: 'page-book',
            templateUrl: 'book.html'
        }),
        __metadata("design:paramtypes", [AlertController,
            App,
            LoadingController,
            ModalController,
            NavController,
            ToastController,
            BookData,
            Storage,
            SocialSharing,
            NetworkConnProvider,
            Platform,
            AdMobFree,
            UserData])
    ], BookPage);
    return BookPage;
}());
export { BookPage };
//# sourceMappingURL=book.js.map