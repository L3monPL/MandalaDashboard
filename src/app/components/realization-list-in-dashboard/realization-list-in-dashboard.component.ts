import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RealizationService } from 'src/app/services/realization.service';
import { Realization, RestService } from 'src/app/services/rest.service';
import { ImagesDialogComponent } from '../dialogs/images-dialog/images-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-realization-list-in-dashboard',
  templateUrl: './realization-list-in-dashboard.component.html',
  styleUrls: ['./realization-list-in-dashboard.component.scss']
})
export class RealizationListInDashboardComponent implements OnInit, OnDestroy{

  loadingRealizationsList = false
  subRealizationsList?: Subscription
  realizationsList?: Array<Realization>
  customErrorRealizationsList?: string

  loadingRealizationImage = false
  subRealizationImage?: Subscription
  customErrorRealizationImage?: string

  loadingRealizationDelete = false
  subRealizationDelete?: Subscription
  customErrorRealizationDelete?: string

  subRealizationListEmit?: Subscription

  constructor(
    private rest: RestService,
    private realizationService: RealizationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getRealizationsList()
    this.subRealizationsListRefresh()
  }

  ngOnDestroy(): void {
    this.subRealizationListEmit?.unsubscribe()
  }

  subRealizationsListRefresh(){
    this.subRealizationListEmit = this.realizationService.realizationListEmit.subscribe(res => {
      this.getRealizationsList()
    })
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

      let indexPosition0: number

      for (let indexPosition = 0; indexPosition < list[index].images.length; indexPosition++) {
        if (list[index].images[indexPosition].position == 0) {
          indexPosition0 = indexPosition
        }
      }
      // for (let indexImage = 0; indexImage < list[index].images.length; indexImage++) {
        this.loadingRealizationImage = true
        // list[index].images[indexImage].id
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
      // }
    }
  }

  openPreview(realization: Realization): void {
    this.dialog.open(ImagesDialogComponent, {
      width: '90vw',
      height: '90vh',
      autoFocus: false,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms',
      data: realization
    });
  }

  deleteRealization(id: number, title: string): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      enterAnimationDuration: '180ms',
      exitAnimationDuration: '100ms',
      data: {
        title: 'Usuń realizację',
        message: `Czy na pewno chcesz usunąć realizację „${title}"? Tej operacji nie można cofnąć.`,
        confirmLabel: 'Usuń'
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.loadingRealizationDelete = true;
      this.subRealizationDelete = this.rest.deleteReazlization(id).subscribe({
        next: (response) => {
          if (response) this.getRealizationsList();
          else this.customErrorRealizationDelete = 'Brak obiektu odpowiedzi';
          this.loadingRealizationDelete = false;
        },
        error: (errorResponse) => {
          this.loadingRealizationDelete = false;
          this.customErrorRealizationDelete = errorResponse.error.message;
          console.log(this.customErrorRealizationDelete);
        },
        complete: () => { this.loadingRealizationDelete = false; }
      });
    });
  }

  

}
