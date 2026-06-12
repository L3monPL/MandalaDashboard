import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterModernComponent } from './footer-modern.component';

@NgModule({
  declarations: [FooterModernComponent],
  imports: [CommonModule, RouterModule],
  exports: [FooterModernComponent]
})
export class FooterModernModule {}
