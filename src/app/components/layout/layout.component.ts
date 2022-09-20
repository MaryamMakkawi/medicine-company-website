import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/interfaces/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  currentYear?: number;
  windowScrolled: boolean = false;
  // user!: User;
  userInfoForm: FormGroup = new FormGroup({});
  userSubscription$?: Subscription;

  roles: string[] = [
    'Doctor',
    'Pharmacist',
    'Sales Representative',
    'Scientific representative',
    'Agent',
    'Company manager',
  ];

  userDetails?: any;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private api: ApiService
  ) {}
  ngOnInit(): void {
    this.auth.autoLogin();
    this.userDetails = this.auth.user$.getValue();
    this.userSubscription$ = this.auth.user$.subscribe((value) => {
      this.userDetails = value;
    });
    console.log(this.userDetails);
    // this.user = JSON.parse(localStorage.getItem('userData') || '{}');

    this.currentYear = new Date().getFullYear();
    // !Form user
    this.userInfoForm = this.fb.group({
      firstName: [
        this.userDetails.firstName,
        [Validators.required, Validators.maxLength(20)],
      ],
      lastName: [
        this.userDetails.lastName,
        [Validators.required, Validators.maxLength(20)],
      ],
      email: [
        this.userDetails.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'
          ),
        ],
      ],
      regionId: [this.userDetails.regionId],
      cityId: [this.userDetails.cityId],
      countryId: [this.userDetails.countryId],
      role: [this.userDetails.role],
      specialMark: [this.userDetails.specialMark],
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.pageYOffset > 300) {
      this.windowScrolled = true;
    } else this.windowScrolled = false;
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  get userInfoF() {
    return this.userInfoForm.controls;
  }

  onUpdateUser() {
    const formData: any = new FormData();
    formData.append('id', this.userDetails.id);
    formData.append('userImage', this.file);
    formData.append('email', this.userInfoForm.value.email);
    formData.append('firstName', this.userInfoForm.value.firstName);
    formData.append('lastName', this.userInfoForm.value.lastName);
    formData.append('regionId', this.userInfoForm.value.regionId);
    formData.append('cityId', this.userInfoForm.value.cityId);
    formData.append('countryId', this.userInfoForm.value.countryId);
    formData.append('role', this.userInfoForm.value.role);
    formData.append('specialMark', this.userInfoForm.value.specialMark);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };
    this.api
      .post(environment.base + '/site/update-user-info', formData, {
        httpOptions,
      })
      .subscribe((res: any) => {
        if (res.status == 'ok') {
          // this.auth.user$.next(res.user);
          localStorage.setItem('userData', JSON.stringify(res.user));
          this.userDetails = res.user;
          this.userDetails.userImage = res.user.img;
        } else {
          console.log(res);
        }
      });
  }

  processFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.upload(file);
    }
  }
  file!: File;
  upload(fileTest: File) {
    this.file = fileTest;
  }

  onLogOut() {
    this.auth.logout();
  }

  // START countries - cities - regions
  countries = { id: '', nameAr: '', nameEn: '' };
  cities: any[] = [];
  regions: any[] = [];
  getCountries() {
    this.api
      .get(environment.base + `/area/get-countries`)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.countries = res.countries;
        } else {
          console.log(res);
        }
      });
  }
  getCities() {
    this.api
      .get(environment.base + `/area/get-cities`)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.cities = res.cities;
        } else {
          console.log(res);
        }
      });
  }
  onSelectCity(e: any) {
    this.getRegions(e.target.value);
  }
  getRegions(id: number) {
    this.api
      .get(environment.base + `/area/get-regions?cityId=` + id)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.regions = res.regions;
        } else {
          console.log(res);
        }
      });
  }
  // DONE countries - cities - regions
}
