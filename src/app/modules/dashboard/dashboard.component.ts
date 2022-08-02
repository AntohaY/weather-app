import { Component, OnInit } from '@angular/core';
import { Forecast } from 'src/app/shared/models/forecast/forecast.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  forecasts: Array<Forecast> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
