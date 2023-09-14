import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizationListInDashboardComponent } from './realization-list-in-dashboard.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    RealizationListInDashboardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    RealizationListInDashboardComponent
  ]
})
export class RealizationListInDashboardModule { }
