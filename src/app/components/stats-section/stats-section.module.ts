import { NgModule } from '@angular/core';
import { StatsSectionComponent } from './stats-section.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [StatsSectionComponent],
  imports: [SharedModule],
  exports: [StatsSectionComponent]
})
export class StatsSectionModule {}
