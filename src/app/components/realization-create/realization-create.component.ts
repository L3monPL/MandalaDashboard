import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RealizationService } from 'src/app/services/realization.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-realization-create',
  templateUrl: './realization-create.component.html',
  styleUrls: ['./realization-create.component.scss']
})
export class RealizationCreateComponent implements OnInit{

  loadingRealizationCreate = false
  subRealizationCreate?: Subscription
  customErrorRealizationCreate?: string

  constructor(
    public realizationManagement: RealizationService,
    public rest: RestService
  ) { }

  ngOnInit(): void {
    
  }

  fileToUploads: any[] = [];
  isDragging = false
  selectedFile: any = null;
  selectedImages: any[] = []

  handleFileInput(event: any): void {
    const files: any = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.fileToUploads.push(files.item(i));
      this.realizationManagement.objectRealizationCreate.imagesArray.push({
        bloob: files.item(i),
        position: i
      })
    }
  }

  onImagesSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImages.push(e.target!.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.fileToUploads.push(files.item(i));
        this.realizationManagement.objectRealizationCreate.imagesArray.push({
          bloob: files.item(i),
          position: i,
        })
      }
    }
  }

  selectFile(file: any, index?: number): void {
    this.selectedFile = file;
    this.realizationManagement.indexFirstImageSelected = index
  }

  submit(){
    // if (this.realizationManagement.objectRealizationCreate.title && this.realizationManagement.objectRealizationCreate.description) {
    //   this.loadingRealizationCreate = true
    //   this.subRealizationCreate = this.rest.postRealization(this.realizationManagement.objectRealizationCreate.title, this.realizationManagement.objectRealizationCreate.description).subscribe({
    //     next: (response) => {
    //       if(response.body){
    //         console.log(response.body)
    //         this.postRealizationImages(response.body.message)
    //       }
    //       else{
    //         this.customErrorRealizationCreate = 'Brak obiektu odpowiedzi';
    //       }
    //     },
    //     error: (errorResponse) => {
    //           this.loadingRealizationCreate = false;
    //           this.customErrorRealizationCreate = errorResponse.message
    //     },
    //     complete: () => {
    //       this.loadingRealizationCreate = false;
    //     }
    //   })
    // }
    console.log(this.fileToUploads)
    console.log(this.selectedImages)
    console.log(this.realizationManagement.indexFirstImageSelected)
    console.log(this.realizationManagement.objectRealizationCreate.imagesArray)
  }

  postRealizationImages(id: number){
    console.log(id)
    this.realizationManagement.getRealizationList()
    for (let index = 0; index < this.realizationManagement.objectRealizationCreate.imagesArray.length; index++) {
      // this.realizationManagement.objectRealizationCreate.imagesArray[index]
      //if position 0 getListRefresh
    }
  }


}
