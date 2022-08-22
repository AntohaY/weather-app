import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Forecast } from '../../models/forecast/forecast.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

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
