import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { RestService } from '../services/rest.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private rest: RestService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (!localStorage.getItem('auth_app_token')) {
      return of(this.router.createUrlTree(['/login']));
    }
    return this.rest.getUserAuth().pipe(
      map(response => response.body ? true : this.router.createUrlTree(['/login'])),
      catchError(() => of(this.router.createUrlTree(['/login'])))
    );
  }
}
