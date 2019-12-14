import * as tslib_1 from "tslib";
import { map } from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { UIService } from './uiservice';
var LocationService = /** @class */ (function () {
    function LocationService(db, nUIService) {
        this.db = db;
        this.nUIService = nUIService;
        this.LocationChanged = new Subject();
        this.availableStages = [];
        this.stageChanged = new Subject();
        this.matchedLocation = new Subject();
        this.LocationFoundEmitter = new EventEmitter();
        this.fbSubs = [];
    }
    LocationService.prototype.trackMe = function (Gmap) {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                if (_this.Memarker) {
                    _this.Memarker.setPosition(null);
                }
                _this.showTrackingPosition(position, Gmap);
            });
        }
        else {
            alert('Geolocation is not supported by this browser.');
        }
    };
    LocationService.prototype.showTrackingPosition = function (position, Gmap) {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        var location = new google.maps.LatLng(this.currentLat, this.currentLong);
        if (!this.Memarker) {
            this.Memarker = new google.maps.Marker({
                position: location,
                map: Gmap,
                title: 'Got you!',
                icon: '/assets/BlueDot.png'
            });
        }
        else {
            this.Memarker.setPosition(location);
        }
    };
    LocationService.prototype.fetchlocations = function (Gmap, Gmarker) {
        var _this = this;
        this.fbSubs.push(this.db
            .collection('Locations')
            .snapshotChanges()
            .pipe(map(function (docData) {
            return docData.map(function (doc) {
                return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data()['Name'],
                    lat: doc.payload.doc.data()['lat'],
                    lng: doc.payload.doc.data()['lng'],
                    description: doc.payload.doc.data()['Description']
                };
            });
        }))
            .subscribe(function (stages) {
            _this.availableStages = stages;
            _this.stageChanged.next(_this.availableStages.slice());
        }, function (error) {
            _this.nUIService.showSnackbar('Fetching Exercises Failed', null, 3000);
        }));
    };
    LocationService.prototype.showFixedPosition = function (Gmap, Gmarker) {
        this.fixedlocationsSubscription = this.stageChanged.subscribe(function (fixedLocation) {
            fixedLocation.forEach(function (element) {
                var Fixedlocation = new google.maps.LatLng(element.lat, element.lng);
                Gmap.panTo(Fixedlocation);
                Gmarker = new google.maps.Marker({
                    position: Fixedlocation,
                    label: element.name,
                    icon: { url: '/assets/RedDot.png', labelOrigin: new google.maps.Point(element.lat + 1, element.lng + 1) },
                    map: Gmap
                });
            });
        });
    };
    LocationService.prototype.returnFixedLocationArray = function () {
        var _this = this;
        this.fixedlocationsSubscription = this.stageChanged.subscribe(function (fixedLocation2) {
            _this.returnArray = fixedLocation2;
        });
        return this.returnArray;
    };
    LocationService.prototype.matchLocation = function (fixedLocation) {
        if (fixedLocation === void 0) { fixedLocation = []; }
        console.log('No.1');
        console.log('element.name');
        fixedLocation.forEach(function (element2) {
            console.log(element2.name);
        });
        // this.locationsSubscription = this.stageChanged.subscribe(
        //  ( fixedLocation: Stage[]) => {
        //  fixedLocation.forEach(element2 => {
        //        console.log(element2.name);
        //  if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition((position) => {
        //      console.log('You are here');
        //      console.log(position.coords.latitude.toFixed(4));
        //      console.log(position.coords.longitude.toFixed(4));
        //      if (position.coords.longitude.toFixed(3) === element2.lng.toFixed(3) &&
        //       position.coords.longitude.toFixed(3) === element2.lng.toFixed(3)) {
        //       // this.nUIService.showSnackbar('Your are at the ' + element.description, null, 10000);
        //       this.matchedLocation.next(element2.description);
        //       this.LocationFoundEmitter.next(true);
        //     }
        //   });
        // }
        //  });
        //});
    };
    LocationService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore,
            UIService])
    ], LocationService);
    return LocationService;
}());
export { LocationService };
// trackMe() {
//   if (navigator.geolocation) {
//     this.isTracking = true;
//     navigator.geolocation.watchPosition((position) => {
//       this.showTrackingPosition(position);
//     });
//   } else {
//     alert("Geolocation is not supported by this browser.");
//   }
// }
/////
//   findMe( Memap: google.maps.Map) {
//   const timerId  = setInterval(() => {
//     if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition((position) => {
//             const Location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//             Memap.panTo(Location);
//             this.Memarker = new google.maps.Marker({
//             position: Location,
//             map: Memap,
//             icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
//             });
//       });
//     } else { alert('Geolocation is not supported by this browser.');
//     }
//   }, 5000 ) ;
// }
// + '  ' + element.lng.toFixed(4) + '  ' + element.description);
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     console.log('You are here');
//     console.log(position.coords.latitude.toFixed(4))
//     console.log(position.coords.longitude.toFixed(4))
//   }
// };
//                    console.log(element.description);
//                    console.log(element.lng.toFixed(4));
//                    console.log(element.lat.toFixed(4));
//                   this.nUIService.showSnackbar('Your are at the no where', null, 2000);
//                   if (position.coords.longitude.toFixed(4) === element.lng.toFixed(4) &&
//                       position.coords.longitude.toFixed(4) === element.lng.toFixed(4)) {
//                       this.nUIService.showSnackbar('Your are at the ' + element.description, null, 2000);
//         }
//               });
//         }
//         }, 4000 ) ;
//     });
//      });
//    }
// }
//       && position.coords.longitude.toFixed(4) === element.lng.toFixed(4))
//         this.nUIService.showSnackbar('We have a match on' + element.description, null, 3000);
// });
// if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
// console.log('Current lat to 3 ' + position.coords.latitude.toFixed(4));
//   console.log('Current lng to 3 ' + position.coords.longitude.toFixed(4));
//   console.log('This Lat '  + this.description + ' ' + latitude.toFixed(4));
//   console.log('This Long ' + this.description + ' ' + longitude.toFixed(4));
//  if (position.coords.latitude.toFixed(4) === latitude.toFixed(4)
//    && position.coords.longitude.toFixed(4) === longitude.toFixed(4)) {
//   //  this.stageModel. startdateandtime = Date();
//   // this.AddCompleteSegment(this.stageModel);
// } else {
//     console.log('Location Not Matched ' + description, null , 3000);
// }
//       });
//     }
//   }
//   private AddCompleteSegment(stage: Stage) {
//         this.db.collection('Stage').add(stage);
//        }
//   cancelSubscriptions() {
//       this.fbSubs.forEach(sub => sub.unsubscribe());
//     }
// }
// IDlocationPerSecond(NumberofSeconds: number) {
//   const SecondInMilli = 1000;
//   const Second = SecondInMilli * NumberofSeconds;
//   const timerId  = setInterval(() => console.log('tick'), Second);
// }
//     this.progress = this.progress + 5;
//     if ( this.progress >= 100)
//       {
//         this.trainingservice.completeExercise(step);
//         clearInterval(this.timer);
//       }
//   }, step);
// }
/// Various bits of code ///
// AddFixedPointstoMap() {
//             this.auth.AnnonLogin();
//             this.db.collection('Locations').snapshotChanges()
//              .pipe(map( docData => {
//              return docData.map( doc => {
//                 return {
//                     id: doc.payload.doc.id,
//                     name: doc.payload.doc.data()['Name'],
//                     description: doc.payload.doc.data()['Description'],
//                     long: doc.payload.doc.data()['lng'],
//                     lat: doc.payload.doc.data()['lat'],
//                    };
//                 });
//             })).subscribe((Location: Locations[]) => {
//                     this.availableLocations = Location;
//                     this.LocationChanged.next([...this.availableLocations]);
//              }, );
// }
//   showPosition(position) {
//   const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//   this.map.panTo(location);
//   if (!this.marker) {
//     this.marker = new google.maps.Marker({
//     position: location,
//     map: this.map,
//     title: 'Got you!',
//   });
// } else {
//   this.marker.setPosition(location);
// }
// }
// const location = new google.maps.LatLng(this.lat, this.lng);    
// this.map.panTo(location);
// this.marker = new google.maps.Marker({
//      position: location,
//     map: this.map,
//      title: this.description
//     });
//   if (!this.marker) {
//     this.marker = new google.maps.Marker({
//     position: Fixedlocation,
//     map: this.map,
//   });
// } else {
//   this.marker.setPosition(Fixedlocation);
// }
// }
//  function getLocation(localVal) { }
//  // const {0: lat} = localVal;
//  // console.log('lat = ' + {0: lat})
//   from(localVal)
//         .pipe(map(docData => {
//             return docData.map(doc => {
//                    id: doc.payload.doc.id
//                }
//             };
//           )
//         )
//       )
//     .subscribe(lat => console.log('doc.payload.doc.id'));
// console.log('id' + doc.payload.doc.id);
// map(lat => localVal.lat)
//  .pipe(map(docData => {
//   return docData.map(doc => {
//     return {
//       id: doc.payload.doc.id,
//       name: doc.payload.doc.data()['Name'],
// console.log('lng = ' + lng);
//  }
//  return {
//    symbol: ;IBM',
//         price: 100.00
//   }
// }
//   let { symbol, price } = getStock();
//   console.log('The price of ${symbol} is ${price}');
// this.Fixedlocations =    this.db.collection('Locations')
//   .snapshotChanges()
//   .pipe(
//     map( docArray => {
//       return docArray.map(doc => {
//         return {
//           id: doc.payload.doc.id,
//           // name: doc.payload.doc.data()['Name'],
//           // description: doc.payload.doc.data().['Description'],
//           long: doc.payload.doc.data()['lng'],
//           lat: doc.payload.doc.data()['lat'],
//         };
//     });
//   }));
// tslint:disable-next-line: no-unused-expression
///  console.log(this.Fixedlocations);
// for (let local of this.Fixedlocations) {
// }
//    console.log(this.Fixedlocations);
// this.testObservable = this.db.collection('Locations').valueChanges();
// this.testObservable.forEach( result => {console.log(result);
//                                         return result;
// })
// this.testObservable.
// .subscribe();
// result => {console.log(result)}
//  this.myForm.get('firstName').valueChanges.subscribe(value => {
//   console.log('name has changed:', value)
// this.nLocationService.AddFixedPointstoMap();
// this.locationSubscription = this.nLocationService.LocationChanged(Payloadlocations =>
//  Payloadlocations = this.locationSubscription);
// Subscriplocations => (this.locations = this.locations)
// this.db.collection('Locations').valueChanges().subscribe(
//   value => {
//     console.log('value from value change');
//     console.log(value);
//    // getLocation(value);
//   }
// );
//   this.db.collection('Locations').snapshotChanges()
//     .pipe(map(docData => {
//         return docData.map(doc => {
//           this.id =  doc.payload.doc.id;
//           this.lat = doc.payload.doc.data()['lat'];
//           this.lng = doc.payload.doc.data()['lng'];
//           const location = new google.maps.LatLng(this.lat, this.lng);    this.map.panTo(location);
//           this.marker = new google.maps.Marker({
//               position: location,
//                map: this.map,
//                title: 'Got you!'
//               });
//           // console.log('id' + this.id);
//           // console.log('lat' + this.lat);
//           // console.log('lng' + this.lng);
//           // return {
//           //   id :  doc.payload.doc.id
//           // };
//         });
//       })
//       )
//  .subscribe(
//    action => {
//     // console.log('Values from snapshot change');
//     // console.log(action);
//     // getLocation(action);
//     }
//   )
//# sourceMappingURL=location.service.js.map