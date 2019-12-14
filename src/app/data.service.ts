
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Stage } from './stage.model';
import { Subject } from 'rxjs';
//import { LocationService } from './location.service';


@Injectable()


export class DataService {
    nStage: Stage;
   stageChange = new Subject<Stage>();

    constructor(private db: AngularFirestore,
             //   private nLocationService: LocationService
      ) {

     }

startStage(userId: string) {

      this.db.doc('stages/' + userId).update({dateStarted: new Date()});

    }

    addDataToDatabase(stage: Stage) {
        this.db.collection('Stages').add(stage);
      }

      addUpdateStagedata(userSessionID: string) {

        this.nStage.userSessionID = userSessionID;

        this.addDataToDatabase(this.nStage);


    }

}


        // startID?: string;
        // startName?: string;
        // endID?: string;
        // endName?: string;
        // startdateandtime?: any;
        // enddateandtime?: any;
        // duration?: number;
        // state?: 'completed'| 'cancalled' | null;
