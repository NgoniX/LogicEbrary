var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var LogicApp = /** @class */ (function () {
    function LogicApp(events, userData, menu, platform, bookData, storage, splashScreen, cache, statusBar) {
        var _this = this;
        this.events = events;
        this.userData = userData;
        this.menu = menu;
        this.platform = platform;
        this.bookData = bookData;
        this.storage = storage;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        // List of pages that can be navigated to from the left menu
        // the left menu only works after login
        // the login page disables the left menu
        this.appPages = [
            { title: 'Home', name: 'TabsPage', component: TabsPage, tabComponent: BookPage, index: 0, icon: 'home' },
            { title: 'Contact Us', name: 'MapPage', component: MapPage, icon: 'contact' },
            { title: 'About Us', name: 'AboutPage', component: AboutPage, icon: 'information-circle' },
            { title: 'Visit Our Site', name: 'WebsitePage', component: WebsitePage, icon: 'globe' }
        ];
        this.loggedInPages = [
            { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
            { title: 'Logic Board', name: 'LogicBoardPage', component: LogicBoardPage, icon: 'easel' },
            { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
            { title: 'Bookmarks', name: 'BookmarksPage', component: BookmarksPage, icon: 'bookmark' },
            { title: 'Logic Cloud', name: 'LogicCloudPage', component: LogicCloudPage, icon: 'cloud' },
            { title: 'Publish Works', name: 'PublishWorksPage', component: PublishWorksPage, icon: 'build' },
            { title: 'Teaching Resources', name: 'TeachingResourcesPage', component: TeachingResourcesPage, icon: 'clipboard' },
            { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
        ];
        this.loggedOutPages = [
            { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
            { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
            { title: 'Bookmarks', name: 'BookmarksPage', component: BookmarksPage, icon: 'bookmark' },
            { title: 'Logic Cloud', name: 'LogicCloudPage', component: LogicCloudPage, icon: 'cloud' },
            { title: 'Publish Works', name: 'PublishWorksPage', component: PublishWorksPage, icon: 'build' },
            { title: 'Teaching Resources', name: 'TeachingResourcesPage', component: TeachingResourcesPage, icon: 'clipboard' },
            { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
        ];
        this.activitiesPages = [
            { title: 'Self Assessment', name: 'SelfAssessmentPage', component: SelfAssessmentPage, icon: 'body' },
            { title: 'Book Clubs', name: 'BookClubsPage', component: BookClubsPage, icon: 'book' },
            { title: 'Logic Games', name: 'LogicGamesPage', component: LogicGamesPage, icon: 'game-controller-b' },
            { title: 'Edutainment', name: 'EdutainmentPage', component: EdutainmentPage, icon: 'happy' },
            { title: 'Smart Tutor', name: 'SmartTutorPage', component: SmartTutorPage, icon: 'school' }
        ];
        cache.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
        // Check if the user has already seen the tutorial
        this.storage.get('hasSeenTutorial')
            .then(function (hasSeenTutorial) {
            if (hasSeenTutorial) {
                _this.rootPage = TabsPage;
            }
            else {
                _this.rootPage = TutorialPage;
            }
            _this.platformReady(window);
        });
        // load the book data
        bookData.load();
        // decide which menu items should be hidden by current login status stored in local storage
        this.userData.hasLoggedIn().then(function (hasLoggedIn) {
            _this.enableMenu(hasLoggedIn === true);
        });
        this.enableMenu(true);
        this.listenToLoginEvents();
    }
    LogicApp.prototype.openPage = function (page) {
        var params = {};
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
        }
        else {
            this.nav.setRoot(page.name, params).catch(function (err) {
                console.log("Didn't set nav root: " + err);
            });
        }
        if (page.logsOut === true) {
            // Give the menu time to close before changing to logged out
            this.userData.logout();
        }
    };
    LogicApp.prototype.openTutorial = function () {
        this.nav.setRoot(TutorialPage);
    };
    LogicApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('user:login', function () {
            _this.enableMenu(true);
        });
        this.events.subscribe('user:signup', function () {
            _this.enableMenu(true);
        });
        this.events.subscribe('user:logout', function () {
            _this.enableMenu(false);
        });
    };
    LogicApp.prototype.enableMenu = function (loggedIn) {
        this.menu.enable(loggedIn, 'loggedInMenu');
        this.menu.enable(!loggedIn, 'loggedOutMenu');
    };
    LogicApp.prototype.platformReady = function (window) {
        var _this = this;
        // Call any initial plugins when ready
        this.platform.ready().then(function () {
            _this.splashScreen.hide();
            _this.statusBar.backgroundColorByHexString("#8c0d82"); // change color
            var notificationOpenedCallback = function (jsonData) {
                console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
            };
            window["plugins"].OneSignal
                .startInit("15738eef-3c05-4077-9041-21d6eed968dc", "275484742585")
                .handleNotificationOpened(notificationOpenedCallback)
                .endInit();
        });
    };
    LogicApp.prototype.isActive = function (page) {
        var childNav = this.nav.getActiveChildNav();
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
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], LogicApp.prototype, "nav", void 0);
    LogicApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Events,
            UserData,
            MenuController,
            Platform,
            BookData,
            Storage,
            SplashScreen,
            CacheService,
            StatusBar])
    ], LogicApp);
    return LogicApp;
}());
export { LogicApp };
//# sourceMappingURL=app.component.js.map