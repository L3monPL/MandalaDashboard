import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Realization, RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-realization-list-in-dashboard',
  templateUrl: './realization-list-in-dashboard.component.html',
  styleUrls: ['./realization-list-in-dashboard.component.scss']
})
export class RealizationListInDashboardComponent implements OnInit{

  constructor(
    private rest: RestService
  ) { }

  ngOnInit(): void {
    this.getRealizationsList()
  }

  loadingRealizationsList = false
  subRealizationsList?: Subscription
  realizationsList?: Array<Realization>
  customErrorRealizationsList?: string

  getRealizationsList(){
    this.loadingRealizationsList = true
    this.subRealizationsList = this.rest.getRealizationsList().subscribe({
      next: (response) => {
        if(response.body){
          this.realizationsList = response.body
        }
        else{
          this.customErrorRealizationsList = 'Brak obiektu odpowiedzi';
          // this.popupService.errorEmit(this.customErrorRealizationsList)
        }
        this.loadingRealizationsList = false
      },
      error: (errorResponse) => {
        this.loadingRealizationsList = false
        this.customErrorRealizationsList = errorResponse.error.message
        console.log(this.customErrorRealizationsList);
        // this.popupService.errorEmit(errorResponse.error.message)
      },
      complete: () => {
        this.loadingRealizationsList = false;
      }
    })
  }

  

}
