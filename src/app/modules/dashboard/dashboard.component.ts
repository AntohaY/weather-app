import { Component, OnInit } from '@angular/core';
import { Forecast } from 'src/app/shared/models/forecast/forecast.model';
import { Store } from '@ngrx/store';
import { addForecast, loadForecasts, removeForecast } from 'src/app/state/forecasts/forecast.actions';
import {selectAllForecasts} from "../../state/forecasts/forecast.selectors";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @ts-ignore
  public allForecasts$ = this.store.select(selectAllForecasts);
  public forecast = ''
  public test = 'haha';

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadForecasts());
  }

  addForecast(): void {
    this.store.dispatch(addForecast({ cityName: this.forecast }));
    this.forecast = '';
  }

  removeForecast(forecast: Forecast): void {
    this.store.dispatch(removeForecast({ id: forecast.id }))
  }

}
