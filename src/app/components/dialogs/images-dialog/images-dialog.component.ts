import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Realization, RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-images-dialog',
  templateUrl: './images-dialog.component.html',
  styleUrls: ['./images-dialog.component.scss']
})
export class ImagesDialogComponent implements OnInit, OnDestroy {

  activeIndex = 0;
  isFading = false;

  private subImg?: Subscription;
  private fadeTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private rest: RestService,
    public dialogRef: MatDialogRef<ImagesDialogComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: Realization
  ) {}

  ngOnInit(): void {
    this.data!.images.sort((a, b) => a.position - b.position);
    this.loadMissingImages();
  }

  private loadMissingImages(): void {
    this.data!.images.forEach((img, index) => {
      if (img.bloob) return;
      this.subImg = this.rest.getRealizationImage(img.id).subscribe({
        next: (blob) => {
          if (blob) this.data!.images[index].bloob = URL.createObjectURL(blob);
        }
      });
    });
  }

  get activeImage(): any {
    return this.data && this.data.images ? this.data.images[this.activeIndex] : null;
  }

  get images(): any[] {
    return this.data && this.data.images ? this.data.images : [];
  }

  get imagesCount(): number {
    return this.images.length;
  }

  get isLastImage(): boolean {
    return this.activeIndex >= this.imagesCount - 1;
  }

  private switchTo(index: number): void {
    if (index === this.activeIndex) return;
    clearTimeout(this.fadeTimer);
    this.isFading = true;
    this.fadeTimer = setTimeout(() => {
      this.activeIndex = index;
      this.isFading = false;
    }, 160);
  }

  select(index: number): void {
    this.switchTo(index);
  }

  prev(): void {
    if (this.activeIndex > 0) this.switchTo(this.activeIndex - 1);
  }

  next(): void {
    if (this.activeIndex < this.imagesCount - 1) this.switchTo(this.activeIndex + 1);
  }

  close(): void {
    this.dialogRef.close();
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft') this.prev();
    else if (e.key === 'ArrowRight') this.next();
    else if (e.key === 'Escape') this.close();
  }

  ngOnDestroy(): void {
    this.subImg?.unsubscribe();
    clearTimeout(this.fadeTimer);
  }
}
