import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Repbase } from '../../models/repbase.model';
import { City } from '../../models/location.model';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map') mapElementRef: ElementRef;
  @Input() selectable = true;
  @Input() closeButtonText = 'Cancel';
  @Input() title = 'Pick location';
  @Input() city: City = this.authService.userIsAuthenticated ?
 this.authService.userCity : {name: 'Москва', lat: 55.75, lng: 37.61};
  @Input() markers: Repbase[] = [];

  clickListener: any;
  googleMaps: any;
  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  ngAfterViewInit() {
    this.getGoogleMaps().then(
      googleMaps => {
        this.googleMaps = googleMaps;
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: this.markers.length === 1 ?
           {lat: this.markers[0].location.lat, lng: this.markers[0].location.lng} : {lat: this.city.lat, lng: this.city.lng},
          zoom: this.markers.length > 1 ? 11 : 16
        });
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapEl, 'visible');
        });
        if (this.selectable) {
          this.clickListener = map.addListener('click', event => {
            const selectedCoords = {lat: event.latLng.lat(), lng: event.latLng.lng()};
            this.modalCtrl.dismiss(selectedCoords);
          });
        } else {
          const infoWindow = new googleMaps.InfoWindow();
          for (const m of this.markers) {
            const marker = new googleMaps.Marker({
              position: {lat: m.location.lat, lng: m.location.lng},
              map: map,
              title: m.title,
              optimized: false
            });
            marker.addListener('click', () => {
              infoWindow.setContent(`${m.title}, phone: ${m.phone}`);
              infoWindow.open(map, marker);
            });
            // marker.setMap(map);
          }
        }
      }
    ).catch(err => console.log(err));
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise( (resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps are not available');
        }
      };
    });
  }

  ngOnDestroy() {
    if (this.selectable) {
      this.googleMaps.event.removeListener(this.clickListener);
    }
  }

}
