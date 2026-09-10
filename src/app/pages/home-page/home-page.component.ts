import { Component, ElementRef, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MainManagementService } from 'src/app/services/main-management.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  subSmoothScroll?: Subscription

  constructor(
    private el: ElementRef,
    private mainService: MainManagementService,
    private titleService: Title,
    private meta: Meta
    ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Mandala - Zarządzanie nieruchomościami | Poznań, Skórzewo, Wielkopolska');
    this.meta.updateTag({ name: 'description', content: 'Kompleksowe usługi zarządzania nieruchomościami na wynajem, zarządzania okresem deweloperskim, obsługa nieruchomości komercyjnych i wspólnotowych, oraz serwis konserwatorski — Poznań, Skórzewo, Wielkopolska.' });
    this.subscibeEmittNavigationSmoothScroll();
  }

  subscibeEmittNavigationSmoothScroll(){
    this.subSmoothScroll = this.mainService.smoothScrollEmit.subscribe(res => {
      this.scrollToSection(res)
    })
  }

  scrollToSection(sectionId: string): void {
    const section = this.el.nativeElement.querySelector(`#${sectionId}`);
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

}
