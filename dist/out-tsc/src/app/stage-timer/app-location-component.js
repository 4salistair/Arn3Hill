import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { MatDialog } from '@angular/material/dialog';
var LocationComponent = /** @class */ (function () {
    function LocationComponent(locationService, dialog) {
        this.locationService = locationService;
        this.dialog = dialog;
    }
    LocationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localLocationService.matchedLocation.subscribe(function (CurrentStage) { return _this.CurrentStage = CurrentStage; });
    };
    LocationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-location-component',
            templateUrl: 'app-location-conponent.html'
        }),
        tslib_1.__metadata("design:paramtypes", [LocationService,
            MatDialog])
    ], LocationComponent);
    return LocationComponent;
}());
export { LocationComponent };
//# sourceMappingURL=app-location-component.js.map