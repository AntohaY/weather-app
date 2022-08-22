import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { ForecastComponent } from './widgets/forecast/forecast.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    HeaderComponent,
    ForecastComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
    ForecastComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
