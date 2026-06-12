import { NgModule } from '@angular/core';
import { ServicesSectionComponent } from './services-section.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ServicesSectionComponent],
  imports: [SharedModule],
  exports: [ServicesSectionComponent]
})
export class ServicesSectionModule {}
