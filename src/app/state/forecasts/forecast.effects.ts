import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addForecast,
  removeForecast,
  loadForecasts,
  loadForecastsSuccess,
  loadForecastsFailure,
} from './forecast.actions';
import { ForecastService } from "../../shared/widgets/forecast/forecast.service";
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {selectAllForecasts} from "./forecast.selectors";


@Injectable()
export class ForecastEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private forecastService: ForecastService
  ) {}

  // Run this code when a loadForecasts action is dispatched
  loadForecasts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadForecasts),
      switchMap(() =>
        // Call the getForecasts method, convert it to an observable
        from(this.forecastService.getForecasts()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((forecasts) => loadForecastsSuccess({ forecasts: forecasts })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadForecastsFailure({ error })))
        )
      )
    )
  );

  // Run this code when the addForecast or removeForecast action is dispatched
  saveTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addForecast, removeForecast),
        withLatestFrom(this.store.select(selectAllForecasts)),
        switchMap(([action, forecasts]) => from(this.forecastService.saveForecasts(forecasts)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
