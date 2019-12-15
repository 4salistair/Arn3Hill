import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { LocationService } from '../location.service';
import { DataService } from '../data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Stage } from '../stage.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';





@Component({
    selector: 'app-location-component',
    templateUrl: 'app-location-conponent.html'

})

@Injectable()



export class LocationComponent implements OnInit {

  userID: string;
  StartedStage: Stage;

    constructor(
                @Inject(MAT_DIALOG_DATA) public passData: any,
                private nLocationService: LocationService,
                private afauth: AngularFireAuth,
         //       private locationsubscription: Subscription,
                private nDataService: DataService
           ) { }
    ngOnInit() {
    }

    setTimer() {

            this.afauth.auth.onAuthStateChanged(user => {
             user = user;
             if (user) {
                this.userID = user.uid;
                this.StartedStage = {userSessionID: this.userID};
                console.log(this.StartedStage.userSessionID);

                this.nLocationService.matchedLocation.subscribe(( nStage: Stage) => {
                this.StartedStage = {startName: nStage.startName};
                this.StartedStage = {startID: nStage.startID};
                this.StartedStage = {startdateandtime: Date()};
                this.nDataService.addDataToDatabase(this.StartedStage);
              });

              }
             });


            //   return this.userID;
             // this.currentMatchedLocation  = {startID: element2.id, startName: element2.name}
          //  {userSessionID }
          // console.log(this.userID);

        //   this.nLocationService.matchedLocation.subscribe(( nStage: Stage) => {
          //   this.StartedStage = nStage;
          //  //
       // });

   }
    ///   console.log(this.passData.id);
    //    this.nDataService.addUpdateStagedata();
    //    console.log('set timer firing');
    //  }

    // showDialog(data: any) {
    //     this.dialog.open(LocationComponent, data);
    //  }

    // onDestroy() {
    //   this.locationsubscription.unsubscribe;
    // }
}
