import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe( take(1), map(user => {
      const isAuthenticated: boolean = user ? true : false;
      if (isAuthenticated) {
        return true;
      } else {
        return this.router.createUrlTree(['/auth']);
      }// relokacja do autentykacji gdy wylogowany chce wczytać recepies
      
    }));
  }
  
}
