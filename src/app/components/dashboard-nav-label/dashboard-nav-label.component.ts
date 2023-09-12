import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav-label',
  templateUrl: './dashboard-nav-label.component.html',
  styleUrls: ['./dashboard-nav-label.component.scss']
})
export class DashboardNavLabelComponent {

  constructor(
    private router: Router,
  ) { }

  logout(){
    localStorage.removeItem('auth_app_token')
    this.router.navigateByUrl('/')
  }
}
