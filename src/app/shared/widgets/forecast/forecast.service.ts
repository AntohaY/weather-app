import { Injectable } from '@angular/core';
import { Forecast } from "../../models/forecast/forecast.model";

@Injectable({ providedIn: 'root' })
export class ForecastService {
  private forecastArray: Forecast[] = [{
    id: Date.now().toString(),
    cityName: 'Kyiv'
  }];

  constructor() {}

  async getForecasts(): Promise<Forecast[]> {
    return (this.forecastArray || []);
  }

  async saveForecasts(forecasts: Forecast[]) {
    return this.forecastArray = forecasts;
  }
}
