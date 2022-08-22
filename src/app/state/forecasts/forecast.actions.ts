import { createAction, props } from '@ngrx/store';
import { Forecast } from '../../shared/models/forecast/forecast.model';

export const addForecast = createAction(
  '[Forecast Page] Add Forecast',
  props<{ cityName: string }>()
);

export const removeForecast = createAction(
  '[Forecast Page] Remove Forecast',
  props<{ id: string }>()
);

export const loadForecasts = createAction('[Forecast Page] Load Forecasts');

export const loadForecastsSuccess = createAction(
  '[Forecast API] Forecast Load Success',
  props<{ forecasts: Forecast[] }>()
)

export const loadForecastsFailure = createAction(
  '[Forecast API] Forecast Load Failure',
  props<{ error: string }>()
)
