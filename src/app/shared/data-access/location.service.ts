import { inject, Injectable } from '@angular/core';
import { catchError, defer, EMPTY, map, Observable } from 'rxjs';
import { Coordinates } from '../../home/interfaces/coordinates';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class LocationService {
    httpClient = inject(HttpClient);
    constructor() { }

    loadCoordinates(): Observable<Coordinates> {
        return defer(() => {
            return new Promise<Coordinates>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude.toFixed(5).toString();
                        const long = position.coords.longitude.toFixed(5).toString();
                        console.log(lat, long)
                        resolve({ lat, long });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        });
    }
}