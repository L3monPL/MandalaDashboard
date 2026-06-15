import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Word {
  text: string;
  isGold: boolean;
  isLit: boolean;
}

@Component({
  selector: 'app-statement-section',
  templateUrl: './statement-section.component.html',
  styleUrls: ['./statement-section.component.scss']
})
export class StatementSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('textEl') textEl!: ElementRef<HTMLElement>;

  words: Word[] = [
    { text: 'Jesteśmy',          isGold: false, isLit: false },
    { text: 'firmą',             isGold: false, isLit: false },
    { text: 'rodzinną',          isGold: false, isLit: false },
    { text: 'składającą',        isGold: false, isLit: false },
    { text: 'się',               isGold: false, isLit: false },
    { text: 'z',                 isGold: false, isLit: false },
    { text: 'profesjonalistów,', isGold: false, isLit: false },
    { text: 'którzy',            isGold: true,  isLit: false },
    { text: 'dbają',             isGold: true,  isLit: false },
    { text: 'o',                 isGold: true,  isLit: false },
    { text: 'Twoją',             isGold: true,  isLit: false },
    { text: 'nieruchomość',      isGold: true,  isLit: false },
    { text: 'tak,',              isGold: false, isLit: false },
    { text: 'jak',               isGold: false, isLit: false },
    { text: 'o',                 isGold: false, isLit: false },
    { text: 'własną.',           isGold: false, isLit: false },
  ];

  private observer?: IntersectionObserver;
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.words.forEach(w => { w.isLit = true; });
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animateWords();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    this.observer.observe(this.textEl.nativeElement);
  }

  private animateWords(): void {
    this.words.forEach((word, i) => {
      const t = setTimeout(() => { word.isLit = true; }, i * 70);
      this.timeouts.push(t);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.timeouts.forEach(clearTimeout);
  }
}
