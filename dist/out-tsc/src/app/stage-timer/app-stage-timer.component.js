import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { MatDialog } from '@angular/material/dialog';
var StageTimerComponent = /** @class */ (function () {
    function StageTimerComponent(localLocationService, dialog) {
        this.localLocationService = localLocationService;
        this.dialog = dialog;
    }
    StageTimerComponent.prototype.ngOnInit = function () {
        //  this.localLocationService.matchedLocation.subscribe(
        //   CurrentStage => this.CurrentStage = CurrentStage);
        var _this = this;
        this.localLocationService.LocationFoundEmitter.subscribe(function (LocationFound) { return _this.LocationFound = LocationFound; });
        //if ( this.LocationFound === true ) {
        //     this.dialog.open(LocationComponent);
        //}
    };
    StageTimerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-stage-timer',
            templateUrl: './app-stage-timer.component.html',
            styleUrls: ['./app-stage-timer.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [LocationService,
            MatDialog])
    ], StageTimerComponent);
    return StageTimerComponent;
}());
export { StageTimerComponent };
//# sourceMappingURL=app-stage-timer.component.js.map