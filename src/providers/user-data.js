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
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
var UserData = /** @class */ (function () {
    function UserData(events, storage) {
        this.events = events;
        this.storage = storage;
        this._favorites = [];
        this.HAS_LOGGED_IN = 'hasLoggedIn';
        this.HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    }
    UserData.prototype.storeData = function () {
        localStorage.setItem("favorites", JSON.stringify(this._favorites));
    };
    UserData.prototype.loadData = function () {
        var favorites = localStorage.getItem("favorites");
        if (favorites == null) {
            return false;
        }
        this._favorites = JSON.parse(favorites);
    };
    UserData.prototype.hasFavorite = function (bookName) {
        this.loadData();
        return (this._favorites.indexOf(bookName) > -1);
    };
    ;
    UserData.prototype.addFavorite = function (bookName) {
        this._favorites.push(bookName);
        this.storeData();
    };
    ;
    UserData.prototype.removeFavorite = function (bookName) {
        var index = this._favorites.indexOf(bookName);
        if (index > -1) {
            this._favorites.splice(index, 1);
        }
        this.storeData();
    };
    ;
    UserData.prototype.login = function (username) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.events.publish('user:login');
    };
    ;
    UserData.prototype.signup = function (username) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.events.publish('user:signup');
    };
    ;
    UserData.prototype.logout = function () {
        this.storage.remove(this.HAS_LOGGED_IN);
        this.storage.remove('userData');
        this.events.publish('user:logout');
    };
    ;
    UserData.prototype.setUsername = function (username) {
        this.storage.set('userData', username);
    };
    ;
    UserData.prototype.getUsername = function () {
        return this.storage.get('userData').then(function (value) {
            return value;
        });
    };
    ;
    UserData.prototype.hasLoggedIn = function () {
        return this.storage.get(this.HAS_LOGGED_IN).then(function (value) {
            return value === true;
        });
    };
    ;
    UserData.prototype.checkHasSeenTutorial = function () {
        return this.storage.get(this.HAS_SEEN_TUTORIAL).then(function (value) {
            return value;
        });
    };
    ;
    UserData = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Events,
            Storage])
    ], UserData);
    return UserData;
}());
export { UserData };
//# sourceMappingURL=user-data.js.map