import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { AuthService } from './auth.service';
import { LocationService} from './location.service';
import { UIService } from './uiservice';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatSnackBarModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [LocationService, AuthService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule {

 }