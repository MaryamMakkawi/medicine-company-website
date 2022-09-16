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

  constructor(
    private router: Router,
    private api: ApiService,
    private http: HttpClient
  ) {}

  login(email: string, password: string) {
    return this.api.post(environment.base + '/site/login', { email, password });
  }

  signup(
    accessToken: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    id: number
  ) {
    return this.api.post(environment.base + '/site/signup', {
      accessToken,
      email,
      password,
      firstName,
      lastName,
      id,
    });
  }
  // saveUserInfo(
  //   regionId: number,
  //   cityId: number,
  //   countryId: number,
  //   region: string,
  //   city: string,
  //   country: string,
  //   role: number,
  //   specialMark: string,
  //   Contacts: string[],
  //   email: string,
  //   headerOption:any
  // ) {
  //   return this.api.post(environment.base + '/site/save-user-info', {
  //     regionId,
  //     cityId,
  //     countryId,
  //     region,
  //     city,
  //     country,
  //     role,
  //     specialMark,
  //     Contacts,
  //     email,
  //   },headerOption);
  // }

  public handleAuth(
    accessToken: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    id: number,
    img: string,
    regionId: number,
    cityId: number,
    countryId: number,
    region: string,
    city: string,
    country: string,
    role: number,
    specialMark: string,
    Contacts: string[]
  ) {
    const user = new User(
      accessToken,
      email,
      password,
      firstName,
      lastName,
      id,
      img,
      regionId,
      cityId,
      countryId,
      region,
      city,
      country,
      role,
      specialMark,
      Contacts
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.user$.next(user);
    user.isAuth = true;
    this.router.navigate(['/layout/home']);
  }

  autoLogin(email?: string, password?: string) {
    if (!localStorage.getItem('userData') && !(email && password)) {
      return;
    }
    if (localStorage.getItem('userData')) {
      const userData: {
        accessToken: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        id: number;
        img: string;
        regionId: number;
        cityId: number;
        countryId: number;
        region: string;
        city: string;
        country: string;
        role: number;
        specialMark: string;
        Contacts: string[];
      } = JSON.parse(localStorage.getItem('userData')!);
      const loadedUser = new User(
        userData.accessToken,
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName,
        userData.id,
        userData.img,
        userData.regionId,
        userData.cityId,
        userData.countryId,
        userData.region,
        userData.city,
        userData.country,
        userData.role,
        userData.specialMark,
        userData.Contacts
      );
      this.user$.next(loadedUser);
      loadedUser.isAuth = true;
      this.router.navigate(['/layout/home']);
    } else if (email && password) {
      this.http
        .post(environment.base + '/site/login', { email, password })
        .subscribe((res: any) => {
          if (res.status === 'ok') {
            this.handleAuth(
              res.userInfo.accessToken,
              res.userInfo.email,
              res.userInfo.password,
              res.userInfo.firstName,
              res.userInfo.lastName,
              res.userInfo.id,
              res.userInfo.img,
              res.userInfo.regionId,
              res.userInfo.cityId,
              res.userInfo.countryId,
              res.userInfo.region,
              res.userInfo.city,
              res.userInfo.country,
              res.userInfo.role,
              res.userInfo.specialMark,
              res.userInfo.Contacts
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
