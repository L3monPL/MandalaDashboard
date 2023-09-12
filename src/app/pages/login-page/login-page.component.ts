import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  loadingLogin = false
  subLogin?: Subscription
  customErrorLogin?: string

  loadingUserIsLogin = false
  subUserIsLogin?: Subscription
  customErrorUserIsLogin?: string

  constructor( 
    private router: Router,
    private rest: RestService
  ){}

  ngOnInit(): void {
    this.checkUserIsLogin()
  }

  loginForm = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required])
  })
  
  // submit(){
  //   this.router.navigateByUrl('/dashboard');
  // }

  checkUserIsLogin(){
    this.loadingUserIsLogin = true
    this.subUserIsLogin = this.rest.getUserAuth().subscribe({
      next: (response) => {
        if(response.body){
          this.router.navigateByUrl('/dashboard');
        }
        else{
          this.customErrorUserIsLogin = 'Brak obiektu odpowiedzi';
        }
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400:
          case 401:
          case 403:
            this.loadingUserIsLogin = false;
            break;
          
          default:
            this.customErrorUserIsLogin = 'Błąd serwera'
            break;
        }
        // this.router.navigateByUrl('/')
        // console.log(this.customError);
      },
      complete: () => {
        this.loadingUserIsLogin = false;
      }
    })
  }

  submit(){
    if (this.loginForm.valid) {
      this.loadingLogin = true
      let loginValue = this.loginForm.get('email')!.value;
      let passwordValue = this.loginForm.get('password')!.value;

      console.log('test')

      this.subLogin = this.rest.postLogin(loginValue!, passwordValue!).subscribe({
        next: (response) => {
          if(response.body){
            localStorage.setItem('auth_app_token', response.body)
            this.router.navigateByUrl('/dashboard')
          }
          else{
            this.customErrorLogin = 'Brak obiektu odpowiedzi';
            // this.popupService.errorEmit(this.customErrorLogin)
          }
        },
        error: (errorResponse) => {
          this.loadingLogin = false
          this.customErrorLogin = errorResponse.error.message
          console.log(this.customErrorLogin);
          // this.popupService.errorEmit(errorResponse.error.message)
        },
        complete: () => {
          this.loadingLogin = false;
        }
      })
    }
    else{
      // this.popupService.errorEmit('Wypełnij formularz logowania!')
    }
  }
}
