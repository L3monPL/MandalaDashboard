import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesDialogComponent } from './images-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ImagesDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ImagesDialogComponent
  ]
})
export class ImagesDialogModule { }
