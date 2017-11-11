import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      //this.showMap();
    });
  }

  ionViewDidLoad() {
    this.showMap();
  }

  showMap() {
    const location = new google.maps.LatLng(14.555830, 121.023909);

    const options = {
      center: location,
      zoom: 16
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }
}
