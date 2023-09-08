import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './pages/home-page/home-page.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageModule } from './pages/login-page/login-page.module';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m=>m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard-page/dashboard-page.module').then(m=>m.DashboardPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomePageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
