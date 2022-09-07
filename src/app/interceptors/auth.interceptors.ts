import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, exhaustMap, Observable, take, throwError } from 'rxjs';
import { User } from '../interfaces/user.model';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuth: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.userAuth.user$.pipe(
      take(1),
      exhaustMap((user: User | null) => {
        if (!user) {
          return next.handle(req).pipe(
            catchError((err) => {
              return throwError(() => err.error.message);
            })
          );
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
          setHeaders: {
            'Access-Control-Allow-Origin': '*',
          },
          setParams: {
            'access-token': user.getToken(),
          },
        });
        console.log(modifiedReq);
        return next.handle(modifiedReq).pipe(
          catchError((err) => {
            return throwError(() => err.error.message);
          })
        );
      })
    );
  }
}
