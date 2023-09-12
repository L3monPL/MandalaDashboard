import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizationPageComponent } from './realization-page.component';
import { RouterModule, Routes } from '@angular/router';
import { RealizationCreateModule } from 'src/app/components/realization-create/realization-create.module';
import { RealizationListInDashboardModule } from 'src/app/components/realization-list-in-dashboard/realization-list-in-dashboard.module';

const routes: Routes = [
  {
    path:'',
    component: RealizationPageComponent
  }
]

@NgModule({
  declarations: [
    RealizationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RealizationCreateModule,
    RealizationListInDashboardModule
  ],
  exports: [
    RealizationPageComponent
  ]
})
export class RealizationPageModule { }
