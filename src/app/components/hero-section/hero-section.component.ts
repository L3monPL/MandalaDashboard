import { Component, HostListener } from '@angular/core';
import { MainManagementService } from 'src/app/services/main-management.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  parallaxY = 0;

  constructor(private mainService: MainManagementService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.parallaxY = window.scrollY * 0.15;
  }

  navigate(section: string): void {
    this.mainService.smoothScrollFunc(section);
  }
}
