import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieConsentComponent } from './cookie-consent.component';

@NgModule({
  declarations: [CookieConsentComponent],
  imports: [CommonModule, RouterModule],
  exports: [CookieConsentComponent]
})
export class CookieConsentModule { }
