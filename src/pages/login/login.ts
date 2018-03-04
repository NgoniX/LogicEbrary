import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  responseData : any;
  dataInfo: any;
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData,
   private authService: AuthServiceProvider) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      this.authService.postData(this.login, "login").then((result) =>{
      this.responseData = result;

      if(JSON.stringify(this.responseData.error)){
          //show errors
          this.dataInfo = JSON.stringify(this.responseData.error).replace(/^"(.*)"$/, '$1');
       }

        else {
         localStorage.setItem('userInfo', JSON.stringify(this.responseData) )
         this.userData.login(this.login.username);
         this.navCtrl.push(TabsPage);
        }

        
        console.log(this.login);
        }, (err:any) => {
          //Connection failed message
          console.log(err);
        });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
