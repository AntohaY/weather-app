import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { LocationService } from '../../shared/data-access/location.service';
import { ApiResponse, CivilApiResponse, DailyForecast, HourlyForecast } from '../interfaces/weather';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface WeatherState {
  weatherData: {
    sevenDayForecast: DailyForecast[],
    fiveDaysGraph: {
        initialTimePoint: string,
        data: HourlyForecast[]
    }
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
          fiveDaysGraph: {
            initialTimePoint: '',
            data: []
          }
        },
        loaded: false,
    })

    // Sources

    private coordinatesLoaded$ = this.locationService.loadCoordinates().pipe(
        catchError((err) => {
            return EMPTY;
        })
    )

    private fetchSevenDaysWeatherDataFromApi(
        long: string,
        lat: string
    ) {
        return this.httpClient
          .get<ApiResponse>(
              `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`
          )
    }

    private fetchGraphDataFromApi(
        long: string,
        lat: string
    ) {
        return this.httpClient
          .get<CivilApiResponse>(
              `http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civil&output=json`
          )
    }

    // Selectors

    loaded = computed(() => this.state().loaded);

    weatherData = computed(() => this.state().weatherData);

    constructor() {
      // Reducers
      this.coordinatesLoaded$
          .pipe(
              takeUntilDestroyed(),
              switchMap((coordinates) =>
                  forkJoin([this.fetchSevenDaysWeatherDataFromApi(coordinates.long, coordinates.lat), this.fetchGraphDataFromApi(coordinates.long, coordinates.lat)])
              ),
              map((response) => {
                const sevenDayForecast = response[0].dataseries;
                let indexCounter = 4;
                sevenDayForecast.forEach((df) => {
                  df.windDirection = response[1].dataseries[indexCounter].wind10m.direction;
                  indexCounter+=7;
                })
                const fiveDaysGraph = {
                  initialTimePoint: response[1].init,
                  data: response[1].dataseries.slice(0, (5 * 8))
                };
                return {
                  sevenDayForecast,
                  fiveDaysGraph
                }
              })
          )
          .subscribe((weatherData) =>
            // {
              // console.log(weatherData);
              // Update the state with the weather data
              this.state.update((state) => ({
                  ...state,
                  weatherData,
                  loaded: true
                }))
          // }
          );

        effect(() => {
          console.log(this.weatherData())
        })
    }
}

// http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=meteo&output=json
