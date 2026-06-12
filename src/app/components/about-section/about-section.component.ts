import { Component } from '@angular/core';
import { MainManagementService } from 'src/app/services/main-management.service';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss']
})
export class AboutSectionComponent {
  constructor(private mainService: MainManagementService) {}

  navigateToContact(): void {
    this.mainService.smoothScrollFunc('contact');
  }
}
