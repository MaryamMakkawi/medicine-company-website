import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private auth:AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      return  this.auth.user$.pipe(
        take(1),
        map(user => {
          if (user?.isAuth || localStorage.getItem('userData')) {
            return true;
          }
            return this.router.createUrlTree(['/login']);

        })
      );
  }
}
