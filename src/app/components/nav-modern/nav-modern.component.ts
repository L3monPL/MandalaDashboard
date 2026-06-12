import { Component, HostListener } from '@angular/core';
import { MainManagementService } from 'src/app/services/main-management.service';

@Component({
  selector: 'app-nav-modern',
  templateUrl: './nav-modern.component.html',
  styleUrls: ['./nav-modern.component.scss']
})
export class NavModernComponent {
  isScrolled = false;
  isMobileOpen = false;

  constructor(private mainService: MainManagementService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 60;
  }

  navigate(section: string): void {
    this.mainService.smoothScrollFunc(section);
    this.isMobileOpen = false;
  }

  toggleMobile(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }
}
