import { Component } from '@angular/core';

export interface Value {
  title: string;
  desc: string;
}

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss']
})
export class StatsSectionComponent {
  readonly romans = ['I', 'II', 'III'];

  values: Value[] = [
    {
      title: 'Zaufanie',
      desc: 'Transparentność w każdym działaniu. Klienci zawsze wiedzą co, kiedy i dlaczego — bez zaskoczeń, bez niedopowiedzeń.'
    },
    {
      title: 'Zaangażowanie',
      desc: 'Każda nieruchomość traktowana jest jak nasza własna — z pełnym oddaniem i indywidualnym podejściem do każdego Klienta.'
    },
    {
      title: 'Precyzja',
      desc: 'Dbałość o każdy szczegół, od dokumentacji po serwis techniczny. Nasz standard nie zna kompromisów.'
    }
  ];
}
