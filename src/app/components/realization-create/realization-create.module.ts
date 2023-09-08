import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizationCreateComponent } from './realization-create.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RealizationCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule 
  ],
  exports: [
    RealizationCreateComponent
  ]
})
export class RealizationCreateModule { }
