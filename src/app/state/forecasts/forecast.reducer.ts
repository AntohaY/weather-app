import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Forecast } from 'src/app/shared/models/forecast/forecast.model';
import {
  addForecast,
  loadForecasts,
  loadForecastsFailure,
  loadForecastsSuccess,
  removeForecast
} from './forecast.actions';

export interface ForecastState {
  forecasts: Forecast[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ForecastState = {
  forecasts: [],
  error: '',
  status: 'pending',
}

export const forecastReducer = createReducer(
  initialState,

  on(addForecast, (state, { cityName }) => ({
    ...state,
    forecasts: [...state.forecasts, { id: Date.now().toString(), cityName: cityName }]
  })),

  on(removeForecast, (state, { id }) => ({
    ...state,
    forecasts: state.forecasts.filter(forecast => forecast.id !== id)
  })),

  on(loadForecasts, (state) => ({
    ...state, status: 'loading'
  })),

  on(loadForecastsSuccess, (state, { forecasts }) => ({
    ...state,
    forecasts: forecasts,
    error: '',
    status: 'success'
  })),

  on(loadForecastsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  }))
)
