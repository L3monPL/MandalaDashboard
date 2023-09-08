import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardNavLabelModule } from 'src/app/components/dashboard-nav-label/dashboard-nav-label.module';

const routes: Routes = [
  {
    path:'',
    component: DashboardPageComponent,
    // children: [
    //   {
    //     path: 'realizations',
    //     // loadChildren: () => import('../form-creator-page/form-creator-page.module').then(m => m.FormCreatorPageModule)
    //   },
    // ]
  }
]

@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DashboardNavLabelModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }
