import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions} from '@ionic-native/android-permissions';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

// este no va ni el que esta mas abajo en providers
import { Geolocation } from '@ionic-native/geolocation';


/* Components */
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


/* Providers */
import { PreferStorage } from '../providers/preferStorage';
import { PrincipalProvider } from '../providers/principal';
import { CoordenadasProvider } from '../providers/coordenadas/coordenadas';


/* Variables de firebase */   
export const firebaseConfig = {
    apiKey: "AIzaSyAwnjchcSuE-Bthp6WLXYKjdSA-_SrcEO4",
    authDomain: "coordenadasapp.firebaseapp.com",
    databaseURL: "https://coordenadasapp.firebaseio.com",
    projectId: "coordenadasapp",
    storageBucket: "coordenadasapp.appspot.com",
    messagingSenderId: "562595134531"
};


@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AngularFireDatabase,
        Uid,
        AndroidPermissions,
        BackgroundGeolocation,
        PreferStorage,
        PrincipalProvider,
        CoordenadasProvider,
        Geolocation,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
