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

  loadingRealizationImage = false
  subRealizationImage?: Subscription
  customErrorRealizationImage?: string

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
    if (this.realizationManagement.objectRealizationCreate.title && this.realizationManagement.objectRealizationCreate.description) {
      this.loadingRealizationCreate = true
      this.subRealizationCreate = this.rest.postRealization(this.realizationManagement.objectRealizationCreate.title, this.realizationManagement.objectRealizationCreate.description).subscribe({
        next: (response) => {
          if(response.body){
            // console.log(response.body)
            this.postRealizationImages(response.body.message)
          }
          else{
            this.customErrorRealizationCreate = 'Brak obiektu odpowiedzi';
          }
        },
        error: (errorResponse) => {
              this.loadingRealizationCreate = false;
              this.customErrorRealizationCreate = errorResponse.message
        },
        complete: () => {
          this.loadingRealizationCreate = false;
        }
      })
    }
    // console.log(this.fileToUploads)
    // console.log(this.selectedImages)
    // console.log(this.realizationManagement.indexFirstImageSelected)
    // console.log(this.realizationManagement.objectRealizationCreate.imagesArray)
  }

  postRealizationImages(id: number){

    let maxPosition = -1
    for (let index = 0; index < this.realizationManagement.objectRealizationCreate.imagesArray.length; index++) {
      if (this.realizationManagement.objectRealizationCreate.imagesArray[index].position >= maxPosition) {
        maxPosition = this.realizationManagement.objectRealizationCreate.imagesArray[index].position
      }
      // for (let index = 0; index < this.realizationManagement.objectRealizationCreate.imagesArray.length; index++) {
      //   if (this.realizationManagement.objectRealizationCreate.imagesArray[index].position != 0) {
      //     this.realizationManagement.objectRealizationCreate.imagesArray[index].position = this.realizationManagement.objectRealizationCreate.imagesArray[index].position + 1 
      //   }
      // }
    }
    // for (let index = 0; index < this.realizationManagement.objectRealizationCreate.imagesArray.length; index++) {
      if (this.realizationManagement.indexFirstImageSelected) {
        this.realizationManagement.objectRealizationCreate.imagesArray[this.realizationManagement.indexFirstImageSelected]

        console.log(this.realizationManagement.objectRealizationCreate.imagesArray[this.realizationManagement.indexFirstImageSelected])
        
        const elementIndex = this.realizationManagement.objectRealizationCreate.imagesArray.indexOf(this.realizationManagement.objectRealizationCreate.imagesArray[this.realizationManagement.indexFirstImageSelected])
        if (elementIndex !== -1) {
          const removedElement = this.realizationManagement.objectRealizationCreate.imagesArray.splice(elementIndex, 1)[0]; // Splice returns an array, so we get the first element
          this.realizationManagement.objectRealizationCreate.imagesArray.unshift(removedElement);
        }
      }
    // }

    for (let index = 0; index < this.realizationManagement.objectRealizationCreate.imagesArray.length; index++) {
      this.realizationManagement.objectRealizationCreate.imagesArray[index].position = index
    }
    console.log(this.realizationManagement.objectRealizationCreate.imagesArray)





    
    for (let index = 0; index < this.realizationManagement.objectRealizationCreate.imagesArray.length; index++) {
      this.loadingRealizationImage = true
      this.subRealizationImage  = this.rest.postRealizationImage(id, this.realizationManagement.objectRealizationCreate.imagesArray[index].position, this.realizationManagement.objectRealizationCreate.imagesArray[index].bloob).subscribe({
        next: (response) => {
          if (this.realizationManagement.objectRealizationCreate.imagesArray[index]?.position == 0) {
            this.realizationManagement.getRealizationList()
          }
          if (this.realizationManagement.objectRealizationCreate.imagesArray[index]?.position == maxPosition) {
            this.clearForm()
          }
          else{
            this.customErrorRealizationImage  = 'Brak obiektu odpowiedzi';
          }
        },
        error: (errorResponse) => {
              this.loadingRealizationImage = false;
              this.customErrorRealizationImage = errorResponse.message
        },
        complete: () => {
          this.loadingRealizationImage = false;
        }
      })
    }
  }

  clearForm(){
    this.realizationManagement.objectRealizationCreate.title = ''
    this.realizationManagement.objectRealizationCreate.description = ''
    this.realizationManagement.objectRealizationCreate.imagesArray = []
    this.realizationManagement.indexFirstImageSelected = null
    this.fileToUploads = []
    this.selectedFile = null
    this.selectedImages = []
  }


}
