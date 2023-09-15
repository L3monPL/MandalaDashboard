import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RealizationCreateComponent } from './components/realization-create/realization-create.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserDataService } from './services/global/user-data.service';
import { PopupDoneModule } from './components/popup-done/popup-done.module';
import { PopupErrorModule } from './components/popup-error/popup-error.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PopupErrorModule,
    PopupDoneModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
