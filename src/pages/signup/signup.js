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
import { NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { TabsPage } from '../tabs/tabs';
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, userData, authService) {
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.authService = authService;
        this.signup = {};
        this.submitted = false;
    }
    SignupPage.prototype.onSignup = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            //Api connections
            this.authService.postData(this.signup, "signup").then(function (result) {
                _this.responseData = result;
                if (JSON.stringify(_this.responseData.error)) {
                    //show errors
                    _this.dataInfo = JSON.stringify(_this.responseData.error).replace(/^"(.*)"$/, '$1');
                }
                else {
                    localStorage.setItem('userInfo', JSON.stringify(_this.responseData));
                    _this.userData.signup(_this.signup.username);
                    _this.navCtrl.push(TabsPage);
                }
                console.log(_this.signup);
            }, function (err) {
                //Connection failed message
                console.log(err);
            });
        }
        else {
            console.log("Give valid information.");
        }
    };
    SignupPage = __decorate([
        Component({
            selector: 'page-user',
            templateUrl: 'signup.html'
        }),
        __metadata("design:paramtypes", [NavController, UserData,
            AuthServiceProvider])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map