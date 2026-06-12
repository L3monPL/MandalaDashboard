import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Realization, RealizationListPaginator, RestService } from 'src/app/services/rest.service';
import { ImagesDialogComponent } from '../dialogs/images-dialog/images-dialog.component';

@Component({
  selector: 'app-realizations-section',
  templateUrl: './realizations-section.component.html',
  styleUrls: ['./realizations-section.component.scss']
})
export class RealizationsSectionComponent implements OnInit, OnDestroy {
  realizationsList?: RealizationListPaginator;
  page = 1;
  private readonly itemsPerPage = 6;
  private pageSize = 0;
  maxPages = 1;
  loading = false;

  private subList?: Subscription;
  private subImg?: Subscription;

  constructor(
    private rest: RestService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.loading = true;
    this.page = page;
    this.subList = this.rest.getRealizationsListPaginator(page, this.itemsPerPage).subscribe({
      next: (response) => {
        if (response.body) {
          this.realizationsList = response.body;
          if (page === 1 && response.body.list.length > 0) {
            this.pageSize = response.body.list.length;
          }
          this.maxPages = this.pageSize > 0
            ? Math.ceil(response.body.listCount / this.pageSize)
            : 1;
          this.loadImages(this.realizationsList.list);
        }
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  private loadImages(list: Realization[]): void {
    list.forEach((item) => {
      const coverImage = item.images.find(img => img.position === 0) ?? item.images[0];
      if (!coverImage) return;

      this.subImg = this.rest.getRealizationImage(coverImage.id).subscribe({
        next: (blob) => {
          item.images[0].bloob = URL.createObjectURL(blob);
        }
      });
    });
  }

  changePage(dir: 'next' | 'prev'): void {
    if (dir === 'next' && this.page < this.maxPages) {
      this.loadPage(this.page + 1);
    }
    if (dir === 'prev' && this.page > 1) {
      this.loadPage(this.page - 1);
    }
  }

  openPreview(item: Realization): void {
    this.dialog.open(ImagesDialogComponent, {
      width: '90vw',
      height: '90vh',
      autoFocus: false,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms',
      data: item
    });
  }

  ngOnDestroy(): void {
    this.subList?.unsubscribe();
    this.subImg?.unsubscribe();
  }
}
