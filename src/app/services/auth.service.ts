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
  saveUserInfo(userSignInfo: any, email: string) {
    return this.api.post(environment.base + '/site/save-user-info', {
      userSignInfo,
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
    specialMark: string,
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
      specialMark,
      userContacts
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.user$.next(user);
    user.isAuth = true;
    this.router.navigate(['/layout/home']);
  }

  autoLogin(
    updateUserInfo: boolean = false,
    email?: string,
    password?: string
  ) {
    if (!localStorage.getItem('userData') && !(email && password)) {
      return;
    }
   if (localStorage.getItem('userData') && updateUserInfo== false) {
      const userData: {
        accessToken: string;
        email: string;
        firstName: string;
        lastName: string;
        id: number;
        img: string;
        regionId: number;
        role: string;
        specialMark: string;
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
        userData.specialMark,
        userData.userContacts
      );
      this.user$.next(loadedUser);
      loadedUser.isAuth = true;
      this.router.navigate(['/layout/home']);
    } else if (email && password && updateUserInfo==true) {
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
            res.userInfo.specialMark,
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
