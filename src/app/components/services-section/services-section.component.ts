import { Component } from '@angular/core';

export interface Service {
  num: string;
  image: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.scss']
})
export class ServicesSectionComponent {
  services: Service[] = [
    {
      num: '01',
      image: 'assets/image-service/planowanie-min.webp',
      title: 'Zarządzanie Okresem Deweloperskim',
      desc: 'Kompleksowa obsługa procesu inwestycyjnego — od projektu po odbiór kluczy. Koordynacja wykonawców, nadzór nad harmonogramem i budżetem oraz eliminacja ryzyk inwestycyjnych na każdym etapie budowy.'
    },
    {
      num: '02',
      image: 'assets/image-service/develop-min.webp',
      title: 'Opieka Najmem Nieruchomości',
      desc: 'Profesjonalne zarządzanie wynajmem bez Twojego zaangażowania. Poszukiwanie i weryfikacja najemców, regularne kontrole stanu technicznego, obsługa umów oraz windykacja należności.'
    },
    {
      num: '03',
      image: 'assets/image-service/osiedla-min.webp',
      title: 'Budynki Komercyjne i Wspólnoty',
      desc: 'Administracja budynkami komercyjnymi i obsługa wspólnot mieszkaniowych. Prowadzenie pełnej dokumentacji, rozliczeń, nadzór nad częściami wspólnymi i reprezentacja wobec urzędów.'
    },
    {
      num: '04',
      image: 'assets/image-service/serwis-konserwatorski-min.webp',
      title: 'Serwis Konserwatorski',
      desc: 'Stały nadzór techniczny i błyskawiczna reakcja na awarie. Przeglądy instalacji, koordynacja ekip remontowych, dbałość o sprawność techniczną nieruchomości przez cały rok.'
    }
  ];
}
