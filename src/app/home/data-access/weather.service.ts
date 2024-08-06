import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, of, switchMap, tap } from 'rxjs';
import { LocationService } from '../../shared/data-access/location.service';
import { ApiResponse, DailyForecast } from '../interfaces/weather';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface WeatherState {
  weatherData: {
    sevenDayForecast: DailyForecast[],
  };
  loaded: boolean;
}

@Injectable({providedIn: 'root'})
export class WeatherService {
    httpClient = inject(HttpClient);
    locationService = inject(LocationService);

    // State

    private state = signal<WeatherState>({
        weatherData: {
          sevenDayForecast: [],
        },
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
          .get<ApiResponse>(
              `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`
          )
    }

    // Selectors

    loaded = computed(() => this.state().loaded);

    weatherData = computed(() => this.state().weatherData);

    constructor() {
        this.coordinatesLoaded$
            .pipe(
                takeUntilDestroyed(),
                switchMap((coordinates) =>
                  this.fetchWeatherDataFromApi(coordinates.long, coordinates.lat)
                ),
                map((response) => {
                  // const currentDayWeather = response.dataseries.slice(0,8);
                  const sevenDayForecast = response.dataseries;
                  // const fiveDaysGraph = response.dataseries.slice(0, (5 * 8));
                  return {
                    sevenDayForecast ,
                  }
                })
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
