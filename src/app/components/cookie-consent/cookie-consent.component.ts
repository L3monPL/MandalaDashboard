import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  visible = false;
  private readonly KEY = 'mandala_cookie_consent';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !localStorage.getItem(this.KEY)) {
      setTimeout(() => { this.visible = true; }, 800);
    }
  }

  acceptAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.KEY, 'all');
    }
    this.visible = false;
  }

  acceptNecessary(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.KEY, 'necessary');
    }
    this.visible = false;
  }

  openPolicy(): void {
    this.router.navigate(['/polityka-prywatnosci']);
  }
}
