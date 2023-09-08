import { Component, HostBinding, HostListener } from '@angular/core';
import { MainManagementService } from 'src/app/services/main-management.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @HostBinding('class.sticky_nav') newNav?: boolean

  @HostListener('window:scroll') onScroll(){
    console.log(window.scrollY)
    if (window.scrollY > 39) {
      this.newNav = true
    }
    else{
      this.newNav = false
    }
  }

  constructor(
    private mainService:MainManagementService
  ) { }

  smoothScroll(section: string){
    this.mainService.smoothScrollFunc(section)
  }
}
