import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { BookData } from '../../providers/book-data';
import { UserData } from '../../providers/user-data';

import { BookDetailPage } from '../book-detail/book-detail';
import { BookFilterPage } from '../book-filter/book-filter';

import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from './../../providers/language/language';
import { LanguageModel } from "../../models/language.model";

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
})

export class BookPage {

  languageSelected : any = 'en';
  languages : Array<LanguageModel>;

  // the list is a child of the Book page
  // @ViewChild('BookList') gets a reference to the list
  // with the variable #BookList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('bookList', { read: List }) bookList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownBooks: any = [];
  groups: any = [];
  confDate: string;
  loader: any;
  data: any;
  errorMessage: string;


  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public bookData: BookData,
    private socialSharing: SocialSharing,
    public user: UserData,
    public translate: TranslateService,
    public admob: AdMobFree,
    public languageService: LanguageProvider
  ) {

    this.languages = this.languageService.getLanguages();
    this.setLanguage();
    // this.storage.clear().then(()=>{
    // console.log('all keys are cleared');
    // });

    //this.getBooks();
    this.showBanner();

   }

   // show network connection message
   ionViewDidEnter() {

   }

   ionViewWillLeave(){
   }

  // select language
  setLanguage(){
    let defaultLanguage = this.translate.getDefaultLang();
    if(this.languageSelected){
      this.translate.setDefaultLang(this.languageSelected);
      this.translate.use(this.languageSelected);
    }else{
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
    }
}


  ionViewDidLoad() {
    this.app.setTitle('Book');

    this.presentLoading();

    this.loader.present().then(() => {

      this.updateBook();
      this.loader.dismiss();

    });


  }

  // saveBooks(book:any){
  //   this.groups.push(book);
  //   this.storeBooks.save(this.groups);
  // }

  presentLoading(){

    this.loader = this.loadingCtrl.create({
    content: 'Please wait...',
    });

  }


  updateBook() {
    // Close any open sliding items when the Book updates
    this.bookList && this.bookList.closeSlidingItems();


    this.bookData.getTimeline(this.dayIndex, this.queryText, this.segment)
    .subscribe((data: any) => {

      this.shownBooks = data.shownBooks;
      this.groups = data.groups;

      //this.setBooks(data.groups)


      /////////////////////////

    });

  }

 // admob
  showBanner() {

    let bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id: "ca-app-pub-4322995895522806/2796275263"
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
        // success
    }).catch(e => console.log(e));

}


  //infinite scroll
  doInfinite(e:any): Promise<any> {
    console.log("Begin async operation");
   return new Promise(resolve => {
      setTimeout(() => {
         // API Connection for more updates
         //this.loadMoreBooks();

         resolve();
       }, 500);
      });
  }




  presentFilter() {
    let modal = this.modalCtrl.create(BookFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateBook();
      }
    });

  }

  goToBookDetail(bookData: any) {
    // go to the book detail page
    // and pass in the book data
    this.navCtrl.push(BookDetailPage, {
      title: bookData.title,
      book: bookData
    });
  }

  addFavorite(slidingItem: ItemSliding, bookData: any) {

    if (this.user.hasFavorite(bookData.title)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, bookData, 'Book already shelved');
    } else {
      // remember this book as a user favorite
      this.user.addFavorite(bookData.title);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Book Shelved',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, bookData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this book from your book shelf?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the book
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this book from their favorites
            this.user.removeFavorite(bookData.title);
            this.updateBook();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    if (network === "Whatsapp") {

    this.socialSharing.shareViaWhatsApp("Share Via WhatsApp", null, "https://play.google.com/store/apps/details?id=io.ionic.logicebraryapp").then(() => {
      console.log("shareViaWhatsApp: Success");
    }).catch((err) => {
      console.error("shareViaWhatsApp: failed- "+err);
    });

    }

     else if(network === "Twitter"){
     this.socialSharing.shareViaTwitter("shareViaTwitter", "assets/img/logo.jpg", "Logic Url").then(() => {
      console.log("shareViaTwitter: Success");
    }).catch((err) => {
      console.error("shareViaTwitter: failed- "+err);
    });
    }

    else if(network === "Facebook"){
     this.socialSharing.shareViaFacebook("shareViaFacebook", "assets/img/logo.jpg", "Logic Url").then(() => {
      console.log("shareViaFacebook: Success");
    }).catch((err) => {
      console.error("shareViaFacebook: failed- "+err);
    });
    }

    else if(network === "Mail"){
     this.socialSharing.shareViaSMS("shareViaSMS", "mobile-no").then(() => {
      console.log("shareViaSMS: Success");
    }).catch((err) => {
      console.error("shareViaSMS: failed- "+err);
    });
    }

  }

  doRefresh(refresher: Refresher) {
    this.bookData.getTimeline(this.dayIndex, this.queryText, this.segment).
    subscribe((data: any) => {
      this.shownBooks = data.shownBooks;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Books have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }




}
