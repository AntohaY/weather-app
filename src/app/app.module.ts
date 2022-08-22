import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { DefaultModule } from './layouts/default/default.module';
import { EffectsModule } from '@ngrx/effects';
import {forecastReducer} from "./state/forecasts/forecast.reducer";
import {ForecastEffects} from "./state/forecasts/forecast.effects";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ forecasts: forecastReducer}, {}),
    EffectsModule.forRoot([ForecastEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
