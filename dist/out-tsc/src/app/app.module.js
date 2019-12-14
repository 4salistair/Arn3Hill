import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';
import { UIService } from './uiservice';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatSnackBarModule } from '@angular/material';
import { StageTimerComponent } from './stage-timer/app-stage-timer.component';
import { LocationComponent } from './stage-timer/app-location-component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
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
            providers: [LocationService, AuthService, UIService],
            bootstrap: [AppComponent],
            entryComponents: [LocationComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map