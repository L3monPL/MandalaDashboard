import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PopupManagementService } from 'src/app/services/popup-management.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  loadingLogin = false
  subLogin?: Subscription
  customErrorLogin?: string

  formEmail = new FormGroup({
    name: new FormControl ('', [Validators.required]),
    email: new FormControl ('', [Validators.required, Validators.email]),
    description: new FormControl ('', [Validators.required])
  })

  constructor(
    private rest: RestService,
    private popupService: PopupManagementService
  ) { }


  submitEmail(){
    if (this.formEmail.valid) {
      let name = this.formEmail.get('name')!.value;
      let email = this.formEmail.get('email')!.value;
      let description = this.formEmail.get('description')!.value;

      console.log('test')

      let text

      this.subLogin = this.rest.postContactEmail(email!, description!).subscribe({
        next: (response) => {
          if(response.body){

          }
          else{
            this.customErrorLogin = 'Brak obiektu odpowiedzi';
            this.popupService.errorEmit(this.customErrorLogin)
          }
        },
        error: (errorResponse) => {
          this.loadingLogin = false
          this.customErrorLogin = errorResponse.error.message
          this.popupService.errorEmit(errorResponse.error.message)
        },
        complete: () => {
          this.loadingLogin = false;
        }
      }) 
    }
  }
}
