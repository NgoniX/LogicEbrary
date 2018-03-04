import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-view-book',
  templateUrl: 'view-book.html',
})
export class ViewBookPage {
	book: any;
	pdfUrl: SafeResourceUrl;

  constructor(private domSanitizer: DomSanitizer, 
  	          public navCtrl: NavController, 
  	          public navParams: NavParams) {

  	this.book = navParams.data.book;
  	// get url of pdf and embed in iframe from google docs


  	this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
  		'http://docs.google.com/gview?url='+this.book+'&embedded=true');



  }

  ionViewDidLoad() {
    console.log(this.book);
  }


  // setBook(bookView: any){
  //   return this.storage.set('bookView', bookView);
  // };

  // getBook(): Promise<any> {
  //   return this.storage.get('bookView').then((value) => {

  //     if(value){
  //      return this.pdfUrl = value; 
  //     }

  //   });
  // };


}
