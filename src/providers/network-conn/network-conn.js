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
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/*
  Generated class for the NetworkConnProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var NetworkConnProvider = /** @class */ (function () {
    function NetworkConnProvider(network, toast) {
        this.network = network;
        this.toast = toast;
    }
    NetworkConnProvider.prototype.displayNetworkUpdate = function (connectionState) {
        var networkType = this.network.type;
        this.toast.create({
            message: "You are now " + connectionState + " via " + networkType,
            duration: 3000
        }).present();
    };
    // display network presence
    NetworkConnProvider.prototype.networkConnect = function () {
        var _this = this;
        this.connected = this.network.onConnect().subscribe(function (data) {
            console.log(data);
            _this.displayNetworkUpdate(data.type);
        }, function (error) { return console.error(error); });
        this.disconnected = this.network.onDisconnect().subscribe(function (data) {
            console.log(data);
            _this.displayNetworkUpdate(data.type);
        }, function (error) { return console.error(error); });
    };
    // on leave connection
    NetworkConnProvider.prototype.networkDisconnect = function () {
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
    };
    NetworkConnProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Network, ToastController])
    ], NetworkConnProvider);
    return NetworkConnProvider;
}());
export { NetworkConnProvider };
//# sourceMappingURL=network-conn.js.map