var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree } from '@ionic-native/admob-free';
import { CacheModule } from "ionic-cache";
import { IonAffixModule } from 'ion-affix/dist';
import { IonicAudioModule, defaultAudioProviderFactory } from 'ionic-audio';
import { Badge } from '@ionic-native/badge';
import { LogicApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { BookPage } from '../pages/books/book';
import { BookFilterPage } from '../pages/book-filter/book-filter';
import { BookDetailPage } from '../pages/book-detail/book-detail';
import { BookClubsPage } from '../pages/book-clubs/book-clubs';
import { AudioPage } from '../pages/audio/audio';
import { AcademicPage } from '../pages/academic/academic';
import { StorePage } from '../pages/store/store';
import { LogicGamesPage } from '../pages/logic-games/logic-games';
import { TeachingResourcesPage } from '../pages/teaching-resources/teaching-resources';
import { ViewBookPage } from '../pages/view-book/view-book';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { PublishWorksPage } from '../pages/publish-works/publish-works';
import { EdutainmentPage } from '../pages/edutainment/edutainment';
import { WebsitePage } from '../pages/website/website';
import { BookmarksPage } from '../pages/bookmarks/bookmarks';
import { LogicCloudPage } from '../pages/logic-cloud/logic-cloud';
import { SmartTutorPage } from '../pages/smart-tutor/smart-tutor';
import { LogicBoardPage } from '../pages/logic-board/logic-board';
import { SelfAssessmentPage } from '../pages/self-assessment/self-assessment';
import { BookData } from '../providers/book-data';
import { AudioData } from '../providers/audio-data';
import { AcademicData } from '../providers/academic-data';
import { UserData } from '../providers/user-data';
import { NetworkConnProvider } from '../providers/network-conn/network-conn';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ParallaxHeaderDirective } from '../directives/parallax-header/parallax-header';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                LogicApp,
                AboutPage,
                AccountPage,
                LoginPage,
                MapPage,
                PopoverPage,
                BookPage,
                AudioPage,
                AcademicPage,
                StorePage,
                BookFilterPage,
                BookDetailPage,
                BookClubsPage,
                LogicGamesPage,
                TeachingResourcesPage,
                ViewBookPage,
                SignupPage,
                TabsPage,
                TutorialPage,
                SupportPage,
                PublishWorksPage,
                EdutainmentPage,
                WebsitePage,
                BookmarksPage,
                LogicCloudPage,
                SmartTutorPage,
                LogicBoardPage,
                SelfAssessmentPage,
                ParallaxHeaderDirective
            ],
            imports: [
                BrowserModule,
                HttpModule,
                IonicModule.forRoot(LogicApp, {}, {
                    links: [
                        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
                        { component: BookPage, name: 'book', segment: 'book' },
                        { component: BookDetailPage, name: 'BookDetail', segment: 'bookDetail/:name' },
                        { component: BookFilterPage, name: 'bookFilter', segment: 'bookFilter' },
                        { component: BookClubsPage, name: 'BookClubsPage', segment: 'BookClubsPage' },
                        { component: AudioPage, name: 'AudioPage', segment: 'AudioPage' },
                        { component: AcademicPage, name: 'AcademicPage', segment: 'AcademicPage' },
                        { component: StorePage, name: 'StorePage', segment: 'StorePage' },
                        { component: LogicGamesPage, name: 'LogicGamesPage', segment: 'LogicGamesPage' },
                        { component: TeachingResourcesPage, name: 'TeachingResourcesPage', segment: 'TeachingResourcesPage' },
                        { component: MapPage, name: 'MapPage', segment: 'map' },
                        { component: AboutPage, name: 'AboutPage', segment: 'about' },
                        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
                        { component: SupportPage, name: 'SupportPage', segment: 'support' },
                        { component: PublishWorksPage, name: 'PublishWorksPage', segment: 'PublishWorksPage' },
                        { component: EdutainmentPage, name: 'EdutainmentPage', segment: 'EdutainmentPage' },
                        { component: WebsitePage, name: 'WebsitePage', segment: 'WebsitePage' },
                        { component: BookmarksPage, name: 'BookmarksPage', segment: 'BookmarksPage' },
                        { component: LogicCloudPage, name: 'LogicCloudPage', segment: 'LogicCloudPage' },
                        { component: SmartTutorPage, name: 'SmartTutorPage', segment: 'SmartTutorPage' },
                        { component: LogicBoardPage, name: 'LogicBoardPage', segment: 'LogicBoardPage' },
                        { component: SelfAssessmentPage, name: 'SelfAssessmentPage', segment: 'SelfAssessmentPage' },
                        { component: LoginPage, name: 'LoginPage', segment: 'login' },
                        { component: AccountPage, name: 'AccountPage', segment: 'account' },
                        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
                    ]
                }),
                IonicStorageModule.forRoot(),
                CacheModule.forRoot(),
                IonicAudioModule.forRoot(defaultAudioProviderFactory),
                IonAffixModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                LogicApp,
                AboutPage,
                AccountPage,
                LoginPage,
                MapPage,
                PopoverPage,
                BookPage,
                AudioPage,
                AcademicPage,
                StorePage,
                BookFilterPage,
                BookDetailPage,
                BookClubsPage,
                LogicGamesPage,
                TeachingResourcesPage,
                ViewBookPage,
                SignupPage,
                TabsPage,
                TutorialPage,
                SupportPage,
                EdutainmentPage,
                WebsitePage,
                BookmarksPage,
                LogicCloudPage,
                SmartTutorPage,
                LogicBoardPage,
                SelfAssessmentPage,
                PublishWorksPage
            ],
            providers: [
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                BookData,
                AudioData,
                AcademicData,
                UserData,
                InAppBrowser,
                SplashScreen,
                Network,
                NetworkConnProvider,
                SocialSharing,
                Badge,
                AdMobFree,
                AuthServiceProvider,
                StatusBar
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map