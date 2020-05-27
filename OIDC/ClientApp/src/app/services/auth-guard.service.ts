import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, concatMap, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { OAuthService } from 'angular-oauth2-oidc';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  signedIn: boolean;

  constructor(private authenticationService: AuthenticationService, private oauthService: OAuthService, protected router: Router, ) { }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authenticationService.isSignedIn().pipe(
      map((signedIn: boolean) => {
        this.signedIn = signedIn;
      }),
      concatMap(() => this.authenticationService.userChanged().pipe(
        map(() => {
          const url: string = state.url;
          console.log('issigned::', this.signedIn)
          if (this.signedIn) {
            if (url !== '/login') {
              return true;
            }
            else {
              this.router.navigate(['/login']);
              return false;
            }
          }
          else
          {
            this.router.navigate(['/login']);
          }
        })
      ))
    );
  }
  //public canActivate(
  //  route: ActivatedRouteSnapshot,
  //  state: RouterStateSnapshot
  //): boolean {
  //  return true;
  //}
}
