import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module'
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DashboardService } from '../../modules/dashboard/dashboard.service'
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent
  ],
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        MatDividerModule,
        FormsModule,

    ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
