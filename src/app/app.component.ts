import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, private afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen) {
    const unsubscribe = this.afAuth.auth.onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else { 
        this.rootPage = 'HomePage';
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.checkPreviousAuthorization();      
      statusBar.styleDefault();
      splashScreen.hide();      
    });
  } 

  checkPreviousAuthorization(): void { 
    this.afAuth.authState.subscribe(auth => {
      if (!auth)
        this.rootPage = 'LoginPage';
      else
        this.rootPage = 'HomePage';
    });
  }
}

