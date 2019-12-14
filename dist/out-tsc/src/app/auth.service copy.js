import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
var AuthService = /** @class */ (function () {
    function AuthService(afauth) {
        var _this = this;
        this.afauth = afauth;
        this.authChange = new Subject();
        this.isAuthenticated = false;
        this.afauth.authState.subscribe(function (user) {
            if (user) {
                _this.isAuthenticated = true;
                _this.authChange.next(true);
            }
            else {
                _this.authChange.next(false);
                _this.isAuthenticated = false;
            }
        });
    }
    AuthService.prototype.AnnonLogin = function () {
        return this.afauth.auth.signInAnonymously();
    };
    AuthService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service copy.js.map