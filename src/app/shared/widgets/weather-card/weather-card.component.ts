import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Forecast } from '../../models/forecast/forecast.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  currentDateTime!: string;
  @Input() weatherForecast!: Forecast;
  @Output() removeForecastEvent = new EventEmitter<Forecast>();

  constructor(public datepipe: DatePipe) {
    this.currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss')|| '';
   }

  ngOnInit(): void {
  }

  removeForecast(): void {
    this.removeForecastEvent.emit(this.weatherForecast)
  }

}
