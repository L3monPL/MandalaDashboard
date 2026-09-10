import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactSectionComponent } from './contact-section.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ContactSectionComponent],
  imports: [SharedModule, ReactiveFormsModule, RouterModule],
  exports: [ContactSectionComponent]
})
export class ContactSectionModule {}
