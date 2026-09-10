import { HttpErrorResponse, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  intercept(request: HttpRequest<any>, next: any) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_app_token');
      if (token) {
        request = request.clone({
          setHeaders: { Authorization: `${token}` }
        });
      }
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (isPlatformBrowser(this.platformId) && err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            localStorage.removeItem('auth_app_token');
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => err);
      })
    );
  }
}
