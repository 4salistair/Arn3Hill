import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { AuthService } from './auth.service';
import { LocationService} from './location.service';
import { UIService } from './ui.service';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from './material.module';
import { MatSnackBarModule } from '@angular/material';
import { StageTimerComponent } from './stage-timer/app-stage-timer.component';
import { LocationComponent } from './stage-timer/app-location-component';


@NgModule({
  declarations: [
    AppComponent,
    StageTimerComponent,
    LocationComponent

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [LocationService, AuthService, UIService, DataService, LocationComponent],
  bootstrap: [AppComponent],
  entryComponents: [LocationComponent]

})
export class AppModule {

 }
