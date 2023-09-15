import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyPageComponent } from './privacy-policy-page.component';

const routes: Routes = [
  {
    path:'',
    component: PrivacyPolicyPageComponent
  }
]

@NgModule({
  declarations: [
    PrivacyPolicyPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    PrivacyPolicyPageComponent
  ]
})
export class PrivacyPolicyPageModule { }
