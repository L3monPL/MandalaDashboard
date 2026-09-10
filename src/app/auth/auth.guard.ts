import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { RestService } from '../services/rest.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private rest: RestService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(this.router.createUrlTree(['/login']));
    }
    if (!localStorage.getItem('auth_app_token')) {
      return of(this.router.createUrlTree(['/login']));
    }
    return this.rest.getUserAuth().pipe(
      map(response => response.body ? true : this.router.createUrlTree(['/login'])),
      catchError(() => of(this.router.createUrlTree(['/login'])))
    );
  }
}
