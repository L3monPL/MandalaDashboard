import { Component } from '@angular/core';
import { RealizationService } from 'src/app/services/realization.service';

@Component({
  selector: 'app-realization-create',
  templateUrl: './realization-create.component.html',
  styleUrls: ['./realization-create.component.scss']
})
export class RealizationCreateComponent {

  constructor(
    public realizationManagement: RealizationService
  ) { }

  fileToUploads: any[] = [];
  isDragging = false
  selectedFile: any = null;
  selectedImages: any[] = []

  handleFileInput(event: any): void {
    const files: any = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.fileToUploads.push(files.item(i));
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
      }
    }
  }

  selectFile(file: any): void {
    this.selectedFile = file;
  }

  submit(){
    console.log(this.realizationManagement.objectRealizationCreate)
  }
}
