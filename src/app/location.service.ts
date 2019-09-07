import { map, timestamp } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Locations} from './locations.model';
import { Subject } from 'rxjs';
import { Subscription} from 'rxjs';
import { UIService } from './uiservice';
import { Stage } from './stage.model';


@Injectable()
export class LocationService {

    LocationChanged = new Subject<Locations[]>();
    private availableStages: Stage[] = [];

    id: string;
    lat: number;
    lng: number;
    description: any;
    latitudeFloat: string;
    stageModel: Stage[];
    stageChanged = new Subject<Stage[]>();
    private fbSubs: Subscription[] = [];
    private locationsSubscription: Subscription;
    private  fixedlocationsSubscription: Subscription;

    constructor(private db: AngularFirestore,
                private nUIService: UIService
                ) { }


    findMe( Gmap: google.maps.Map, Gmarker: google.maps.Marker) {

      const timerId  = setInterval(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

              this.nUIService.showSnackbar('Track Position', null, 1000);
              const Location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              Gmap.panTo(Location);
              Gmarker = new google.maps.Marker({
              position: Location,
              map: Gmap,
              icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
           });
        });
        } else { alert('Geolocation is not supported by this browser.');
        }
      }, 1000 ) ;
    }



    fetchlocations(Gmap: google.maps.Map, Gmarker: google.maps.Marker) {
      this.fbSubs.push(this.db
        .collection('Locations')
        .snapshotChanges()
        .pipe(map(docData => {
        return docData.map(doc => {
                return {
                    id:  doc.payload.doc.id,
                    lat: doc.payload.doc.data()['lat'],
                    lng: doc.payload.doc.data()['lng'],
                    description: doc.payload.doc.data()['Description']
                  };
                  });
                })
                )
                .subscribe((stages: Stage[]) => {
                this.availableStages = stages;
                this.stageChanged.next([...this.availableStages]);
              }, error => {
                this.nUIService.showSnackbar('Fetching Exercises Failed', null, 3000);
              }));

            }

  showFixedPosition(Gmap: google.maps.Map, Gmarker: google.maps.Marker) {

    this.fixedlocationsSubscription = this.stageChanged.subscribe(
      ( fixedLocation: Stage[]) => {
        fixedLocation.forEach( element => {
            //console.log(element.lat + '  ' + element.lng + '  ' + element.description);
            const Fixedlocation = new google.maps.LatLng(element.lat , element.lng);
            Gmap.panTo(Fixedlocation);
            Gmarker = new google.maps.Marker({
               position: Fixedlocation,
               map: Gmap,
              });


        });
      });
    }


  matchLocation() {
    this.locationsSubscription = this.stageChanged.subscribe(
      ( fixedLocation: Stage[]) => {
        fixedLocation.forEach(element => {
          console.log(element.lat.toFixed(4) + '  ' + element.lng.toFixed(4) + '  ' + element.description);

          const timerId  = setInterval(() => {
            this.nUIService.showSnackbar('Your are at the no where', null, 3000);

            if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    //  console.log('You are here');
                    //  console.log(position.coords.latitude.toFixed(4))
                    //  console.log(position.coords.longitude.toFixed(4));
                    //  console.log(element.description);
                    //  console.log(element.lng.toFixed(4));
                    //  console.log(element.lat.toFixed(4));
                    this.nUIService.showSnackbar('Your are at the no where', null, 2000);

                    if (position.coords.longitude.toFixed(4) === element.lng.toFixed(4) &&
                        position.coords.longitude.toFixed(4) === element.lng.toFixed(4)) {

                        this.nUIService.showSnackbar('Your are at the ' + element.description, null, 2000);
                      }
                  });
          }
        }, 4000 ) ;
      });
    });
  }
}

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

//}


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

//}



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
