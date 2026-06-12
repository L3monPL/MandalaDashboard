import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { NavModernModule } from 'src/app/components/nav-modern/nav-modern.module';
import { HeroSectionModule } from 'src/app/components/hero-section/hero-section.module';
import { StatementSectionModule } from 'src/app/components/statement-section/statement-section.module';
import { ServicesSectionModule } from 'src/app/components/services-section/services-section.module';
import { AboutSectionModule } from 'src/app/components/about-section/about-section.module';
import { StatsSectionModule } from 'src/app/components/stats-section/stats-section.module';
import { RealizationsSectionModule } from 'src/app/components/realizations-section/realizations-section.module';
import { ContactSectionModule } from 'src/app/components/contact-section/contact-section.module';
import { FooterModernModule } from 'src/app/components/footer-modern/footer-modern.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    NavModernModule,
    HeroSectionModule,
    StatementSectionModule,
    ServicesSectionModule,
    AboutSectionModule,
    StatsSectionModule,
    RealizationsSectionModule,
    ContactSectionModule,
    FooterModernModule,
  ],
  exports: [HomePageComponent]
})
export class HomePageModule {}
