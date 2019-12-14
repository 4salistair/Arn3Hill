import { Component, OnInit, Inject } from '@angular/core';
import { LocationService } from '../location.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Stage } from '../stage.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
// import { Subscription} from 'rxjs';
import { Injectable } from '@angular/core';





@Component({
    selector: 'app-location-component',
    templateUrl: 'app-location-conponent.html'

})

@Injectable()

export class LocationComponent implements OnInit {

  private userID: string;
  StartedStage: Stage;

    constructor(
               @Inject(MAT_DIALOG_DATA) public passData: any,
               private nLocationService: LocationService,
               private afauth: AngularFireAuth,
           ) { }
    ngOnInit() {
    }

    setTimer() {

           this.afauth.auth.onAuthStateChanged(user => {
            user = user;
            if (user) {
                this.userID = user.uid;
             //   console.log('userID ' + this.userID);
                this.StartedStage = {userSessionID: this.userID};
             //   return this.userID;
             // this.currentMatchedLocation  = {startID: element2.id, startName: element2.name}
            }
        });
           console.log('userID ' + this.StartedStage.userSessionID);
          //  {userSessionID }
          // console.log(this.userID);

           this.nLocationService.matchedLocation.subscribe(( nStage: Stage) => {
          //   this.StartedStage = nStage;
          //  // this.nDataService.addDataToDatabase(this.StartedStage);
        });

   }
    ///   console.log(this.passData.id);
    //    this.nDataService.addUpdateStagedata();
    //    console.log('set timer firing');
    //  }

    // showDialog(data: any) {
    //     this.dialog.open(LocationComponent, data);
    //  }
}
