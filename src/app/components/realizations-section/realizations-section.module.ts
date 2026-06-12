import { NgModule } from '@angular/core';
import { RealizationsSectionComponent } from './realizations-section.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagesDialogModule } from '../dialogs/images-dialog/images-dialog.module';

@NgModule({
  declarations: [RealizationsSectionComponent],
  imports: [SharedModule, MatDialogModule, ImagesDialogModule],
  exports: [RealizationsSectionComponent]
})
export class RealizationsSectionModule {}
