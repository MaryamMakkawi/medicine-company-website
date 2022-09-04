import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { UserAuth } from '../components/login/userAuth.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<UserAuth | null>(null);

  constructor(
    private http: HttpClient,
    private route: Router,
    private afAuth: AngularFireAuth
  ) {}

  signUpAuth(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSDL7eoSZNFJWT6M6--ofXSQLFw4QzDSE',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((resData) => {
          this.handelAuth(resData.email, resData.localId, resData.idToken);
        }),
        catchError(this.handelError)
      );
  }

  loginAuth(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSDL7eoSZNFJWT6M6--ofXSQLFw4QzDSE',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((resData) => {
          this.handelAuth(resData.email, resData.localId, resData.idToken);
        }),
        catchError(this.handelError)
      );
  }

  async signinWithGoogle() {
    const result: any = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    let userData = result.user.multiFactor.user;
    this.handelAuth(
      userData.email,
      userData.uid,
      userData.accessToken,
      userData.displayName,
      userData.photoURL
    );
    this.route.navigate(['/layout/home']);
  }

  async signinWithFacbook() {
    const result: any = await this.afAuth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
    // let userData = result.user.multiFactor.user;
    // this.handelAuth(
    //   userData.email,
    //   userData.uid,
    //   userData.accessToken,
    //   userData.displayName,
    //   userData.photoURL
    // );
    // this.route.navigate(['/layout/home']);
  }

  logOutAuth() {
    this.route.navigate(['/login']);
    localStorage.removeItem('userData');
    this.user$.next(null);
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  private handelAuth(
    email: string,
    userId: string,
    token: string,
    name?: string,
    imgUrl?: string
  ) {
    const user = new UserAuth(email, userId, token, name, imgUrl);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user$.next(user);
  }

  private handelError(resError: HttpErrorResponse) {
    let errorMassage: string = 'An Unknown Error occured!';
    if (
      !resError.error ||
      !resError.error.error ||
      !resError.error.error.errors[0]
    )
      return throwError(() => new Error(errorMassage));

    switch (resError.error.error.errors[0].message) {
      case 'EMAIL_NOT_FOUND':
        errorMassage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMassage = 'Invalid Password';
        break;
      case 'EMAIL_EXISTS':
        errorMassage = 'This email exists already';
        break;
    }
    return throwError(() => new Error(errorMassage));
  }
}
