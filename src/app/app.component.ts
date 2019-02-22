import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    
    @ViewChild(Nav) nav: Nav;
    rootPage: any = HomePage;


    constructor(public platform: Platform, 
                public statusBar: StatusBar, 
                public splashScreen: SplashScreen, 
                private uid: Uid, 
                private androidPermissions: AndroidPermissions) {

        this.initializeApp();
    }


    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            /* HABILITAR ESTO */
            this.getImei()
        });
    }


    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }


    async getImei() {
        const { hasPermission } = await this.androidPermissions.checkPermission(
            this.androidPermissions.PERMISSION.READ_PHONE_STATE
        );

        if (!hasPermission) {
            const result = await this.androidPermissions.requestPermission(
                this.androidPermissions.PERMISSION.READ_PHONE_STATE
            );

            if (!result.hasPermission) {
                throw new Error('Permissions required');
            }

            // ok, a user gave us permission, we can get him identifiers after restart app
            return;
        }    
        
        localStorage.setItem("IMEI", this.uid.IMEI);
    }
}
