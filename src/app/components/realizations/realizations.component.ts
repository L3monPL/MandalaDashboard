import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RealizationService } from 'src/app/services/realization.service';
import { Realization, RealizationListPaginator, RestService } from 'src/app/services/rest.service';
import { ImagesDialogComponent } from '../dialogs/images-dialog/images-dialog.component';

@Component({
  selector: 'app-realizations',
  templateUrl: './realizations.component.html',
  styleUrls: ['./realizations.component.scss']
})
export class RealizationsComponent implements OnInit{

  loadingRealizationsList = false
  subRealizationsList?: Subscription
  realizationsList?: RealizationListPaginator
  customErrorRealizationsList?: string

  loadingRealizationImage = false
  subRealizationImage?: Subscription
  customErrorRealizationImage?: string

  page?: number = 1
  limit?: number = 4
  maxPages?: number = 1

  constructor( 
    private rest: RestService,
    private realizationService: RealizationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getRealizationsList(1)
  }

  getRealizationsList(page?: number){
    this.loadingRealizationsList = true
    this.subRealizationsList = this.rest.getRealizationsListPaginator(page).subscribe({
      next: (response) => {
        if(response.body){
          this.realizationsList = response.body
          console.log(this.realizationsList)
          this.maxPage(this.realizationsList.listCount)
          // this.realizationsList.list.sort((a, b) => b.id - a.id)
          this.getImagesToList(this.realizationsList.list)
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
      let indexPosition0: number
      for (let indexPosition = 0; indexPosition < list[index].images.length; indexPosition++) {
        if (list[index].images[indexPosition].position == 0) {
          indexPosition0 = indexPosition
        }
      }
      // for (let indexImage = 0; indexImage < list[index].images.length; indexImage++) {
        this.loadingRealizationImage = true
        // list[index].images[indexImage].id
        if (list[index].images.length == 0) {
          list.splice(index, 1)
        }
        if (list[index].images.length != 0) {
          this.subRealizationImage = this.rest.getRealizationImage(list[index].images[indexPosition0!]?.id).subscribe({
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

  maxPage(number: number){
    this.maxPages = Math.ceil(number / this.limit!)
  }

  changePage(typ: string){
    if (typ == 'next' && (this.maxPages! > this.page!)) {
      this.page = this.page! + 1
      this.getRealizationsList(this.page)
    }
    if (typ == 'back') {
      if (this.page! > 1) {
        this.page = this.page! - 1
        this.getRealizationsList(this.page)
      }
    }
    // this.getRealizationsList(this.page)
  }

  openDialogFormPreview(enterAnimationDuration: string, exitAnimationDuration: string, imageData?: Realization): void {
    const dialogRef = this.dialog.open(ImagesDialogComponent, {
      width: '90vw',
      height: '90vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data: imageData
    });
    dialogRef.afterClosed().subscribe(result =>{
     if (result) {
      console.log()
    }
  })
  }




}
