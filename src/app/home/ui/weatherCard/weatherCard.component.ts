import { Component, computed, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { DailyForecast } from '../../interfaces/weather';
import { ParseDatePipe } from "../../../shared/pipes/date.pipe";
import { DatePipe } from '@angular/common';
import { WindSpeedDescriptionPipe } from "../../../shared/pipes/windSpeed.pipe";

@Component({
  standalone: true,
  imports: [IconComponent, ParseDatePipe, DatePipe, WindSpeedDescriptionPipe],
  selector: 'app-weather-card',
  template: `
      <div class="weather-card max-w-96 min-w-96 m-4 p-6 drop-shadow-lg shadow-yellow-300 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center">
        <a href="#">
          <h1 class="mb-2 text-2xl font-bold tracking-tight text-red-500 dark:text-white">{{ weatherInfo().date.toString() | parseDate | date:'fullDate' }}</h1>
        </a>
        <div class="flex">
          <p class="m-5 text-2xl font-bold text-yellow-500 dark:text-gray-400">
            Max {{ weatherInfo().temp2m.max }}°C
          </p>
          <p class="m-5 text-2xl font-bold text-yellow-300 dark:text-gray-400">
            Min {{ weatherInfo().temp2m.min }}°C
          </p>
        </div>
        <div class="flex item-center flex-col">
          <p class="mb-3 text-2xl font-normal text-blue-600 dark:text-gray-400">
            Wind speed: {{ +weatherInfo().wind10m_max | windSpeedDescription}}
          </p>
          @if (weatherInfo().windDirection) {
            <p class="mb-3 text-2xl font-normal text-blue-600 dark:text-gray-400">
              Aproximate wind direction: {{ weatherInfo().windDirection}}
            </p>
          }
        </div>
        <app-icon [weatherCondition]="weatherInfo().weather"></app-icon>
      </div>
  `,
  styles: [
    `
      .weather-card {
        min-height: 520px;
      }
    `
  ]
})

export class WeatherCardComponent{
  weatherInfo = input.required<DailyForecast>();
}
