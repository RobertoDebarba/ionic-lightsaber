import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";

import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {DeviceMotion} from "@ionic-native/device-motion";
import {Flashlight} from "@ionic-native/flashlight";
import {MediaPlugin} from "@ionic-native/media";
import {LightSaberService} from "../providers/light-saber/light-saber.service";
import {InfoPage} from "../pages/info/info";
import {PersonService} from "../providers/person/person.service";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InfoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceMotion,
    Flashlight,
    MediaPlugin,
    LightSaberService,
    PersonService
  ]
})
export class AppModule {
}
