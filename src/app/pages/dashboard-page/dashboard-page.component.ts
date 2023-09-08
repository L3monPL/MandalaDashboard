import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.router.url === '/dashboard'){
      this.router.navigate(['./dashboard/realizations'])
    }
  }

}
