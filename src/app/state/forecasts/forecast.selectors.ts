import {ForecastState} from "./forecast.reducer";
import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";

export const selectForecasts = (state: AppState) => state.forecasts;
export const selectAllForecasts = createSelector(
  selectForecasts,
  (state: ForecastState) => state.forecasts
);
