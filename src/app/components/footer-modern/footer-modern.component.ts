import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-modern',
  templateUrl: './footer-modern.component.html',
  styleUrls: ['./footer-modern.component.scss']
})
export class FooterModernComponent {
  year = new Date().getFullYear();

  openMap(): void {
    window.open('https://maps.google.com/?q=ul.+Wakacyjna+19/2+Skórzewo', '_blank');
  }
}
