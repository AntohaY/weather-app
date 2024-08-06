import { Component, OnInit, input } from '@angular/core';
import { WeatherCardComponent } from '../weatherCard/weatherCard.component';
import { DailyForecast } from '../../interfaces/weather';

@Component({
  standalone: true,
  imports: [WeatherCardComponent],
  selector: 'app-seven-day-forecast',
  template: `
    <div class="container mx-auto overflow-auto px-4 m-6 mr-6 ml-6 drop-shadow-lg shadow-yellow-300 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <h1 class="mb-2 text-2xl font-bold tracking-tight text-green-500 dark:text-white">7 Day Forecast</h1>
      <div class="flex-none lg:flex xl:flex 2xl:flex">
        @for (dailyForecast of sevenDayForecast(); track dailyForecast.date) {
          <app-weather-card [weatherInfo]="dailyForecast">

          </app-weather-card>
        }
      <div>
    </div>
  `
})

export class SevenDayForecastComponent {

  sevenDayForecast = input.required<DailyForecast[]>();
}
