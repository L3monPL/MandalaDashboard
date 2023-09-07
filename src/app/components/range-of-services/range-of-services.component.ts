import { Component } from '@angular/core';
import { MainManagementService } from 'src/app/services/main-management.service';

@Component({
  selector: 'app-range-of-services',
  templateUrl: './range-of-services.component.html',
  styleUrls: ['./range-of-services.component.scss']
})
export class RangeOfServicesComponent {

  constructor(
    private mainService:MainManagementService
  ) { }

  smoothScroll(section: string){
    this.mainService.smoothScrollFunc(section)
  }
  
}
