import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinates } from '../interfaces/coordinates';
import { catchError, EMPTY, map, of, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocationService } from '../../shared/data-access/location.service';

export interface WeatherState {
    weatherData: any;
    loaded: boolean;
}

@Injectable({providedIn: 'root'})
export class WeatherService {
    httpClient = inject(HttpClient);
    locationService = inject(LocationService);

    // State

    private state = signal<WeatherState>({
        weatherData: [],
        loaded: false,
    })

    private coordinatesLoaded$ = this.locationService.loadCoordinates().pipe(
        catchError((err) => {
            return EMPTY;
        })
    )

    private fetchWeatherDataFromApi(
        long: string,
        lat: string
    ) {
        return this.httpClient
            .get(
                `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civil&output=json`
            )
    }

    // Selectors

    loaded = computed(() => this.state().loaded);

    constructor() {
        this.coordinatesLoaded$
            .pipe(
                switchMap((coordinates) => 
                    this.fetchWeatherDataFromApi(coordinates.long, coordinates.lat)
                )
            )
            .subscribe((weatherResponse) => {
                console.log(weatherResponse);
                // Update the state with the weather data
                this.state.update((state) => ({
                    ...state,
                    weatherData: weatherResponse,
                    loaded: true
                  }))
            });
    }
}

// http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=meteo&output=json
