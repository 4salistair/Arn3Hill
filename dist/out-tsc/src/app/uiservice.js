import * as tslib_1 from "tslib";
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
var UIService = /** @class */ (function () {
    function UIService(snackbar) {
        this.snackbar = snackbar;
    }
    UIService.prototype.showSnackbar = function (message, action, duration) {
        this.snackbar.open(message, action, {
            duration: duration
        });
    };
    UIService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [MatSnackBar])
    ], UIService);
    return UIService;
}());
export { UIService };
//# sourceMappingURL=uiservice.js.map