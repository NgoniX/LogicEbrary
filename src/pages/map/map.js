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
import { Platform, ActionSheetController, Config } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
var MapPage = /** @class */ (function () {
    function MapPage(platform, config, actionSheetCtrl, inAppBrowser) {
        this.platform = platform;
        this.config = config;
        this.actionSheetCtrl = actionSheetCtrl;
        this.inAppBrowser = inAppBrowser;
    }
    MapPage.prototype.goToWebsite = function () {
        this.inAppBrowser.create("https://logicebrary.co.zw/", '_blank');
    };
    MapPage.prototype.goToFB = function () {
        this.inAppBrowser.create("https://facebook.com/", '_blank');
    };
    MapPage.prototype.goToTwitter = function () {
        this.inAppBrowser.create("https://twitter.com/", '_blank');
    };
    MapPage.prototype.openContact = function (contact) {
        var mode = this.config.get('mode');
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Contact Hilary Shoniwa',
            buttons: [
                {
                    text: "Email: info@logicebrary.co.zw",
                    icon: mode !== 'ios' ? 'mail' : null,
                    handler: function () {
                        window.open('mailto: info@logicebrary.co.zw');
                    }
                },
                {
                    text: "Phone: +263 4 781 748",
                    icon: mode !== 'ios' ? 'call' : null,
                    handler: function () {
                        window.open('tel: 263 4 781 748');
                    }
                },
                {
                    text: "Cell: +263 783 790 230",
                    icon: mode !== 'ios' ? 'call' : null,
                    handler: function () {
                        window.open('tel: +263 783 790 230');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    MapPage = __decorate([
        Component({
            selector: 'page-map',
            templateUrl: 'map.html'
        }),
        __metadata("design:paramtypes", [Platform,
            Config,
            ActionSheetController,
            InAppBrowser])
    ], MapPage);
    return MapPage;
}());
export { MapPage };
//# sourceMappingURL=map.js.map