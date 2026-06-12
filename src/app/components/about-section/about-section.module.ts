import { NgModule } from '@angular/core';
import { AboutSectionComponent } from './about-section.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AboutSectionComponent],
  imports: [SharedModule],
  exports: [AboutSectionComponent]
})
export class AboutSectionModule {}
