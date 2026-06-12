import { Component, HostListener } from '@angular/core';
import { MainManagementService } from 'src/app/services/main-management.service';

@Component({
  selector: 'app-nav-modern',
  templateUrl: './nav-modern.component.html',
  styleUrls: ['./nav-modern.component.scss']
})
export class NavModernComponent {
  isScrolled    = false;
  isMobileOpen  = false;

  constructor(private mainService: MainManagementService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 60;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMobileOpen) this.closeMobile();
  }

  navigate(section: string): void {
    this.mainService.smoothScrollFunc(section);
    this.closeMobile();
  }

  toggleMobile(): void {
    this.isMobileOpen ? this.closeMobile() : this.openMobile();
  }

  private openMobile(): void {
    this.isMobileOpen = true;
    document.body.style.overflow = 'hidden';
  }

  private closeMobile(): void {
    this.isMobileOpen = false;
    document.body.style.overflow = '';
  }
}
