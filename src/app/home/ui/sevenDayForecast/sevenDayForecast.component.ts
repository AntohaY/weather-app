import { Component, OnInit, input } from '@angular/core';
import { WeatherCardComponent } from '../weatherCard/weatherCard.component';
import { DailyForecast } from '../../interfaces/weather';
import { ContainerComponent } from '../container/container.component';

@Component({
  standalone: true,
  imports: [WeatherCardComponent, ContainerComponent],
  selector: 'app-seven-day-forecast',
  template: `
    <app-container headerTitle="7 Day Forecast">
      <div class="flex-none lg:flex xl:flex 2xl:flex">
          @for (dailyForecast of sevenDayForecast(); track dailyForecast.date) {
            <app-weather-card [weatherInfo]="dailyForecast">

            </app-weather-card>
          }
      </div>
    </app-container>
  `
})

export class SevenDayForecastComponent {

  sevenDayForecast = input.required<DailyForecast[]>();
}
