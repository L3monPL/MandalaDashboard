import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizationListInDashboardComponent } from './realization-list-in-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagesDialogModule } from '../dialogs/images-dialog/images-dialog.module';
import { ConfirmDialogModule } from '../dialogs/confirm-dialog/confirm-dialog.module';


@NgModule({
  declarations: [
    RealizationListInDashboardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    ImagesDialogModule,
    ConfirmDialogModule
  ],
  exports: [
    RealizationListInDashboardComponent
  ]
})
export class RealizationListInDashboardModule { }
