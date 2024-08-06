import { Component, computed, input } from '@angular/core';
import { WeatherConditionsIcons, WeatherConditionsDescription } from '../../utils/enums';
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
    <div>
        <div class="max-w-3xl min-w-96 m-4 p-6 drop-shadow-lg shadow-yellow-300 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center">
            <a href="#">
          <h1 class="mb-2 text-2xl font-bold tracking-tight text-red-300 dark:text-white">Current weather {{ '20240806' | parseDate | date:'fullDate' }}</h1>
          </a>
          <p class="mb-3 text-2xl font-bold text-yellow-400 dark:text-gray-400">
            Max temperature {{ weatherInfo().temp2m.max }}° C
          </p>
          <p class="mb-3 text-2xl font-bold text-yellow-400 dark:text-gray-400">
            Min temperature {{ weatherInfo().temp2m.min }}° C
          </p>
          <div>
            <p class="mb-3 text-2xl font-normal text-red-600 dark:text-gray-400">
              Wind speed: {{ +weatherInfo().wind10m_max | windSpeedDescription}}
            </p>
            <!-- <p class="mb-3 text-2xl font-normal text-red-600 dark:text-gray-400">
              Expected precipitation: {{ weatherInfo().prec_amount }} mm
            </p> -->
          </div>
          <app-icon [weatherCondition]="weatherInfo().weather"></app-icon>
        </div>
    </div>
  `
})

export class WeatherCardComponent{
  weatherInfo = input.required<DailyForecast>();
}
