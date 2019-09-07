
import { Component, ViewChild, OnInit } from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';
import { } from 'googlemaps';
import { LocationService} from './location.service';
import { Locations} from './locations.model';
import { AuthService } from './auth.service';
import { UIService } from './uiservice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  @ViewChild('gmap', {static: false}) gmapElement: any;


  locationSubscription: Subscription;
  locations: Locations;

  Subscriplocations: Subject<Locations>[];
  Payloadlocations: Locations[];

  Fixedlocations: Observable<Locations[]>;
  location: string;
  Fixedposition: Geolocation;

  map: google.maps.Map;
  marker: google.maps.Marker;
  position: Geolocation;


  constructor(private nLocationService: LocationService,
              private nAuthService: AuthService,
              private nUIService: UIService) { }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(54.187151, -2.814204),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      setOptions: google.maps.BicyclingLayer
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.nAuthService.AnnonLogin();

    this.nLocationService.findMe(this.map, this.marker);
    this.nLocationService.fetchlocations(this.map, this.marker);
    this.nLocationService.showFixedPosition(this.map, this.marker);
    this.nLocationService.matchLocation();


    // const timerId  = setInterval(() => {

    
    // //   this.nLocationService.findMe(this.map, this.marker);
    // //   this.nLocationService.fetchlocations(this.map, this.marker);
    //    this.nUIService.showSnackbar(' Snack bar attack :]', null , 1000);
    //   }, 10000);


  }
}
