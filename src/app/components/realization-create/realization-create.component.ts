import { Component } from '@angular/core';

@Component({
  selector: 'app-realization-create',
  templateUrl: './realization-create.component.html',
  styleUrls: ['./realization-create.component.scss']
})
export class RealizationCreateComponent {

  fileToUploads: any[] = [];
  isDragging = false
  selectedFile: any = null;

  handleFileInput(event: any): void {
    const files: any = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.fileToUploads.push(files.item(i));
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
}
