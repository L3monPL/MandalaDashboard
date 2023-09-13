import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RealizationService } from 'src/app/services/realization.service';
import { Realization, RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-realizations',
  templateUrl: './realizations.component.html',
  styleUrls: ['./realizations.component.scss']
})
export class RealizationsComponent implements OnInit{

  loadingRealizationsList = false
  subRealizationsList?: Subscription
  realizationsList?: Array<Realization>
  customErrorRealizationsList?: string

  loadingRealizationImage = false
  subRealizationImage?: Subscription
  customErrorRealizationImage?: string

  constructor( 
    private rest: RestService,
    private realizationService: RealizationService
  ) { }

  ngOnInit(): void {
    this.getRealizationsList()
  }

  getRealizationsList(){
    this.loadingRealizationsList = true
    this.subRealizationsList = this.rest.getRealizationsList().subscribe({
      next: (response) => {
        if(response.body){
          this.realizationsList = response.body
          this.realizationsList.sort((a, b) => b.id - a.id)
          this.getImagesToList(this.realizationsList)
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

  getImagesToList(list: Array<Realization>){
    for (let index = 0; index < list.length; index++) {
      // for (let indexImage = 0; indexImage < list[index].images.length; indexImage++) {
        this.loadingRealizationImage = true
        // list[index].images[indexImage].id
        if (list[index].images.length == 0) {
          list.splice(index, 1)
        }
        if (list[index].images.length != 0) {
          this.subRealizationImage = this.rest.getRealizationImage(list[index].images[0]?.id).subscribe({
            next: (response) => {
              if(response){
                // console.log(response)
                list[index].images[0].bloob = URL.createObjectURL(response);
                // this.realizationsList = response.body
              }
              else{
                this.customErrorRealizationImage = 'Brak obiektu odpowiedzi';
                // this.popupService.errorEmit(this.customErrorRealizationsList)
              }
              this.loadingRealizationImage = false
            },
            error: (errorResponse) => {
              this.loadingRealizationImage = false
              this.customErrorRealizationImage = errorResponse.error.message
              console.log(this.customErrorRealizationImage);
              // this.popupService.errorEmit(errorResponse.error.message)
            },
            complete: () => {
              this.loadingRealizationImage = false;
            }
          })  
        }
        
      // }
    }
  }




}
