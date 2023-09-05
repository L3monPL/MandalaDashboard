import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { RealizationsModule } from 'src/app/components/realizations/realizations.module';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RealizationsModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
