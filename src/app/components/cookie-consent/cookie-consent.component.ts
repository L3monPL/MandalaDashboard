import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  visible = false;
  private readonly KEY = 'mandala_cookie_consent';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem(this.KEY)) {
      setTimeout(() => { this.visible = true; }, 800);
    }
  }

  acceptAll(): void {
    localStorage.setItem(this.KEY, 'all');
    this.visible = false;
  }

  acceptNecessary(): void {
    localStorage.setItem(this.KEY, 'necessary');
    this.visible = false;
  }

  openPolicy(): void {
    this.router.navigate(['/polityka-prywatnosci']);
  }
}
