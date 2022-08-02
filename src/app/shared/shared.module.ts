import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { WeatherCardComponent } from './widgets/weather-card/weather-card.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    HeaderComponent,
    WeatherCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDividerModule,
    MatCardModule
  ],
  exports: [
    HeaderComponent,
    WeatherCardComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
