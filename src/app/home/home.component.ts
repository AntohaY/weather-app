import { Component, inject, OnInit } from '@angular/core';
import { CurrentWeatherComponent } from './ui/currentWeather/currentWeather.component';
import { WeatherService } from './data-access/weather.service';

@Component({
    standalone: true,
    imports: [CurrentWeatherComponent],
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export default class HomeComponent {
    weatherService = inject(WeatherService);
}