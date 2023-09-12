import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{

  @HostListener('window:resize', ['$event'])
     onResize(event: any){
      this.setSizeOptions(window.innerWidth)
   }

  // menuMode: MatDrawerMode = 'side'
  menuMode = 'side'
  menushow?: boolean = true
  nazwa?: string 

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setSizeOptions(window.innerWidth);
    if(this.router.url === '/dashboard'){
      this.router.navigate(['./dashboard/realizations'])
    }
  }

  setSizeOptions(width: number){
    if(window.innerWidth > 1100){
      this.menuMode = 'side';
      this.menushow = true;
     }
     else{
      this.menuMode = 'over';
      this.menushow = false;
     }
     //TO EDIT

  }

}
