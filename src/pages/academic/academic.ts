import { Component, ViewChild } from '@angular/core';

import { AlertController, App, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

import { AcademicData } from '../../providers/academic-data';
import { UserData } from '../../providers/user-data';

import { BookDetailPage } from '../book-detail/book-detail';
import { BookFilterPage } from '../book-filter/book-filter';

import { Storage } from '@ionic/storage';

import { NetworkConnProvider } from '../../providers/network-conn/network-conn';


@Component({
  selector: 'page-academic',
  templateUrl: 'academic.html'
})
export class AcademicPage {
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
  //last created variable
  postData = {
    lastCreated: ''
  }

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: AcademicData,
    private storage: Storage,
    private networkConn: NetworkConnProvider,
    public user: UserData
  ) { 

    // this.storage.clear().then(()=>{
    // console.log('all keys are cleared');
    // });

    this.postData.lastCreated = '';
    this.getBooks();
    console.log(this.getBooks());
    
   }

   // show network connection message
   ionViewDidEnter() {  
     
     this.networkConn.networkConnect();

   }

   ionViewWillLeave(){  
     this.networkConn.networkDisconnect();
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

  setBooks(books: any){
    return this.storage.set('books', books);
  };

  getBooks(): Promise<any> {
    return this.storage.get('books').then((value) => {

      if(value){
       return this.groups = value; 
      }

    });
  };

  presentLoading(){

    this.loader = this.loadingCtrl.create({
    content: 'Please wait...',
    });

  }


  updateBook() {
    // Close any open sliding items when the Book updates
    this.bookList && this.bookList.closeSlidingItems();

    
    this.confData.getTimeline(this.dayIndex, this.queryText, this.segment)
    .subscribe((data: any) => {

      this.shownBooks = data.shownBooks;
      this.groups = data.groups;

      this.setBooks(data.groups);
      // console.log(this.setBooks(data.groups));
      /////////////////////////

    });

    
  }


  doInfinite(infiniteScroll:any) {
    setTimeout(() => {
      this.confData.getTimeline(this.dayIndex, this.queryText, this.segment)
         .subscribe( (res: any) => {
             this.data = res;
             for(let i=0; i<this.data.data.length; i++) {
               this.groups.push(this.data.data[i]);
             }
           },
           (error:any) =>  this.errorMessage = <any>error);

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
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

 

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.segment).subscribe((data: any) => {
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
