import { Component, inject, OnInit } from '@angular/core';
import { CurrentWeatherComponent } from './ui/currentWeather/currentWeather.component';
import { WeatherService } from './data-access/weather.service';
import { SevenDayForecastComponent } from "./ui/sevenDayForecast/sevenDayForecast.component";

@Component({
    standalone: true,
    imports: [CurrentWeatherComponent, SevenDayForecastComponent],
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export default class HomeComponent {
    weatherService = inject(WeatherService);
}
