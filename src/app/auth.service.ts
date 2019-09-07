import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthService {
    authChange =  new Subject<boolean>();
    private isAuthenticated = false;
    AuthState: any;

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

}
