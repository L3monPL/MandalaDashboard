import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MainManagementService } from 'src/app/services/main-management.service';

@Component({
  selector: 'app-nav-modern',
  templateUrl: './nav-modern.component.html',
  styleUrls: ['./nav-modern.component.scss']
})
export class NavModernComponent {
  isScrolled   = false;
  isMobileOpen = false;

  constructor(
    private mainService: MainManagementService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 60;
    }
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
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  private closeMobile(): void {
    this.isMobileOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}
