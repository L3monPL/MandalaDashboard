import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizationsComponent } from './realizations.component';
import { ImagesDialogModule } from '../dialogs/images-dialog/images-dialog.module';



@NgModule({
  declarations: [
    RealizationsComponent
  ],
  imports: [
    CommonModule,
    ImagesDialogModule
  ],
  exports: [
    RealizationsComponent
  ]
})
export class RealizationsModule { }
