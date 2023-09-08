import { Component, ElementRef, OnInit } from '@angular/core';
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
    private mainService: MainManagementService
    ) {}

  ngOnInit(): void {
    this.subscibeEmittNavigationSmoothScroll()
  }

  subscibeEmittNavigationSmoothScroll(){
    this.subSmoothScroll = this.mainService.smoothScrollEmit.subscribe(res => {
      this.scrollToSection(res)
    })
  }

  scrollToSection(sectionId: string) {
    const section = this.el.nativeElement.querySelector(`#${sectionId}`);
    if (section) {
      // section.scrollIntoView({ behavior: 'smooth' });
      const scrollOffset = section.getBoundingClientRect().top - 30;
    
    // Scroll to the section with smooth behavior
    window.scrollBy({
      top: scrollOffset,
      behavior: 'smooth',
    });
    }
  }

}
