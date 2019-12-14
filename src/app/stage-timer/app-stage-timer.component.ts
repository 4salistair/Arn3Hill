import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Stage } from '../stage.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { LocationComponent } from './app-location-component';
import { LocationService } from '../location.service';


export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-stage-timer',
  templateUrl: './app-stage-timer.component.html',
  styleUrls: ['./app-stage-timer.component.css']
})
export class StageTimerComponent implements OnInit {

  MatchedLocationSubscription: Subscription;
  LocationFound: boolean;
  LocationDetails: Stage;

  constructor(

    public dialog: MatDialog,
    public nLocationService: LocationService ) { }

  ngOnInit() {

    this.nLocationService.LocationFoundEmitter.subscribe(
      (  LocationFound ) => {
        this.LocationFound = LocationFound;

        if ( this.LocationFound ) {

           this.nLocationService.matchedLocation.subscribe(
              ( LocationDetails ) => {
              this.LocationDetails = LocationDetails;
              console.log('is there a start Name ' + this.LocationDetails.startName);
              console.log('is there a start ID ' + this.LocationDetails.startID);
              this.dialog.open(LocationComponent, {data: { name: LocationDetails.startName, id: LocationDetails.startID}});
              });
        }
      });

}

}


  // this.localLocationService.matchedLocation.subscribe(
  //  CurrentStage => this.CurrentStage = CurrentStage);





  // console.log(this.LocationFound);
  // this.dialog.open(LocationComponent);

  // if ( this.LocationFound === true ) {
  // console.log('Location Subsription');
  // console.log(this.LocationFound);
  // this.dialog.open(LocationComponent);
  // }