import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, private facebook: Facebook,
    public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
  }  

  register(): void {
    this.navCtrl.push('RegisterPage');
  }

  loginWithEmail(user: User): void {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        this.navCtrl.setRoot('HomePage', {}, {animate: true, direction: 'forward'});
        
      })
        .catch(err => {
          // Handle error
          let toast = this.toast.create({
            message: err.message,
            duration: 3000
          });
          toast.present();
        });
  }

  loginWithFB() {    
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential)
          .then(result => this.navCtrl.setRoot('HomePage', {}, {animate: true, direction: 'forward'}))
          .catch(err => {
            let toast = this.toast.create({
              message: err.message,
              duration: 3000
            });
            toast.present();
          });
      })
      .catch(err => {
        let toast = this.toast.create({
          message: err.message,
          duration: 3000
        });
        toast.present();
      });
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => this.navCtrl.setRoot('HomePage', {}, {animate: true, direction: 'forward'}))
        .catch(err => {
          let toast = this.toast.create({
            message: err.message,
            duration: 3000
          });
          toast.present();
        });
    }
  }
 

  async loginFacebook() {
    if (this.platform.is('cordova')) {    
      const result = await this.facebook.login(['email', 'public_profile'])
      if (result) {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
        const res = await firebase.auth().signInWithCredential(facebookCredential);
        if (res) {
          this.navCtrl.setRoot('HomePage');
        }
      }
      
      // this.facebook.login(['email', 'public_profile']).then(res => {
      //   const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      //   firebase.auth().signInWithCredential(facebookCredential)
      //     .then(res => { this.navCtrl.setRoot('HomePage'); });
      // })
    }
    else {
      try {
        const result = await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        if (result) {
          console.log(result)
        }  
      }
      catch (err) {
        // Handle error
        let toast = this.toast.create({
          message: err.message,
          duration: 3000
        });
        toast.present();
      }
    }
  }  
}
