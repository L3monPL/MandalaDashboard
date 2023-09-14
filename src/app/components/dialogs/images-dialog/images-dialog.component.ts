import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RealizationService } from 'src/app/services/realization.service';
import { Realization, RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-images-dialog',
  templateUrl: './images-dialog.component.html',
  styleUrls: ['./images-dialog.component.scss']
})
export class ImagesDialogComponent implements OnInit{

  indexSelectImage?: number = 0

  loadingRealizationImage = false
  subRealizationImage?: Subscription
  customErrorRealizationImage?: string

  constructor(
    private rest: RestService,
    private realizationService: RealizationService,
    public dialogRef: MatDialogRef<ImagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Realization,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.data!.images.sort((a, b) => a.position - b.position)
    this.getImages()
  }

  Add(){
    this.dialogRef.close({
      result: true
    });
  }

  Close(){
    this.dialogRef.close();
  }

  getImages(){
    for (let index = 0; index < this.data!.images.length; index++) {
      // console.log(this.data!.images[index])
      // if (this.data!.images[index]) {
      // }
      this.subRealizationImage = this.rest.getRealizationImage(this.data!.images[index]?.id).subscribe({
        next: (response) => {
          if(response){
            // console.log(response)
            this.data!.images[index]!.bloob = URL.createObjectURL(response)!;
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
  }

  selectImage(index: number){
    this.indexSelectImage =  index
  }
}
