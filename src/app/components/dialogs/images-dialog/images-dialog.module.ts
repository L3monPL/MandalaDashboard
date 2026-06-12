import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagesDialogComponent } from './images-dialog.component';

@NgModule({
  declarations: [ImagesDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [ImagesDialogComponent]
})
export class ImagesDialogModule { }
