import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { tokenName } from '@angular/compiler';


@Injectable()
export class AuthService {
    authChange =  new Subject<boolean>();
    userSession = new Subject<string>();
    private isAuthenticated = false;
    AuthState: any;
    UserID: string;

    constructor(
                 private afauth: AngularFireAuth,
                ) {

                this.afauth.authState.subscribe(user => {
                    if (user) {
                        this.isAuthenticated = true;
                        this.authChange.next(true);
                } else {
                    this.authChange.next(false);
                    this.isAuthenticated = false;
                }

            });
        }

        AnnonLogin() {

                        return this.afauth.auth.signInAnonymously();
                }

        callID() {
                    // this.afauth.authState.subscribe(tokenId => {
                    //     tokenId =  tokenId;
                    //     console.log(tokenId.getIdTokenResult.toString);
                    // });

                   //console.log(this.afauth.auth.currentUser.getIdTokenResult());

                    this.afauth.auth.onAuthStateChanged(user => {
                        user = user;
                        if (user) {
                            this.UserID = user.uid;
                         //   this.userSession.next(this.UserID);
                           // return this.UserID;
                        }
                    });
            }



}
