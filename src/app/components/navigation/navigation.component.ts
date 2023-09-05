import { Component } from '@angular/core';
import { MainManagementService } from 'src/app/services/main-management.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
    private mainService:MainManagementService
  ) { }

  smoothScroll(section: string){
    this.mainService.smoothScrollFunc(section)
  }
}
