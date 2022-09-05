import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// environment depend
import { environment } from 'src/environments/environment';

import { User } from '../interfaces/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private router: Router, private api: ApiService,private http: HttpClient) {}

  login(email: string, password: string) {
    return this.api.post(environment.base + '/site/login', { email, password });
  }

  signup(userSign: any) {
    return this.api.post(environment.base + '/site/signup', userSign);
  }
  saveUserInfo(userSign: any, email: string) {
    return this.api.post(environment.base + '/site/save-user-info', {
      userSign,
      email,
    });
  }

  public handleAuth(
    accessToken: string,
    email: string,
    firstName: string,
    lastName: string,
    id: number,
    img: string,
    regionId: number,
    role: string,
    userContacts: string[]
  ) {
    const user = new User(
      accessToken,
      email,
      firstName,
      lastName,
      id,
      img,
      regionId,
      role,
      userContacts
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.user$.next(user);
    user.isAuth = true;
    this.router.navigate(['/layout/home']);
  }

  autoLogin(
    email?: string,
    password?: string
  ) {
    if (!localStorage.getItem('userData') && !(email && password)) {
      return;
    }
   if (localStorage.getItem('userData')) {
      const userData: {
        accessToken: string;
        email: string;
        firstName: string;
        lastName: string;
        id: number;
        img: string;
        regionId: number;
        role: string;
        userContacts: string[];
      } = JSON.parse(localStorage.getItem('userData')!);
      const loadedUser = new User(
        userData.accessToken,
        userData.email,
        userData.firstName,
        userData.lastName,
        userData.id,
        userData.img,
        userData.regionId,
        userData.role,
        userData.userContacts
      );
      this.user$.next(loadedUser);
      loadedUser.isAuth = true;
      this.router.navigate(['/layout/home']);
    } else if (email && password) {
      console.log('sign');
      this.http.post(environment.base + '/site/login', { email, password }).subscribe((res: any) => {
        if (res.status === 'ok') {
          this.handleAuth(
            res.userInfo.accessToken,
            res.userInfo.email,
            res.userInfo.firstName,
            res.userInfo.lastName,
            res.userInfo.id,
            res.userInfo.img,
            res.userInfo.regionId,
            res.userInfo.role,
            res.userInfo.userContacts
          );
          this.router.navigate(['/layout/home']);
        } else {
          console.log(res.details);
        }
      });
    }
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    this.user$.next(null);
  }
}
