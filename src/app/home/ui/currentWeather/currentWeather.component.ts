import { Component, input } from '@angular/core';
import { DailyForecast } from '../../interfaces/weather';
import { IconComponent } from '../icon/icon.component';
import { WeatherCardComponent } from '../weatherCard/weatherCard.component';
import { ContainerComponent } from '../container/container.component';

@Component({
    standalone: true,
    imports: [IconComponent, WeatherCardComponent, ContainerComponent],
    selector: 'app-current-weather',
    templateUrl: 'currentWeather.component.html'
})

export class CurrentWeatherComponent {
  currentWeather = input.required<DailyForecast>();
}
