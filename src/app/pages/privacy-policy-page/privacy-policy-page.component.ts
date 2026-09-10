import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy-page',
  templateUrl: './privacy-policy-page.component.html',
  styleUrls: ['./privacy-policy-page.component.scss']
})
export class PrivacyPolicyPageComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Polityka prywatności | Mandala Nieruchomości');
    this.meta.updateTag({ name: 'description', content: 'Polityka prywatności firmy Mandala Nieruchomości Kacper Plenzer — informacje o przetwarzaniu danych osobowych zebranych za pomocą formularza kontaktowego.' });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

}
