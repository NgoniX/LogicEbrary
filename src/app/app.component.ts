import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { BookPage } from '../pages/books/book';
import { BookClubsPage } from '../pages/book-clubs/book-clubs';
import { LogicGamesPage } from '../pages/logic-games/logic-games';
import { TeachingResourcesPage } from '../pages/teaching-resources/teaching-resources';
import { PublishWorksPage } from '../pages/publish-works/publish-works';
import { SupportPage } from '../pages/support/support';
import { WebsitePage } from '../pages/website/website';
import { EdutainmentPage } from '../pages/edutainment/edutainment';
import { BookmarksPage } from '../pages/bookmarks/bookmarks';
import { LogicCloudPage } from '../pages/logic-cloud/logic-cloud';
import { SmartTutorPage } from '../pages/smart-tutor/smart-tutor';
import { LogicBoardPage } from '../pages/logic-board/logic-board';
import { SelfAssessmentPage } from '../pages/self-assessment/self-assessment';

import { BookData } from '../providers/book-data';
import { UserData } from '../providers/user-data';

import { CacheService } from "ionic-cache";
import { TranslateService,  LangChangeEvent } from '@ngx-translate/core';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class LogicApp {

  textDir: string = "ltr";

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Home', name: 'TabsPage', component: TabsPage, tabComponent: BookPage, index: 0, icon: 'home' },
    { title: 'Contact Us', name: 'MapPage', component: MapPage, icon: 'contact' },
    { title: 'About Us', name: 'AboutPage', component: AboutPage, icon: 'information-circle' },
    { title: 'Visit Our Site', name: 'WebsitePage', component: WebsitePage, icon: 'globe' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Logic Board', name: 'LogicBoardPage', component: LogicBoardPage, icon: 'easel' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Bookmarks', name: 'BookmarksPage', component: BookmarksPage, icon: 'bookmark' },
    { title: 'Logic Cloud', name: 'LogicCloudPage', component: LogicCloudPage, icon: 'cloud' },
    { title: 'Publish Works', name: 'PublishWorksPage', component: PublishWorksPage, icon: 'build' },
    { title: 'Teaching Resources', name: 'TeachingResourcesPage', component: TeachingResourcesPage, icon: 'clipboard' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Bookmarks', name: 'BookmarksPage', component: BookmarksPage, icon: 'bookmark' },
    { title: 'Logic Cloud', name: 'LogicCloudPage', component: LogicCloudPage, icon: 'cloud' },
    { title: 'Publish Works', name: 'PublishWorksPage', component: PublishWorksPage, icon: 'build' },
    { title: 'Teaching Resources', name: 'TeachingResourcesPage', component: TeachingResourcesPage, icon: 'clipboard' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
  ];
  activitiesPages: PageInterface[] = [
    { title: 'Self Assessment', name: 'SelfAssessmentPage', component: SelfAssessmentPage, icon: 'body' },
    { title: 'Book Clubs', name: 'BookClubsPage', component: BookClubsPage, icon: 'book' },
    { title: 'Logic Games', name: 'LogicGamesPage', component: LogicGamesPage, icon: 'game-controller-b' },
    { title: 'Edutainment', name: 'EdutainmentPage', component: EdutainmentPage, icon: 'happy' },
    { title: 'Smart Tutor', name: 'SmartTutorPage', component: SmartTutorPage, icon: 'school' }
    
  ];

  rootPage: any;
  page: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public bookData: BookData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    cache: CacheService,
    private statusBar: StatusBar,
    public translate: TranslateService
  ) {

    translate.setDefaultLang('en');
    translate.use('en');

    cache.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour

    // Keep our cached results when device is offline!
      cache.setOfflineInvalidate(false);

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady(window)
      });

    // load the book data
    bookData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();

    //this is to determine the text direction depending on the selected language
    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      this.textDir = event.lang == 'ar'? 'rtl' : 'ltr';
    });

  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    // Set the root of the nav with params if it's a tab index
  } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady(window:any) {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();

      this.statusBar.backgroundColorByHexString("#8c0d82"); // change color

      var notificationOpenedCallback = function(jsonData:any) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
     };

     window["plugins"].OneSignal
     .startInit("15738eef-3c05-4077-9041-21d6eed968dc", "275484742585")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
  

    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  

}
