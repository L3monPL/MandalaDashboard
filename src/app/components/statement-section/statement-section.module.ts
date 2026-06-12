import { NgModule } from '@angular/core';
import { StatementSectionComponent } from './statement-section.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [StatementSectionComponent],
  imports: [SharedModule],
  exports: [StatementSectionComponent]
})
export class StatementSectionModule {}
